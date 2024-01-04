"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Employer,Postjobs,User,Userresume,UserBio,Usereducation,Userexperience,Userskills,Userpreference,Usersavedjobs,Favoriteapplicant,Applicants,Applicantresume,Applicantchat,Employerchat,Saveduserprofile, Contacteduserprofile
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
from werkzeug.utils import secure_filename
from sqlalchemy import union
from sqlalchemy import or_

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

from flask import request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

@api.route('/addjob', methods=['POST'])
@jwt_required()
def add_job():
    email = get_jwt_identity()
    employer = Employer.query.filter_by(email=email).one_or_none()
    if employer is None:
        return jsonify("employer doesn't exist"), 400

    data = request.get_json()

    job = Postjobs(
        employer_id=data["employer_id"],
        company_name=data["company_name"],
        first_name=data["first_name"],
        last_name=data["last_name"],
        job_title=data["job_title"],
        company_email=data["company_email"],
        company_phone_number=data["company_phone_number"],
        number_hiring=data["number_hiring"],
        work_location_type=data["work_location_type"],
        location=data["location"],
        job_type=data["job_type"],
        working_hours=data["working_hours"],
        experience_level_type=data["experience_level_type"],
        education_degree=data["education_degree"],
        min_experience=data["min_experience"],
        max_experience=data["max_experience"],
        min_salary=data["min_salary"],
        max_salary=data["max_salary"],
        working_times=data["working_times"],
        description=data["description"],
        weekend_job=data["weekend_job"],
        language=data["language"],
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

    data = request.get_json()

    job.company_name = data["company_name"]
    job.first_name = data["first_name"]
    job.last_name = data["last_name"]
    job.job_title = data["job_title"]
    job.company_email = data["company_email"]
    job.company_phone_number = data["company_phone_number"]
    job.number_hiring = data["number_hiring"]
    job.work_location_type = data["work_location_type"]
    job.location = data["location"]
    job.job_type = data["job_type"]
    job.working_hours = data["working_hours"]
    job.experience_level_type = data["experience_level_type"]
    job.education_degree=data["education_degree"]
    job.min_experience = data["min_experience"]
    job.max_experience = data["max_experience"]
    job.min_salary = data["min_salary"]
    job.max_salary = data["max_salary"]
    job.working_times = data["working_times"]
    job.description = data["description"]
    job.weekend_job = data["weekend_job"]
    job.language = data["language"]

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

@api.route('/forgot-password', methods=['POST'])
def forgot_password():
    email = request.json.get('email')
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({'message': 'Email not found in the database.'}), 400

    expiration_time = datetime.utcnow() + timedelta(hours=1)
    payload = {
        'email': email,
        'exp': expiration_time
    }
    token = jwt.encode(payload, JWT_SECRET_KEY, algorithm='HS256')
    FRONTEND_URL= os.getenv('FRONTEND_URL')
    MAIL_USERNAME= os.getenv('MAIL_USERNAME')
    MAIL_PASSWORD= os.getenv('MAIL_PASSWORD')
    URL_TOKEN = f"{FRONTEND_URL}resetpasswordjobseeker?token={token}"

    try:
        msg = MIMEMultipart()
        msg['From'] = MAIL_USERNAME
        msg['To'] = email
        msg['Subject'] = 'Password Reset'        
        body = f'''
        <html>
        <body>
        <p>Hello, you requested a password reset. If you did not request this, please ignore this email.</p>
        <p>Click the link below to reset your password:</p>
        <p><a href="{URL_TOKEN}">Reset Password</a></p>
        <p>This token is valid for 1 hour. After expiration, you will need to request another password reset.</p>
        <p>Sincerely,<br/>ShelfShare</p>
        </body>
        </html>
        '''

        msg.attach(MIMEText(body, 'html'))

        server = smtplib.SMTP(os.getenv('MAIL_SERVER'), os.getenv('MAIL_PORT'))
        server.starttls()
        server.login(MAIL_USERNAME, MAIL_PASSWORD)
        text = msg.as_string()
        server.sendmail(MAIL_USERNAME, email, text)
        server.quit()

        return jsonify({'message': 'Password reset link sent to your email.'}), 200
    except Exception as e:
        return jsonify({'message': str(e)}), 500
    

@api.route('/reset-password', methods=['POST'])
def reset_password():
    data = request.get_json()
    token = data.get('token')
    new_password = data.get('new_password')

    try:
        payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=['HS256'])
        email = payload.get('email')
        user = User.query.filter_by(email=email).first()
        if user:
            user.password = generate_password_hash(new_password)
            db.session.commit()
            return jsonify({'message': 'Password reset successful.'}), 200
        else:
            return jsonify({'error': 'User not found.'}), 404

    except jwt.ExpiredSignatureError:
        return jsonify({'error': 'Expired token.'}), 401
    except jwt.InvalidTokenError:
        return jsonify({'error': 'Invalid token.'}), 401
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@api.route('/forgot-password-employer', methods=['POST'])
def forgot_password_employer():
    email = request.json.get('email')
    employer = Employer.query.filter_by(email=email).first()
    if not employer:
        return jsonify({'message': 'Email not found in the database.'}), 400

    expiration_time = datetime.utcnow() + timedelta(hours=1)
    payload = {
        'email': email,
        'exp': expiration_time
    }
    token = jwt.encode(payload, JWT_SECRET_KEY, algorithm='HS256')
    FRONTEND_URL= os.getenv('FRONTEND_URL')
    MAIL_USERNAME= os.getenv('MAIL_USERNAME')
    MAIL_PASSWORD= os.getenv('MAIL_PASSWORD')
    URL_TOKEN = f"{FRONTEND_URL}resetpasswordemployer?token={token}"

    try:
        msg = MIMEMultipart()
        msg['From'] = MAIL_USERNAME
        msg['To'] = email
        msg['Subject'] = 'Password Reset'        
        body = f'''
        <html>
        <body>
        <p>Hello, you requested a password reset. If you did not request this, please ignore this email.</p>
        <p>Click the link below to reset your password:</p>
        <p><a href="{URL_TOKEN}">Reset Password</a></p>
        <p>This token is valid for 1 hour. After expiration, you will need to request another password reset.</p>
        <p>Sincerely,<br/>ShelfShare</p>
        </body>
        </html>
        '''

        msg.attach(MIMEText(body, 'html'))

        server = smtplib.SMTP(os.getenv('MAIL_SERVER'), os.getenv('MAIL_PORT'))
        server.starttls()
        server.login(MAIL_USERNAME, MAIL_PASSWORD)
        text = msg.as_string()
        server.sendmail(MAIL_USERNAME, email, text)
        server.quit()

        return jsonify({'message': 'Password reset link sent to your email.'}), 200
    except Exception as e:
        return jsonify({'message': str(e)}), 500


