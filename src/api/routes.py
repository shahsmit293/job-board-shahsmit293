"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Employer,Postjobs,User,Userresume,UserBio,Usereducation,Userexperience,Userskills
from api.utils import generate_sitemap, APIException
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt_identity
from datetime import datetime, timedelta
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import smtplib
import os
import jwt
from sqlalchemy import or_
from flask import Response
import json
import base64
from flask import send_file
from io import BytesIO
from werkzeug.wrappers import Response

api = Blueprint('api', __name__)
# Allow CORS requests to this API

JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'jobboard')


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

#####STARTS FROM HERE......................................................................

@api.route('/employersignup', methods=['POST'])
def employerSignup():
    body = request.json
    employer = Employer.query.filter_by(email=body['email']).first()
    if employer:
        return jsonify({"error": "Email already exists. Please use a different email."}), 409

    employer = Employer(
        email=body["email"],
        password=generate_password_hash(body["password"]),
    )
    db.session.add(employer)
    db.session.commit()
    token = create_access_token(identity=employer.email)
    return jsonify(employer=employer.serialize(), token=token), 201

@api.route('/employerlogin', methods=['POST'])
def employerLogin():
    password = request.json.get("password", None)
    email = request.json.get("email", None)
    employer = Employer.query.filter_by(email=email).first()
    if not employer:
        return jsonify("Email or password are incorrect!"), 401
    if not check_password_hash(employer.password, password):
        return jsonify("Email or password are incorrect!"), 401
    token = create_access_token(identity=email)
    return jsonify(token=token, employer=employer.serialize()), 200

@api.route('/addjob', methods=['POST'])
@jwt_required()
def add_job():
    email=get_jwt_identity()
    employer= Employer.query.filter_by(email=email).one_or_none()
    if employer is None:
        return jsonify("employer doesn't exist"), 400

    binary_data = None
    if 'companyLogo' in request.files:
        file = request.files['companyLogo']
        binary_data = base64.b64encode(file.read())

    job=Postjobs(
        employer_id=request.form.get("employer_id"),
        company_name=request.form.get("company_name"),
        company_logo=binary_data,
        first_name=request.form.get("first_name"),
        last_name=request.form.get("last_name"),
        job_title=request.form.get("job_title"),
        company_email=request.form.get("company_email"),
        company_phone_number=request.form.get("company_phone_number"),
        number_hiring=request.form.get("number_hiring"),
        work_location_type=request.form.get("work_location_type"),
        location=request.form.get("location"),
        job_type=request.form.get("job_type"),
        working_hours=request.form.get("working_hours"),
        experience_level_type=request.form.get("experience_level_type"),
        min_experience=request.form.get("min_experience"),
        max_experience=request.form.get("max_experience"),
        min_salary=request.form.get("min_salary"),
        max_salary=request.form.get("max_salary"),
        working_times=request.form.get("working_times"),
        description=request.form.get("description"),
        weekend_job=request.form.get("weekend_job"),
        language=request.form.get("language"),
    )
    db.session.add(job)
    db.session.commit()
    return job.serialize()

@api.route('/alljobs', methods=['GET'])
def all_jobs():
    jobs = Postjobs.query.all()
    alljobs_dictionary = [job.serialize() for job in jobs]
    return jsonify(alljobs_dictionary), 200

@api.route('/watchjob/<int:id>', methods=['GET'])
def watch_job_post(id):
    jobs = Postjobs.query.filter_by(employer_id=id).all()
    if jobs:
        results = [job.serialize() for job in jobs]
        return jsonify(results), 200
    else:
        return jsonify({"message": "Jobs not found"}), 404

# edit book
@api.route('/editpost/<int:post_id>', methods=['PUT'])
@jwt_required()
def edit_post(post_id):
    email = get_jwt_identity()
    employer = Employer.query.filter_by(email=email).one_or_none()
    if employer is None:
        return jsonify("employer doesn't exist"), 400

    job = Postjobs.query.get(post_id)
    if job is None:
        return jsonify("Job doesn't exist"), 400
    binary_data = None
    if 'companyLogo' in request.files:
        file = request.files['companyLogo']
        binary_data = base64.b64encode(file.read())

    job.company_name=request.form.get("company_name")
    job.company_logo=binary_data
    job.first_name=request.form.get("first_name")
    job.last_name=request.form.get("last_name")
    job.job_title=request.form.get("job_title")
    job.company_email=request.form.get("company_email")
    job.company_phone_number=request.form.get("company_phone_number")
    job.number_hiring=request.form.get("number_hiring"),
    job.work_location_type=request.form.get("work_location_type")
    job.location=request.form.get("location")
    job.job_type=request.form.get("job_type")
    job.working_hours=request.form.get("working_hours")
    job.experience_level_type=request.form.get("experience_level_type")
    job.min_experience=request.form.get("min_experience")
    job.max_experience=request.form.get("max_experience")
    job.min_salary=request.form.get("min_salary")
    job.max_salary=request.form.get("max_salary")
    job.working_times=request.form.get("working_times")
    job.description=request.form.get("description")
    job.weekend_job=request.form.get("weekend_job")
    job.language=request.form.get("language")
    job.description=request.form.get("description")

    db.session.commit()
    return jsonify(job.serialize())

