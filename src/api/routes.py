"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Employer,Postjobs,User,Userresume,UserBio,Usereducation,Userexperience,Userskills,Userpreference,Usersavedjobs,Userappliedjobs,Favoriteapplicant
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
@jwt_required()
def watch_job_post(id):
    email = get_jwt_identity()
    employer = Employer.query.filter_by(email=email).one_or_none()
    if employer is None:
        return jsonify("employer doesn't exist"), 400
    
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
        user_id=user.id, 
        user_resume=file.read(),
        resume_name=file.filename 
    )
    db.session.add(userresume)
    db.session.commit()
    return userresume.serialize()  



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

@api.route('/adduserpreference',methods=['POST'])
@jwt_required()
def add_userpreference():
    email=get_jwt_identity()
    user=User.query.filter_by(email=email).one_or_none()
    if user is None:
        return jsonify("user doesn't exist"),400
    body = request.json
    preference=Userpreference(
        job_title_preference=body["job_title_preference"],
        full_time_job=body["full_time_job"],
        part_time_job=body["part_time_job"],
        contract_job=body["contract_job"],
        temperory_job=body["temperory_job"],
        internship=body["internship"],
        monday_to_friday=body["monday_to_friday"],
        weekend_as_needed=body["weekend_as_needed"],
        weekend_only=body["weekend_only"],
        no_weekends=body["no_weekends"],
        holidays=body["holidays"],
        rotating_weekends=body["rotating_weekends"],
        weekdays=body["weekdays"],
        every_weekend=body["every_weekend"],
        four_hour_shift=body["four_hour_shift"],
        eight_hour_shift=body["eight_hour_shift"],
        ten_hour_shift=body["ten_hour_shift"],
        twelve_hour_shift=body["twelve_hour_shift"],
        day_shift=body["day_shift"],
        night_shift=body["night_shift"],
        evening_shift=body["evening_shift"],
        no_night=body["no_night"],
        overnight_shift=body["overnight_shift"],
        rotating_shift=body["rotating_shift"],
        split_shift=body["split_shift"],
        overtime=body["overtime"],
        min_salary=body["min_salary"],
        salary_type=body["salary_type"],
        relocation=body["relocation"],
        relocation_place=body["relocation_place"],
        remote_job=body["remote_job"],
        hybrid_job=body["hybrid_job"],
        in_person=body["in_person"],
        temperory_remote_job=body["temperory_remote_job"],
        user_id=body["user_id"],
        )
    db.session.add(preference)
    db.session.commit()
    return jsonify(preference.serialize())

@api.route('/getuserpreference/<int:preferid>',methods=['GET'])
@jwt_required()
def get_userpreference(preferid):
    email=get_jwt_identity()
    user=User.query.filter_by(email=email).one_or_none()
    if user is None:
        return jsonify("user doesn't exist"),400
    preference = Userpreference.query.filter_by(user_id=preferid).first()
    if preference:  
        return jsonify(preference.serialize()), 200
    else:
        return jsonify({"message": "preference not found"}), 404
    