@api.route('/reset-password-employer', methods=['POST'])
def reset_password_employer():
    data = request.get_json()
    token = data.get('token')
    new_password = data.get('new_password')

    try:
        payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=['HS256'])
        email = payload.get('email')
        employer = Employer.query.filter_by(email=email).first()
        if employer:
            employer.password = generate_password_hash(new_password)
            db.session.commit()
            return jsonify({'message': 'Password reset successful.'}), 200
        else:
            return jsonify({'error': 'Employer not found.'}), 404

    except jwt.ExpiredSignatureError:
        return jsonify({'error': 'Expired token.'}), 401
    except jwt.InvalidTokenError:
        return jsonify({'error': 'Invalid token.'}), 401
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    

@api.route('/viewsinglejob/<int:id>', methods=['GET'])
# @jwt_required()
def view_single_job_post(id):
    # email = get_jwt_identity()
    # user = User.query.filter_by(email=email).one_or_none()
    # if user is None:
    #     return jsonify("This employer doesn't exist"), 400
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

    # Check if the authenticated user is the same as the user whose resume is being requested
    if user.id != user_id:
        return jsonify("You do not have permission to access this file"), 403

    userresume = Userresume.query.filter_by(user_id=user_id).first()
    if userresume is None:
        return jsonify("No resume found for this user"), 400

    # Create a BytesIO object from your file
    data = BytesIO(userresume.user_resume)

    # Create a safe version of your filename that can be used in HTTP headers
    safe_filename = secure_filename(userresume.resume_name)

    # Create the Content-Disposition header
    content_disposition = f"attachment; filename={safe_filename}"

    # Send the file with the Content-Disposition header
    response = send_file(
        data,
        mimetype="application/pdf",
        as_attachment=True,
        download_name=safe_filename
    )
    response.headers["Content-Disposition"] = content_disposition
    return response

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