#get  edit book
@api.route('/geteditpost/<int:post_id>', methods=['GET'])
@jwt_required()
def get_edit_post(post_id):
    email = get_jwt_identity()
    employer = Employer.query.filter_by(email=email).one_or_none()
    if employer is None:
        return jsonify("employer doesn't exist"), 400

    job = Postjobs.query.get(post_id)
    if job is None:
        return jsonify("Job doesn't exist"), 400

    return jsonify(job.serialize())

@api.route('deletejob/<int:post_id>', methods=["DELETE"])
@jwt_required()
def delete_job(post_id):
    email = get_jwt_identity()
    employer = Employer.query.filter_by(email=email).one_or_none()
    if employer is None:
        return jsonify("This employer doesn't exist"), 400
    job = Postjobs.query.get(post_id)
    if job is None:
        return jsonify("This book doesn't exist"), 400

    db.session.delete(job)
    db.session.commit()
    return jsonify("book deleted successfully"), 200

##user routes starts from here...................................
@api.route('/jobseekerloginsignup', methods=['POST'])
def jobseekerloginsignup():
    body = request.json
    user = User.query.filter_by(email=body['email']).first()
    if user:
        return jsonify({"error": "Email already exists. Please use a different email."}), 409

    user = User(
        email=body["email"],
        password=generate_password_hash(body["password"]),
    )
    db.session.add(user)
    db.session.commit()
    token = create_access_token(identity=user.email)
    return jsonify(user=user.serialize(), token=token), 201

@api.route('/jobseekerlogin', methods=['POST'])
def jobseekerLogin():
    password = request.json.get("password", None)
    email = request.json.get("email", None)
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify("Email or password are incorrect!"), 401
    if not check_password_hash(user.password, password):
        return jsonify("Email or password are incorrect!"), 401
    token = create_access_token(identity=email)
    return jsonify(token=token, user=user.serialize()), 200

@api.route('/viewsinglejob/<int:id>', methods=['GET'])
@jwt_required()
def view_single_job_post(id):
    email = get_jwt_identity()
    user = User.query.filter_by(email=email).one_or_none()
    if user is None:
        return jsonify("This employer doesn't exist"), 400
    job = Postjobs.query.filter_by(id=id).one_or_none()
    if job:
        return jsonify(job.serialize()), 200
    else:
        return jsonify({"message": "Jobs not found"}), 404

@api.route('/addresume', methods=['POST'])
@jwt_required()
def add_resume():
    email = get_jwt_identity()
    user = User.query.filter_by(email=email).one_or_none()
    if user is None:
        return jsonify("user doesn't exist"), 400

    file=request.files["file"]

    userresume = Userresume(
        user_id=user.id,  # Set the user_id to the id of the user
        user_resume=file.read(),
        resume_name=file.filename # Save the resume file data
    )
    db.session.add(userresume)
    db.session.commit()
    return userresume.serialize()  # Make sure your Userresume model has a serialize method



@api.route('/getresume/<int:user_id>', methods=['GET'])
@jwt_required()
def get_resume(user_id):
    email = get_jwt_identity()
    user = User.query.filter_by(email=email).one_or_none()
    if user is None:
        return jsonify("user doesn't exist"), 400
    
    userresume = Userresume.query.filter_by(user_id=user_id).all()
    if userresume is None:
        return jsonify("No resume found for this user"), 400
    if userresume:
        results = [resume.serialize() for resume in userresume]
        return jsonify(results), 200
    return send_file(BytesIO(userresume.user_resume), attachment_filename='resume_name.pdf', as_attachment=True)

@api.route('/getresumedetail/<int:user_id>', methods=['GET'])
@jwt_required()
def get_resume_detail(user_id):
    email = get_jwt_identity()
    user = User.query.filter_by(email=email).one_or_none()
    if user is None:
        return jsonify("user doesn't exist"), 400
    
    userresume = Userresume.query.filter_by(user_id=user_id).all()
    if userresume is None:
        return jsonify("No resume found for this user"), 400
    if userresume:
        results = [resume.serialize() for resume in userresume]
        return jsonify(results), 200