@api.route('/edituserpreference/<int:id>', methods=['PUT'])
@jwt_required()
def edit_user_preference(id):
    email=get_jwt_identity()
    user=User.query.filter_by(email=email).one_or_none()
    if user is None:
        return jsonify("user doesn't exist"),400

    preference = Userpreference.query.filter_by(user_id=id).first()
    if preference is None:
        return jsonify("preference doesn't exist"), 400

    body = request.json
    preference.job_title_preference = body.get("job_title_preference", preference.job_title_preference)
    preference.full_time_job = body.get("full_time_job", preference.full_time_job)
    preference.part_time_job = body.get("part_time_job", preference.part_time_job)
    preference.contract_job = body.get("contract_job", preference.contract_job)
    preference.temperory_job = body.get("temperory_job", preference.temperory_job)
    preference.internship = body.get("internship", preference.internship)
    preference.monday_to_friday = body.get("monday_to_friday", preference.monday_to_friday)
    preference.weekend_as_needed = body.get("weekend_as_needed", preference.weekend_as_needed)
    preference.weekend_only = body.get("weekend_only", preference.weekend_only)
    preference.no_weekends = body.get("no_weekends", preference.no_weekends)
    preference.holidays = body.get("holidays", preference.holidays)
    preference.rotating_weekends = body.get("rotating_weekends", preference.rotating_weekends)
    preference.weekdays = body.get("weekdays", preference.weekdays)
    preference.every_weekend = body.get("every_weekend", preference.every_weekend)
    preference.four_hour_shift = body.get("four_hour_shift", preference.four_hour_shift)
    preference.eight_hour_shift = body.get("eight_hour_shift", preference.eight_hour_shift)
    preference.ten_hour_shift = body.get("ten_hour_shift", preference.ten_hour_shift)
    preference.twelve_hour_shift = body.get("twelve_hour_shift", preference.twelve_hour_shift)
    preference.day_shift = body.get("day_shift", preference.day_shift)
    preference.night_shift = body.get("night_shift", preference.night_shift)
    preference.evening_shift = body.get("evening_shift", preference.evening_shift)
    preference.no_night = body.get("no_night", preference.no_night)
    preference.overnight_shift = body.get("overnight_shift", preference.overnight_shift)
    preference.rotating_shift = body.get("rotating_shift", preference.rotating_shift)
    preference.split_shift = body.get("split_shift", preference.split_shift)
    preference.overtime = body.get("overtime", preference.overtime)
    preference.min_salary = body.get("min_salary", preference.min_salary)
    preference.salary_type = body.get("salary_type", preference.salary_type)
    preference.relocation = body.get("relocation", preference.relocation)
    preference.relocation_place = body.get("relocation_place", preference.relocation_place)
    preference.remote_job = body.get("remote_job", preference.remote_job)
    preference.hybrid_job = body.get("hybrid_job", preference.hybrid_job)
    preference.in_person = body.get("in_person", preference.in_person)
    preference.temperory_remote_job = body.get("temperory_remote_job", preference.temperory_remote_job)
    db.session.commit()
    return jsonify(preference.serialize())

@api.route('/deleteuserpreference/<int:id>', methods=["DELETE"])
@jwt_required()
def delete_userpreference(id):
    email = get_jwt_identity()
    user = User.query.filter_by(email=email).one_or_none()
    if user is None:
        return jsonify("user doesn't exist"), 400

    preference = Userpreference.query.get(id)
    if preference is None:
        return jsonify("This preference doesn't exist"), 400

    db.session.delete(preference)
    db.session.commit()
    return jsonify("preference deleted successfully"), 200

@api.route('/addusersaved',methods=['POST'])
@jwt_required()
def add_usersave():
    email=get_jwt_identity()
    user=User.query.filter_by(email=email).one_or_none()
    if user is None:
        return jsonify("user doesn't exist"),400
    body = request.json
    save=Usersavedjobs(
        user_id=body["user_id"],
        job_id=body["job_id"],
        )
    db.session.add(save)
    db.session.commit()
    return jsonify(save.serialize())

@api.route('/getusersaved/<int:id>',methods=['GET'])
@jwt_required()
def get_usersaved(id):
    email=get_jwt_identity()
    user=User.query.filter_by(email=email).one_or_none()
    if user is None:
        return jsonify("user doesn't exist"),400
    allsave = Usersavedjobs.query.filter_by(user_id=id).all()
    if allsave:  
        results=[saved.serialize() for saved in allsave]
        return jsonify(results), 200
    else:
        return jsonify({"message": "saved job not found"}), 404