# @api.route('/adduserapplied',methods=['POST'])
# @jwt_required()
# def add_userapplied():
#     email=get_jwt_identity()
#     user=User.query.filter_by(email=email).one_or_none()
#     if user is None:
#         return jsonify("user doesn't exist"),400
#     body = request.json
#     applied=Userappliedjobs(
#         user_id=body["user_id"],
#         job_id=body["job_id"],
#         employer_id=body["employer_id"]
#         )
#     db.session.add(applied)
#     db.session.commit()
#     return jsonify(applied.serialize())

# @api.route('/getuserapplied/<int:id>',methods=['GET'])
# @jwt_required()
# def get_userapplied(id):
#     email=get_jwt_identity()
#     user=User.query.filter_by(email=email).one_or_none()
#     if user is None:
#         return jsonify("user doesn't exist"),400
#     allapplied = Userappliedjobs.query.filter_by(user_id=id).all()
#     if allapplied:  
#         results=[apply.serialize() for apply in allapplied]
#         return jsonify(results), 200
#     else:
#         return jsonify("applied job not found"), 404

@api.route('/getapplicants/<int:jobid>',methods=['GET'])
@jwt_required()
def get_applicants(jobid):
    email=get_jwt_identity()
    employer= Employer.query.filter_by(email=email).one_or_none()
    if employer is None:
        return jsonify("No employer found with the provided email"), 400
    
    allapplcants = Applicants.query.filter_by(job_id=jobid).all()
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
        return jsonify({"message": "applicant not found"}), 404

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

@api.route('/viewapplicantprofile/<int:userid>',methods=['GET'])
@jwt_required()
def get_viewapplicantprofile(userid):
    email=get_jwt_identity()
    employer= Employer.query.filter_by(email=email).one_or_none()
    if employer is None:
        return jsonify("No employer found with the provided email"), 400
    
    viewapplicantprofile = User.query.get(userid)
    if viewapplicantprofile:  
        return jsonify(viewapplicantprofile.serialize()), 200
    else:
        return jsonify({"message": "profile not found"}), 404
    


@api.route('/addapplicant',methods=['POST'])
@jwt_required()
def addapplicant():
    email=get_jwt_identity()
    user=User.query.filter_by(email=email).one_or_none()
    if user is None:
        return jsonify("user doesn't exist"),400
    body = request.json
    applied=Applicants(
        user_id=body["user_id"],
        email=body["email"],
        first_name=body["first_name"],
        last_name=body["last_name"],
        phone_number=body["phone_number"],
        job_id=body["job_id"],
        employer_id=body["employer_id"]
        )
    db.session.add(applied)
    db.session.commit()
    return jsonify(applied.serialize())

@api.route('/getapplicant/<int:id>',methods=['GET'])
@jwt_required()
def getapplicant(id):
    email=get_jwt_identity()
    user=User.query.filter_by(email=email).one_or_none()
    if user is None:
        return jsonify("user doesn't exist"),400
    allapplied = Applicants.query.filter_by(user_id=id).all()
    if allapplied:  
        results=[apply.serialize() for apply in allapplied]
        return jsonify(results), 200
    else:
        return jsonify("applied job not found"), 404