@api.route('/deleteresume/<int:resume_id>', methods=["DELETE"])
@jwt_required()
def delete_resume(resume_id):
    email = get_jwt_identity()
    user = User.query.filter_by(email=email).one_or_none()
    if user is None:
        return jsonify("user doesn't exist"), 400

    resume = Userresume.query.get(resume_id)
    if resume is None:
        return jsonify("This resume doesn't exist"), 400

    db.session.delete(resume)
    db.session.commit()
    return jsonify("resume deleted successfully"), 200

@api.route('/adduserbio',methods=['POST'])
@jwt_required()
def add_userbio():
    email=get_jwt_identity()
    user=User.query.filter_by(email=email).one_or_none()
    if user is None:
        return jsonify("user doesn't exist"),400
    body = request.json
    bio=UserBio(
        user_id=body["user_id"],
        first_name=body["first_name"],
        last_name=body["last_name"],
        location=body["location"],
        phone_number=body["phone_number"])
    db.session.add(bio)
    db.session.commit()
    return jsonify(bio.serialize())

@api.route('/getuserbio/<int:bioid>',methods=['GET'])
@jwt_required()
def get_userbio(bioid):
    email=get_jwt_identity()
    user=User.query.filter_by(email=email).one_or_none()
    if user is None:
        return jsonify("user doesn't exist"),400
    bio = UserBio.query.filter_by(user_id=bioid).one_or_none()
    if bio:
        return jsonify(bio.serialize()), 200
    else:
        return jsonify({"message": "bio not found"}), 404

@api.route('/edituserbio/<int:id>', methods=['PUT'])
@jwt_required()
def edit_user_bio(id):
    email=get_jwt_identity()
    user=User.query.filter_by(email=email).one_or_none()
    if user is None:
        return jsonify("user doesn't exist"),400

    bio = UserBio.query.filter_by(user_id=id).one_or_none()
    if bio is None:
        return jsonify("Book doesn't exist"), 400

    body = request.json
    bio.first_name = body.get("first_name", bio.first_name)
    bio.last_name = body.get("last_name", bio.last_name)
    bio.location = body.get("location", bio.location)
    bio.phone_number = body.get("phone_number", bio.phone_number)
    db.session.commit()
    return jsonify(bio.serialize())


@api.route('/addusereducation',methods=['POST'])
@jwt_required()
def add_usereducation():
    email=get_jwt_identity()
    user=User.query.filter_by(email=email).one_or_none()
    if user is None:
        return jsonify("user doesn't exist"),400
    body = request.json
    education=Usereducation(
        collage_name=body["collage_name"],
        start_year=body["start_year"],
        end_year=body["end_year"],
        gpa=body["gpa"],
        major=body["major"],
        degree=body["degree"],
        location=body["location"],
        user_id=body["user_id"]
        )
    db.session.add(education)
    db.session.commit()
    return jsonify(education.serialize())

@api.route('/getusereducation/<int:eduid>',methods=['GET'])
@jwt_required()
def get_usereducation(eduid):
    email=get_jwt_identity()
    user=User.query.filter_by(email=email).one_or_none()
    if user is None:
        return jsonify("user doesn't exist"),400
    education = Usereducation.query.filter_by(user_id=eduid).all()
    if education:
        result=[edu.serialize() for edu in education]  
        return jsonify(result), 200
    else:
        return jsonify({"message": "education not found"}), 404

@api.route('/editusereducation/<int:id>', methods=['PUT'])
@jwt_required()
def edit_user_education(id):
    email=get_jwt_identity()
    user=User.query.filter_by(email=email).one_or_none()
    if user is None:
        return jsonify("user doesn't exist"),400

    education = Usereducation.query.filter_by(id=id).first()
    if education is None:
        return jsonify("education doesn't exist"), 400

    body = request.json
    education.collage_name = body.get("collage_name", education.collage_name)
    education.start_year = body.get("start_year", education.start_year)
    education.end_year = body.get("end_year", education.end_year)
    education.gpa = body.get("gpa", education.gpa)
    education.major = body.get("major", education.major)
    education.degree = body.get("degree", education.degree)
    education.location = body.get("location", education.location)
    db.session.commit()
    return jsonify(education.serialize())

@api.route('/deleteusereducation/<int:id>', methods=["DELETE"])
@jwt_required()
def delete_usereducation(id):
    email = get_jwt_identity()
    user = User.query.filter_by(email=email).one_or_none()
    if user is None:
        return jsonify("user doesn't exist"), 400

    education = Usereducation.query.get(id)
    if education is None:
        return jsonify("This education doesn't exist"), 400

    db.session.delete(education)
    db.session.commit()
    return jsonify("education deleted successfully"), 200

