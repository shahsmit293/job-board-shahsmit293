"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Employer,Postjobs
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