@api.route('/allapplicants/<int:jobid>',methods=['GET'])
@jwt_required()
def getallapplicants(jobid):
    email=get_jwt_identity()
    employer= Employer.query.filter_by(email=email).one_or_none()
    if employer is None:
        return jsonify("No employer found with the provided email"), 400
    
    allapplcants = Applicants.query.filter_by(job_id=jobid).all()
    if allapplcants:  
        results=[applicant.serialize() for applicant in allapplcants]
        return jsonify(results), 200
    else:
        return jsonify("No applicants found for the provided employer and job ID"), 204



@api.route('/addsentresume', methods=['POST'])
@jwt_required()
def add_sent_resume():
    email = get_jwt_identity()
    user = User.query.filter_by(email=email).one_or_none()
    if user is None:
        return jsonify("user doesn't exist"), 400

    file=request.files["file"]

    usersentresume = Applicantresume(
        user_id=request.form.get("user_id"),
        job_id=request.form.get("job_id"),
        applicant_user_resume=file.read(),
        applicant_resume_name=file.filename 
    )
    db.session.add(usersentresume)
    db.session.commit()
    return usersentresume.serialize()

@api.route('/getsentresumeemployer/<int:user_id>/<int:job_id>', methods=['GET'])
@jwt_required()
def get_sent_resume_employer(user_id,job_id):
    email=get_jwt_identity()
    employer= Employer.query.filter_by(email=email).one_or_none()
    if employer is None:
        return jsonify("No employer found with the provided email"), 400
    sentuserresume = Applicantresume.query.filter_by(user_id=user_id,job_id=job_id).first()
    if sentuserresume is None:
        return jsonify("No resume found for this user"), 400

    # Create a BytesIO object from your file
    data = BytesIO(sentuserresume.applicant_user_resume)

    # Create a safe version of your filename that can be used in HTTP headers
    safe_filename = secure_filename(sentuserresume.applicant_resume_name)

    # Create the Content-Disposition header
    content_disposition = f"attachment; filename={safe_filename}"

    # Send the file with the Content-Disposition header
    response = send_file(
        data,
        mimetype="application/pdf",
        as_attachment=True,
        download_name=safe_filename
    )
    response.headers["Content-Disposition"] = content_disposition
    return response

@api.route('/getdefaultresumeemployer/<int:user_id>', methods=['GET'])
@jwt_required()
def get_default_resume_employer(user_id):
    email=get_jwt_identity()
    employer= Employer.query.filter_by(email=email).one_or_none()
    if employer is None:
        return jsonify("No employer found with the provided email"), 400
    userresume = Userresume.query.filter_by(user_id=user_id).first()
    if userresume is None:
        return jsonify("No resume found for this user"), 400

    # Create a BytesIO object from your file
    data = BytesIO(userresume.user_resume)

    # Create a safe version of your filename that can be used in HTTP headers
    safe_filename = secure_filename(userresume.resume_name)

    # Create the Content-Disposition header
    content_disposition = f"attachment; filename={safe_filename}"

    # Send the file with the Content-Disposition header
    response = send_file(
        data,
        mimetype="application/pdf",
        as_attachment=True,
        download_name=safe_filename
    )
    response.headers["Content-Disposition"] = content_disposition
    return response

@api.route('/addapplicantchat', methods=["POST"])
@jwt_required()
def add_user_chat():
    email=get_jwt_identity()
    user= User.query.filter_by(email=email).one_or_none()
    if user is None:
        return jsonify("user doesn't exist"), 400
    body=request.json
    applicantchat=Applicantchat(
        user_id=body["user_id"],
        job_id=body["job_id"],
        message=body["message"]
    )
    db.session.add(applicantchat)
    db.session.commit()
    return applicantchat.serialize(),200