@api.route('/deleteusersave/<int:userid>/<int:jobid>', methods=["DELETE"])
@jwt_required()
def delete_usersave(userid,jobid):
    email = get_jwt_identity()
    user = User.query.filter_by(email=email).one_or_none()
    if user is None:
        return jsonify("user doesn't exist"), 400

    saved = Usersavedjobs.query.filter_by(user_id=userid, job_id=jobid).first()
    if saved is None:
        return jsonify("This saved job doesn't exist"), 400

    db.session.delete(saved)
    db.session.commit()
    return jsonify("saved job deleted successfully"), 200

@api.route('/adduserapplied',methods=['POST'])
@jwt_required()
def add_userapplied():
    email=get_jwt_identity()
    user=User.query.filter_by(email=email).one_or_none()
    if user is None:
        return jsonify("user doesn't exist"),400
    body = request.json
    applied=Userappliedjobs(
        user_id=body["user_id"],
        job_id=body["job_id"],
        employer_id=body["employer_id"]
        )
    db.session.add(applied)
    db.session.commit()
    return jsonify(applied.serialize())

@api.route('/getuserapplied/<int:id>',methods=['GET'])
@jwt_required()
def get_userapplied(id):
    email=get_jwt_identity()
    user=User.query.filter_by(email=email).one_or_none()
    if user is None:
        return jsonify("user doesn't exist"),400
    allapplied = Userappliedjobs.query.filter_by(user_id=id).all()
    if allapplied:  
        results=[apply.serialize() for apply in allapplied]
        return jsonify(results), 200
    else:
        return jsonify("applied job not found"), 404

@api.route('/getapplicants/<int:jobid>',methods=['GET'])
@jwt_required()
def get_applicants(jobid):
    email=get_jwt_identity()
    employer= Employer.query.filter_by(email=email).one_or_none()
    if employer is None:
        return jsonify("No employer found with the provided email"), 400
    
    allapplcants = Userappliedjobs.query.filter_by(job_id=jobid).all()
    if allapplcants:  
        results=[applicant.serialize() for applicant in allapplcants]
        return jsonify(results), 200
    else:
        return jsonify("No applicants found for the provided employer and job ID"), 204

@api.route('/addemployersavedapplicant',methods=['POST'])
@jwt_required()
def add_employersavedapplicant():
    email=get_jwt_identity()
    employer= Employer.query.filter_by(email=email).one_or_none()
    if employer is None:
        return jsonify("No employer found with the provided email"), 400
    
    body = request.json
    employersavedapplicants=Favoriteapplicant(
        employer_id=body["employer_id"],
        user_id=body["user_id"],
        job_id=body["job_id"]
        )
    db.session.add(employersavedapplicants)
    db.session.commit()
    return jsonify(employersavedapplicants.serialize())

@api.route('/getemployersavedapplicants/<int:id>',methods=['GET'])
@jwt_required()
def get_employersavedapplicant(id):
    email=get_jwt_identity()
    employer= Employer.query.filter_by(email=email).one_or_none()
    if employer is None:
        return jsonify("No employer found with the provided email"), 400
    
    employersavedapplicants = Favoriteapplicant.query.filter_by(job_id=id).all()
    if employersavedapplicants:  
        results=[saved.serialize() for saved in employersavedapplicants]
        return jsonify(results), 200
    else:
        return jsonify({"message": "saved user not found"}), 404

@api.route('/deleteemployersavedapplicants/<int:userid>/<int:jobid>', methods=["DELETE"])
@jwt_required()
def delete_employersavedapplicant(userid,jobid):
    email=get_jwt_identity()
    employer= Employer.query.filter_by(email=email).one_or_none()
    if employer is None:
        return jsonify("No employer found with the provided email"), 400

    employersavedapplicants = Favoriteapplicant.query.filter_by(user_id=userid, job_id=jobid).first()
    if employersavedapplicants is None:
        return jsonify("This saved user doesn't exist"), 400

    db.session.delete(employersavedapplicants)
    db.session.commit()
    return jsonify("saved user deleted successfully"), 200