@api.route('/adduserexperience',methods=['POST'])
@jwt_required()
def add_userexperience():
    email=get_jwt_identity()
    user=User.query.filter_by(email=email).one_or_none()
    if user is None:
        return jsonify("user doesn't exist"),400
    body = request.json
    experience=Userexperience(
        job_title=body["job_title"],
        company_name=body["company_name"],
        job_type=body["job_type"],
        start_year=body["start_year"],
        end_year=body["end_year"],
        description=body["description"],
        location=body["location"],
        user_id=body["user_id"]
        )
    db.session.add(experience)
    db.session.commit()
    return jsonify(experience.serialize())

@api.route('/getuserexperience/<int:exid>',methods=['GET'])
@jwt_required()
def get_userexperience(exid):
    email=get_jwt_identity()
    user=User.query.filter_by(email=email).one_or_none()
    if user is None:
        return jsonify("user doesn't exist"),400
    experience = Userexperience.query.filter_by(user_id=exid).all()
    if experience:
        result=[exp.serialize() for exp in experience]  
        return jsonify(result), 200
    else:
        return jsonify({"message": "experience not found"}), 404
    
@api.route('/edituserexperience/<int:id>', methods=['PUT'])
@jwt_required()
def edit_user_experience(id):
    email=get_jwt_identity()
    user=User.query.filter_by(email=email).one_or_none()
    if user is None:
        return jsonify("user doesn't exist"),400

    experience = Userexperience.query.filter_by(id=id).first()
    if experience is None:
        return jsonify("experience doesn't exist"), 400

    body = request.json
    experience.job_title = body.get("job_title", experience.job_title)
    experience.company_name = body.get("company_name", experience.company_name)
    experience.job_type = body.get("job_type", experience.job_type)
    experience.start_year = body.get("start_year", experience.start_year)
    experience.end_year = body.get("end_year", experience.end_year)
    experience.description = body.get("description", experience.description)
    experience.location = body.get("location", experience.location)
    db.session.commit()
    return jsonify(experience.serialize())

@api.route('/deleteuserexperience/<int:id>', methods=["DELETE"])
@jwt_required()
def delete_userexperience(id):
    email = get_jwt_identity()
    user = User.query.filter_by(email=email).one_or_none()
    if user is None:
        return jsonify("user doesn't exist"), 400

    experience = Userexperience.query.get(id)
    if experience is None:
        return jsonify("This experience doesn't exist"), 400

    db.session.delete(experience)
    db.session.commit()
    return jsonify("experience deleted successfully"), 200

@api.route('/adduserskill',methods=['POST'])
@jwt_required()
def add_userskill():
    email=get_jwt_identity()
    user=User.query.filter_by(email=email).one_or_none()
    if user is None:
        return jsonify("user doesn't exist"),400
    body = request.json
    skill=Userskills(
        skill=body["skill"],
        skill_year=body["skill_year"],
        user_id=body["user_id"],
        )
    db.session.add(skill)
    db.session.commit()
    return jsonify(skill.serialize())

@api.route('/getuserskill/<int:skillid>',methods=['GET'])
@jwt_required()
def get_userskill(skillid):
    email=get_jwt_identity()
    user=User.query.filter_by(email=email).one_or_none()
    if user is None:
        return jsonify("user doesn't exist"),400
    skill = Userskills.query.filter_by(user_id=skillid).all()
    if skill:
        result=[item.serialize() for item in skill]  
        return jsonify(result), 200
    else:
        return jsonify({"message": "skill not found"}), 404
    
@api.route('/edituserskill/<int:id>', methods=['PUT'])
@jwt_required()
def edit_user_skill(id):
    email=get_jwt_identity()
    user=User.query.filter_by(email=email).one_or_none()
    if user is None:
        return jsonify("user doesn't exist"),400

    skill = Userskills.query.filter_by(id=id).first()
    if skill is None:
        return jsonify("skill doesn't exist"), 400

    body = request.json
    skill.skill = body.get("skill", skill.skill)
    skill.skill_year = body.get("skill_year", skill.skill_year)
    db.session.commit()
    return jsonify(skill.serialize())

@api.route('/deleteuserskill/<int:id>', methods=["DELETE"])
@jwt_required()
def delete_userskill(id):
    email = get_jwt_identity()
    user = User.query.filter_by(email=email).one_or_none()
    if user is None:
        return jsonify("user doesn't exist"), 400

    skill = Userskills.query.get(id)
    if skill is None:
        return jsonify("This skill doesn't exist"), 400

    db.session.delete(skill)
    db.session.commit()
    return jsonify("skill deleted successfully"), 200