@api.route('/getapplicantchat/<userid>&<jobid>', methods=["GET"])
@jwt_required()
def get_applicant_chat(userid,jobid):
    email=get_jwt_identity()
    user= User.query.filter_by(email=email).one_or_none()
    if user is None:
        return jsonify("user doesn't exist"), 400
    results = Applicantchat.query.filter_by(user_id=userid,job_id=jobid).all()
    results_dict = [item.serialize() for item in results]
    return jsonify(results_dict),200

@api.route('/getemployerchatforapplicant/<userid>&<jobid>', methods=["GET"])
@jwt_required()
def get_employer_chat_applicant(userid,jobid):
    email=get_jwt_identity()
    user= User.query.filter_by(email=email).one_or_none()
    if user is None:
        return jsonify("user doesn't exist"), 400
    results = Employerchat.query.filter_by(user_id=userid,job_id=jobid).all()
    results_dict = [item.serialize() for item in results]
    return jsonify(results_dict),200

@api.route('/applicantinbox/<userid>', methods=["GET"])
@jwt_required()
def applicant_inbox(userid):
    email=get_jwt_identity()
    user= User.query.filter_by(email=email).one_or_none()
    if user is None:
        return jsonify("user doesn't exist"), 400

    applicant_chats = Applicantchat.query.filter_by(user_id=userid).all()
    employer_chats = Employerchat.query.filter_by(user_id=userid).all()
        # Combine the results
    all_chats = applicant_chats + employer_chats

    # Serialize each chat
    serialized_chats = [chat.serialize() for chat in all_chats]

    return jsonify(serialized_chats),200


@api.route('/employerchat', methods=["POST"])
@jwt_required()
def add_employer_chat():
    email=get_jwt_identity()
    employer= Employer.query.filter_by(email=email).one_or_none()
    if employer is None:
        return jsonify("No employer found with the provided email"), 400
    body=request.json
    employerchat=Employerchat(
        user_id=body["user_id"],
        job_id=body["job_id"],
        message=body["message"]
    )
    db.session.add(employerchat)
    db.session.commit()
    return employerchat.serialize(),200

@api.route('/getemployerchat/<userid>&<jobid>', methods=["GET"])
@jwt_required()
def get_employer_chat(userid,jobid):
    email=get_jwt_identity()
    employer= Employer.query.filter_by(email=email).one_or_none()
    if employer is None:
        return jsonify("No employer found with the provided email"), 400
    results = Employerchat.query.filter_by(user_id=userid,job_id=jobid).all()
    results_dict = [item.serialize() for item in results]
    return jsonify(results_dict),200

@api.route('/getapplicantchatforemployer/<userid>&<jobid>', methods=["GET"])
@jwt_required()
def get_applicant_chat_employer(userid,jobid):
    email=get_jwt_identity()
    employer= Employer.query.filter_by(email=email).one_or_none()
    if employer is None:
        return jsonify("No employer found with the provided email"), 400
    results = Applicantchat.query.filter_by(user_id=userid,job_id=jobid).all()
    results_dict = [item.serialize() for item in results]
    return jsonify(results_dict),200


@api.route('/employerinbox/<jobid>', methods=["GET"])
@jwt_required()
def employer_inbox(jobid):
    email=get_jwt_identity()
    employer= Employer.query.filter_by(email=email).one_or_none()
    if employer is None:
        return jsonify("No employer found with the provided email"), 400

    # Query both tables for chats with the given job_id
    applicant_chats = Applicantchat.query.filter_by(job_id=jobid).all()
    employer_chats = Employerchat.query.filter_by(job_id=jobid).all()

    # Combine the results
    all_chats = applicant_chats + employer_chats

    # Serialize each chat
    serialized_chats = [chat.serialize() for chat in all_chats]

    return jsonify(serialized_chats), 200

from datetime import datetime, timedelta

@api.route('/searchjobs', methods=['GET'])
def search_jobs():
    jobtitle = request.args.get('jobtitle', default=None, type=str)
    location = request.args.get('location', default=None, type=str)
    valueworklocation = request.args.get('valueworklocation', default=None, type=str)
    jobtype = request.args.get('jobtype', default=None, type=str)
    experiencelevel = request.args.get('experiencelevel', default=None, type=str)
    education = request.args.get('education', default=None, type=str)
    workingtimes = request.args.get('workingtimes', default=None, type=str)
    daysposted = request.args.get('daysposted', default=None, type=str)

    query = Postjobs.query
    if jobtitle:
        jobtitle = jobtitle.lower().split()
        query = query.filter(or_(Postjobs.job_title.ilike('%' + title + '%') for title in jobtitle))
    if location:
        query = query.filter(Postjobs.location.ilike('%' + location + '%'))
    if valueworklocation:
        query = query.filter(Postjobs.work_location_type.ilike('%' + valueworklocation + '%'))
    if jobtype:
        query = query.filter(Postjobs.job_type.ilike('%' + jobtype + '%'))
    if experiencelevel:
        query = query.filter(Postjobs.experience_level_type.ilike('%' + experiencelevel + '%'))
    if education:
        query = query.filter(Postjobs.education_degree.ilike('%' + education + '%'))
    if workingtimes:
        query = query.filter(Postjobs.working_times.ilike('%' + workingtimes + '%'))
    if daysposted:
        if daysposted == "Last 24 Hours":
            query = query.filter(Postjobs.current_date >= datetime.now() - timedelta(days=1))
        elif daysposted == "Last 3 Days":
            query = query.filter(Postjobs.current_date >= datetime.now() - timedelta(days=3))
        elif daysposted == "Last 7 Days":
            query = query.filter(Postjobs.current_date >= datetime.now() - timedelta(days=7))
        elif daysposted == "More Than 7 Days":
            query = query.filter(Postjobs.current_date < datetime.now() - timedelta(days=7))

    jobs = query.all()
    alljobs_dictionary = [job.serialize() for job in jobs]
    return jsonify(alljobs_dictionary), 200




@api.route('/searchprofiles', methods=['GET'])
def search_profile():
    jobtitle = request.args.get('jobtitle', default=None, type=str)
    location = request.args.get('location', default=None, type=str)
    experience_level = request.args.get('experience_level', default=None, type=str)
    education_degree = request.args.get('education_degree', default=None, type=str)

    query = Userexperience.query
    if jobtitle:
        jobtitle = jobtitle.lower().split()
        query = query.filter(or_(Userexperience.job_title.ilike('%' + title + '%') for title in jobtitle))

    experiences = query.all()
    user_ids = set([exp.user_id for exp in experiences])  # Convert list to set to remove duplicates

    if experience_level:
        current_year = datetime.now().year
        if experience_level == "Less Than 1 Year":
            user_ids = set([exp.user_id for exp in experiences if exp.end_year - exp.start_year < 1])
        elif experience_level == "1-2 Years":
            user_ids = set([exp.user_id for exp in experiences if 1 <= exp.end_year - exp.start_year <= 2])
        elif experience_level == "3-5 Years":
            user_ids = set([exp.user_id for exp in experiences if 3 <= exp.end_year - exp.start_year <= 5])
        elif experience_level == "6-10 Years":
            user_ids = set([exp.user_id for exp in experiences if 6 <= exp.end_year - exp.start_year <= 10])
        elif experience_level == "More Than 10 Years":
            user_ids = set([exp.user_id for exp in experiences if exp.end_year - exp.start_year > 10])

    if education_degree:
        education_query = Usereducation.query.filter(Usereducation.degree.ilike('%' + education_degree + '%'))
        education_user_ids = set([edu.user_id for edu in education_query.all()])  # Convert list to set to remove duplicates
        user_ids = user_ids & education_user_ids  # Intersection of two sets

    if not jobtitle and not location and not experience_level and not education_degree:
        user_ids = set([exp.user_id for exp in Userexperience.query.all()])  # Get all user IDs if no parameters are entered

    users = User.query.filter(User.id.in_(user_ids)).all()  # Query the User table using the user_ids set
    all_users_dictionary = [user.serialize() for user in users]  # Serialize the User objects
    return jsonify(all_users_dictionary), 200

@api.route('/addsaveduserprofiles',methods=['POST'])
@jwt_required()
def add_saveduserprofiles():
    email=get_jwt_identity()
    employer= Employer.query.filter_by(email=email).one_or_none()
    if employer is None:
        return jsonify("No employer found with the provided email"), 400
    
    body = request.json
    saveduserprofiles=Saveduserprofile(
        employer_id=body["employer_id"],
        user_id=body["user_id"],
        )
    db.session.add(saveduserprofiles)
    db.session.commit()
    return jsonify(saveduserprofiles.serialize())

@api.route('/getsaveduserprofiles/<int:employerid>',methods=['GET'])
@jwt_required()
def get_saveduserprofiles(employerid):
    email=get_jwt_identity()
    employer= Employer.query.filter_by(email=email).one_or_none()
    if employer is None:
        return jsonify("No employer found with the provided email"), 400
    
    saveduserprofiles = Saveduserprofile.query.filter_by(employer_id=employerid).all()
    if saveduserprofiles:  
        results=[saved.serialize() for saved in saveduserprofiles]
        return jsonify(results), 200
    else:
        return jsonify({"message": "profiles not found"}), 404

@api.route('/deletesaveduserprofiles/<int:employerid>/<int:userid>', methods=["DELETE"])
@jwt_required()
def delete_saveduserprofiles(employerid,userid):
    email=get_jwt_identity()
    employer= Employer.query.filter_by(email=email).one_or_none()
    if employer is None:
        return jsonify("No employer found with the provided email"), 400

    saveduserprofiles = Saveduserprofile.query.filter_by(employer_id=employerid,user_id=userid,).first()
    if saveduserprofiles is None:
        return jsonify("This saved user doesn't exist"), 400

    db.session.delete(saveduserprofiles)
    db.session.commit()
    return jsonify("saved user deleted successfully"), 200

@api.route('/addcontacteduserprofiles',methods=['POST'])
@jwt_required()
def add_contacteduserprofiles():
    email=get_jwt_identity()
    employer= Employer.query.filter_by(email=email).one_or_none()
    if employer is None:
        return jsonify("No employer found with the provided email"), 400
    
    body = request.json
    contacteduserprofiles=Contacteduserprofile(
        employer_id=body["employer_id"],
        user_id=body["user_id"],
        )
    db.session.add(contacteduserprofiles)
    db.session.commit()
    return jsonify(contacteduserprofiles.serialize())

@api.route('/getcontacteduserprofiles/<int:employerid>',methods=['GET'])
@jwt_required()
def get_contacteduserprofiles(employerid):
    email=get_jwt_identity()
    employer= Employer.query.filter_by(email=email).one_or_none()
    if employer is None:
        return jsonify("No employer found with the provided email"), 400
    
    contacteduserprofiles = Contacteduserprofile.query.filter_by(employer_id=employerid).all()
    if contacteduserprofiles:  
        results=[contact.serialize() for contact in contacteduserprofiles]
        return jsonify(results), 200
    else:
        return jsonify({"message": "contacted profiles not found"}), 404

@api.route('/deletecontacteduserprofiles/<int:employerid>/<int:userid>', methods=["DELETE"])
@jwt_required()
def delete_contacteduserprofiles(employerid,userid):
    email=get_jwt_identity()
    employer= Employer.query.filter_by(email=email).one_or_none()
    if employer is None:
        return jsonify("No employer found with the provided email"), 400

    contacteduserprofiles = Contacteduserprofile.query.filter_by(employer_id=employerid,user_id=userid,).first()
    if contacteduserprofiles is None:
        return jsonify("This saved user doesn't exist"), 400

    db.session.delete(contacteduserprofiles)
    db.session.commit()
    return jsonify("saved user deleted successfully"), 200



