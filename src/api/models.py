from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Date, Time
from sqlalchemy import func
# from sqlalchemy import ARRAY

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(180), unique=False, nullable=False)
    user_bio = db.relationship('UserBio', backref="user", uselist=False)
    user_education = db.relationship('Usereducation', backref="user",uselist=True)
    user_experience = db.relationship('Userexperience', backref="user")

    def __init__(self,email,password):
        self.email=email
        self.password=password

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "user_bio": self.user_bio.serialize() if self.user_bio else None,
            "user_education": [edu.serialize() for edu in self.user_education],
            "user_experience": [exp.serialize() for exp in self.user_experience]
            }

    def serialize_userbio(self):
        return{
            "user_bio": self.user_bio.serialize() if self.user_bio else None,
        }
    def serialize_education(self):
        return{
            "user_education": [edu.serialize() for edu in self.user_education],
        }
    def serialize_experience(self):
        return{
            "user_experience": [exp.serialize() for exp in self.user_experience]
        }

class UserBio(db.Model):
    __tablename__ = 'userbio'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'),nullable=True)
    first_name=db.Column(db.String(40),unique=False,nullable=False)
    last_name=db.Column(db.String(40),unique=False,nullable=False)
    location=db.Column(db.String(80),unique=False,nullable=True)
    phone_number=db.Column(db.Integer,unique=True,nullable=True)

    def __init__(self,user_id,first_name,last_name,location,phone_number):
        self.user_id=user_id
        self.first_name=first_name
        self.last_name=last_name
        self.location=location
        self.phone_number=phone_number

    def serialize(self):
        return {
            "id": self.id,
            "user_id":self.user_id,
            "first_name":self.first_name,
            "last_name":self.last_name,
            "location":self.location,
            "phone_number":self.phone_number,
            }
    def other(self):
        return{
            "user":{
                "usereducation":self.user.serialize_education(),
                "userexperience":self.user.serialize_experience()
            }
        }

class UserExtraDetail(db.Model):
    __tablename__ = 'userextradetail'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'),nullable=True)
    gender=db.Column(db.String(40),unique=False,nullable=True)
    disability=db.Column(db.String(40),unique=False,nullable=True)
    work_authorization=db.Column(db.String(80),unique=False,nullable=False)
    race=db.Column(db.String(80),unique=False,nullable=True)
    language=db.Column(db.String(80),unique=False,nullable=True)
    user = db.relationship(User, backref="user_extra_detail")

class Usereducation(db.Model):
    __tablename__ = 'usereducation'
    id = db.Column(db.Integer, primary_key=True)
    collage_name=db.Column(db.String(80),unique=False,nullable=True)
    start_year=db.Column(db.Integer,unique=False,nullable=True)
    end_year=db.Column(db.Integer,unique=False,nullable=True)
    gpa=db.Column(db.Integer,unique=False,nullable=True)
    major=db.Column(db.String(80),unique=False,nullable=True)
    degree=db.Column(db.String(80),unique=False,nullable=True)
    location=db.Column(db.String(80),unique=False,nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'),nullable=True)

    def __init__(self,collage_name,start_year,end_year,gpa,major,degree,location,user_id):
        self.collage_name=collage_name
        self.start_year=start_year
        self.end_year=end_year
        self.gpa=gpa
        self.major=major
        self.degree=degree
        self.location=location
        self.user_id=user_id

    def serialize(self):
        return {
            "id": self.id,
            "collage_name":self.collage_name,
            "start_year":self.start_year,
            "end_year":self.end_year,
            "gpa":self.gpa,
            "major":self.major,
            "degree":self.degree,
            "location":self.location,
            "user_id":self.user_id,
            }
    def other(self):
        return{
            "user":{
                "userbio":self.user.serialize_userbio(),
                "userexperience":self.user.serialize_experience()
            }
        }

class Userexperience(db.Model):
    __tablename__ = 'userexperience'
    id = db.Column(db.Integer, primary_key=True)
    job_title=db.Column(db.String(80),unique=False,nullable=True)
    company_name=db.Column(db.String(80),unique=False,nullable=True)
    job_type=db.Column(db.String(80),unique=False,nullable=True)
    start_year=db.Column(db.String(80),unique=False,nullable=True)
    end_year=db.Column(db.String(80),unique=False,nullable=True)
    description=db.Column(db.String(4000),unique=False,nullable=True)
    location=db.Column(db.String(80),unique=False,nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'),nullable=True)

    def __init__(self,job_title,company_name,job_type,start_year,end_year,description,location,user_id):
        self.job_title=job_title
        self.company_name=company_name
        self.job_type=job_type
        self.start_year=start_year
        self.end_year=end_year
        self.description=description
        self.location=location
        self.user_id=user_id

    def serialize(self):
        return {
            "id": self.id,
            "job_title":self.job_title,
            "company_name":self.company_name,
            "job_type":self.job_type,
            "start_year":self.start_year,
            "end_year":self.end_year,
            "description":self.description,
            "location":self.location,
            "user_id":self.user_id,
            }
    
    def other(self):
        return{
            "user":{
                "userbio":self.user.serialize_userbio(),
                "usereducation":self.user.serialize_education()
            }
        }

class Userpreference(db.Model):
    __tablename__ = 'userpreference'
    id = db.Column(db.Integer, primary_key=True)
    job_title_preference=db.Column(db.String(500),unique=False,nullable=True)
    full_time_job=db.Column(db.String(80),unique=False,nullable=True)
    part_time_job=db.Column(db.String(80),unique=False,nullable=True)
    contract_job=db.Column(db.String(80),unique=False,nullable=True)
    temperory_job=db.Column(db.String(80),unique=False,nullable=True)
    internship=db.Column(db.String(80),unique=False,nullable=True)
    monday_to_friday=db.Column(db.String(80),unique=False,nullable=True)
    weekend_as_needed=db.Column(db.String(80),unique=False,nullable=True)
    weekend_only=db.Column(db.String(80),unique=False,nullable=True)
    no_weekends=db.Column(db.String(80),unique=False,nullable=True)
    holidays=db.Column(db.String(80),unique=False,nullable=True)
    rotating_weekends=db.Column(db.String(80),unique=False,nullable=True)
    weekdays=db.Column(db.String(80),unique=False,nullable=True)
    every_weekend=db.Column(db.String(80),unique=False,nullable=True)
    four_hour_shift=db.Column(db.String(80),unique=False,nullable=True)
    eight_hour_shift=db.Column(db.String(80),unique=False,nullable=True)
    ten_hour_shift=db.Column(db.String(80),unique=False,nullable=True)
    twelve_hour_shift=db.Column(db.String(80),unique=False,nullable=True)
    day_shift=db.Column(db.String(80),unique=False,nullable=True)
    night_shift=db.Column(db.String(80),unique=False,nullable=True)
    evening_shift=db.Column(db.String(80),unique=False,nullable=True)
    no_night=db.Column(db.String(80),unique=False,nullable=True)
    overnight_shift=db.Column(db.String(80),unique=False,nullable=True)
    rotating_shift=db.Column(db.String(80),unique=False,nullable=True)
    split_shift=db.Column(db.String(80),unique=False,nullable=True)
    overtime=db.Column(db.String(80),unique=False,nullable=True)
    min_salary=db.Column(db.Integer,unique=False,nullable=True)
    salary_type=db.Column(db.String(80),unique=False,nullable=True)
    relocation=db.Column(db.String(80),unique=False,nullable=True)
    relocation_place=db.Column(db.String(120),unique=False,nullable=True)
    remote_job=db.Column(db.String(80),unique=False,nullable=True)
    hybrid_job=db.Column(db.String(80),unique=False,nullable=True)
    in_person=db.Column(db.String(80),unique=False,nullable=True)
    temperory_remote_job=db.Column(db.String(80),unique=False,nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'),nullable=True)
    user = db.relationship(User, backref="user_preference")

    def __init__(self,job_title_preference,
full_time_job,
part_time_job,
contract_job,
temperory_job,
internship,
monday_to_friday,
weekend_as_needed,
weekend_only,
no_weekends,
holidays,
rotating_weekends,
weekdays,
every_weekend,
four_hour_shift,
eight_hour_shift,
ten_hour_shift,
twelve_hour_shift,
day_shift,
night_shift,
evening_shift,
no_night,
overnight_shift,
rotating_shift,
split_shift,
overtime,
min_salary,
salary_type,
relocation,
relocation_place,
remote_job,
hybrid_job,
in_person,
temperory_remote_job,
user_id):
        self.job_title_preference=job_title_preference
        self.full_time_job=full_time_job
        self.part_time_job=part_time_job
        self.contract_job=contract_job
        self.temperory_job=temperory_job
        self.internship=internship
        self.monday_to_friday=monday_to_friday
        self.weekend_as_needed=weekend_as_needed
        self.weekend_only=weekend_only
        self.no_weekends=no_weekends
        self.holidays=holidays
        self.rotating_weekends=rotating_weekends
        self.weekdays=weekdays
        self.every_weekend=every_weekend
        self.four_hour_shift=four_hour_shift
        self.eight_hour_shift=eight_hour_shift
        self.ten_hour_shift=ten_hour_shift
        self.twelve_hour_shift=twelve_hour_shift
        self.day_shift=day_shift
        self.night_shift=night_shift
        self.evening_shift=evening_shift
        self.no_night=no_night
        self.overnight_shift=overnight_shift
        self.rotating_shift=rotating_shift
        self.split_shift=split_shift
        self.overtime=overtime
        self.min_salary=min_salary
        self.salary_type=salary_type
        self.relocation=relocation
        self.relocation_place=relocation_place
        self.remote_job=remote_job
        self.hybrid_job=hybrid_job
        self.in_person=in_person
        self.temperory_remote_job=temperory_remote_job
        self.user_id=user_id

    def serialize(self):
        return {
            "id": self.id,
            "job_title_preference":self.job_title_preference,
            "full_time_job":self.full_time_job,
            "part_time_job":self.part_time_job,
            "contract_job":self.contract_job,
            "temperory_job":self.temperory_job,
            "internship":self.internship,
            "monday_to_friday":self.monday_to_friday,
            "weekend_as_needed":self.weekend_as_needed,
            "weekend_only":self.weekend_only,
            "no_weekends":self.no_weekends,
            "holidays":self.holidays,
            "rotating_weekends":self.rotating_weekends,
            "weekdays":self.weekdays,
            "every_weekend":self.every_weekend,
            "four_hour_shift":self.four_hour_shift,
            "eight_hour_shift":self.eight_hour_shift,
            "ten_hour_shift":self.ten_hour_shift,
            "twelve_hour_shift":self.twelve_hour_shift,
            "day_shift":self.day_shift,
            "night_shift":self.night_shift,
            "evening_shift":self.evening_shift,
            "no_night":self.no_night,
            "overnight_shift":self.overnight_shift,
            "rotating_shift":self.rotating_shift,
            "split_shift":self.split_shift,
            "overtime":self.overtime,
            "min_salary":self.min_salary,
            "salary_type":self.salary_type,
            "relocation":self.relocation,
            "relocation_place":self.relocation_place,
            "remote_job":self.remote_job,
            "hybrid_job":self.hybrid_job,
            "in_person":self.in_person,
            "temperory_remote_job":self.temperory_remote_job,
            "user_id":self.user_id,
            "user":self.user.serialize()
            }



class Userresume(db.Model):
    __tablename__ = 'userresume'
    id = db.Column(db.Integer, primary_key=True)
    user_resume=db.Column(db.LargeBinary,unique=False, nullable=True)
    resume_name=db.Column(db.String(80))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'),nullable=True)
    user = db.relationship(User, backref="user_resume")

    def __init__(self,user_id,user_resume,resume_name):
        self.user_id=user_id
        self.user_resume=user_resume
        self.resume_name=resume_name

    def serialize(self):
        return {
            "id": self.id,
            "user_id":self.user_id,
            "resume_name":self.resume_name,
            "user":self.user.serialize()
            }

class Userskills(db.Model):
    __tablename__ = 'userskills'
    id = db.Column(db.Integer, primary_key=True)
    skill=db.Column(db.String(80),unique=False,nullable=True)
    skill_year=db.Column(db.Integer,unique=False,nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'),nullable=True)
    user = db.relationship(User, backref="user_skills")

    def __init__(self,skill,skill_year,user_id):
        self.skill=skill
        self.skill_year=skill_year
        self.user_id=user_id

    def serialize(self):
        return{
            "id":self.id,
            "skill":self.skill,
            "skill_year":self.skill_year,
            "user_id":self.user_id
        }

class Usersavedjobs(db.Model):
    __tablename__ = 'usersavedjobs'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'),nullable=True)
    job_id = db.Column(db.Integer, db.ForeignKey('postjobs.id'),nullable=True)
    user = db.relationship(User, backref="user_savedjobs")
    job = db.relationship('Postjobs', backref="user_saved_job")

    def __init__(self,user_id,job_id):
        self.user_id=user_id
        self.job_id=job_id

    def serialize(self):
        return{
            "id":self.id,
            "user_id":self.user_id,
            "job_id":self.job_id,
        }

class Userappliedjobs(db.Model):
    __tablename__ = 'userappliedjobs'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'),nullable=True)
    job_id = db.Column(db.Integer, db.ForeignKey('postjobs.id'),nullable=True)
    employer_id = db.Column(db.Integer, db.ForeignKey('employer.id'),nullable=True)
    user = db.relationship(User, backref="user_appliedjobs")
    job = db.relationship('Postjobs', backref="job_appliedjobs")

    def __init__(self,user_id,job_id,employer_id):
        self.user_id=user_id
        self.job_id=job_id
        self.employer_id=employer_id

    def serialize(self):
        return{
            "id":self.id,
            "user_id":self.user_id,
            "job_id":self.job_id,
            "employer_id":self.employer_id,
            "user":self.user.serialize(),
            "job":self.job.serialize(),
        }

class Employer(db.Model):
    __tablename__ = 'employer'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(180), unique=False, nullable=False)
    job = db.relationship('Postjobs', backref="employer_jobs")

    def __init__(self,email,password):
        self.email=email
        self.password=password

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # "job": [job.serialize() for job in self.job]
            }

class Postjobs(db.Model):
    __tablename__ = 'postjobs'
    id = db.Column(db.Integer, primary_key=True)
    employer_id = db.Column(db.Integer, db.ForeignKey('employer.id'),nullable=True)
    company_name=db.Column(db.String(80),unique=False,nullable=True)
    first_name=db.Column(db.String(40),unique=False,nullable=True)
    last_name=db.Column(db.String(40),unique=False,nullable=True)
    job_title=db.Column(db.String(500),unique=False,nullable=True)
    company_email = db.Column(db.String(120), unique=True, nullable=True)
    company_phone_number = db.Column(db.Integer, unique=True, nullable=True)
    number_hiring=db.Column(db.Integer,unique=False,nullable=True)
    work_location_type=db.Column(db.String(80),unique=False,nullable=True)
    location=db.Column(db.String(80),unique=False,nullable=True)
    job_type=db.Column(db.String(80),unique=False,nullable=True)
    working_hours=db.Column(db.Integer,unique=False,nullable=True)
    experience_level_type=db.Column(db.String(80),unique=False,nullable=True)
    education_degree=db.Column(db.String(80),unique=False,nullable=True)
    min_experience=db.Column(db.Integer,unique=False,nullable=True)
    max_experience=db.Column(db.Integer,unique=False,nullable=True)
    min_salary=db.Column(db.Integer,unique=False,nullable=True)
    max_salary=db.Column(db.Integer,unique=False,nullable=True)
    working_times=db.Column(db.String(80),unique=False,nullable=True)
    description=db.Column(db.String(5000),unique=False,nullable=True)
    weekend_job=db.Column(db.String(80),unique=False,nullable=True)
    # benefits = db.Column(ARRAY(db.String), unique=False, nullable=True)
    language=db.Column(db.String(50),unique=False,nullable=True)
    current_date = db.Column(Date, default=func.current_date())
    current_time = db.Column(Time, default=func.current_time())
    employer = db.relationship(Employer, backref="employer_postjobs")
    applicants = db.relationship('Applicants', backref='postjobs', cascade='all, delete-orphan')
    applicantsresume = db.relationship('Applicantresume', backref='postjobs', cascade='all, delete-orphan')
    favoriteapplicant = db.relationship('Favoriteapplicant', backref='postjobs', cascade='all, delete-orphan')
    applicantchat = db.relationship('Applicantchat', backref='postjobs', cascade='all, delete-orphan')
    employerchat = db.relationship('Employerchat', backref='postjobs', cascade='all, delete-orphan')
    uersavedjobs = db.relationship('Usersavedjobs', backref='postjobs', cascade='all, delete-orphan')

    def __init__(self,employer_id,company_name
                 ,first_name,last_name,job_title,
                 company_email,company_phone_number,number_hiring,
                 work_location_type,location,job_type,working_hours,
                 experience_level_type,education_degree,min_experience,max_experience,
                 min_salary,max_salary,working_times,description,weekend_job,language):
        self.employer_id=employer_id
        self.company_name=company_name
        self.first_name=first_name
        self.last_name=last_name
        self.job_title=job_title
        self.company_email=company_email
        self.company_phone_number=company_phone_number
        self.number_hiring=number_hiring
        self.work_location_type=work_location_type
        self.location=location
        self.job_type=job_type
        self.working_hours=working_hours
        self.experience_level_type=experience_level_type
        self.education_degree=education_degree
        self.min_experience=min_experience
        self.max_experience=max_experience
        self.min_salary=min_salary
        self.max_salary=max_salary
        self.working_times=working_times
        self.description=description
        self.weekend_job=weekend_job
        self.language=language

    def serialize(self):
        return {
            "id": self.id,
            "employer_id": self.employer_id,
            "company_name": self.company_name,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "job_title": self.job_title,
            "company_email": self.company_email,
            "company_phone_number": self.company_phone_number,
            "number_hiring": self.number_hiring,
            "work_location_type": self.work_location_type,
            "location": self.location,
            "job_type": self.job_type,
            "working_hours": self.working_hours,
            "experience_level_type": self.experience_level_type,
            "education_degree":self.education_degree,
            "min_experience": self.min_experience,
            "max_experience": self.max_experience,
            "min_salary": self.min_salary,
            "max_salary": self.max_salary,
            "working_times": self.working_times,
            "description": self.description,
            "weekend_job": self.weekend_job,
            "language": self.language,
            "current_date": self.current_date.isoformat() if self.current_date else None,
            "current_time": self.current_time.strftime('%H:%M') if self.current_time else None,
            # "employer":self.employer.serialize()
        }

# class Beneifits(db.Model):
#     __tablename__ = 'beneifits'
#     id = db.Column(db.Integer, primary_key=True)
#     employer_id = db.Column(db.Integer, db.ForeignKey('employer.id'),nullable=False)
#     job_id = db.Column(db.Integer, db.ForeignKey('postjobs.id'),nullable=False)
#     retirement_plan = db.Column(db.String(120), unique=True, nullable=True)
#     bonus = db.Column(db.String(80), unique=False, nullable=True)
#     vision=db.Column(db.String(40),unique=False,nullable=True)
#     medical=db.Column(db.String(40),unique=False,nullable=True)
#     dental=db.Column(db.String(40),unique=False,nullable=True)
#     employer = db.relationship(Employer, backref="employer_beneifits")
#     job = db.relationship(Postjobs, backref="postjobs_beneifits")

class Applicants(db.Model):
    __tablename__ = 'applicants'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'),nullable=True)
    email = db.Column(db.String(120), unique=False, nullable=False)
    first_name=db.Column(db.String(40),unique=False,nullable=False)
    last_name=db.Column(db.String(40),unique=False,nullable=False)
    phone_number=db.Column(db.Integer,unique=False,nullable=False)
    job_id = db.Column(db.Integer, db.ForeignKey('postjobs.id'),nullable=True)
    employer_id = db.Column(db.Integer, db.ForeignKey('employer.id'),nullable=True)
    user = db.relationship(User, backref="user_applicants")
    job = db.relationship('Postjobs', backref="appliedjobs")


    def __init__(self,user_id,email,first_name,last_name,phone_number,job_id,employer_id):
        self.user_id=user_id
        self.email=email
        self.first_name=first_name
        self.last_name=last_name
        self.phone_number=phone_number
        self.job_id=job_id
        self.employer_id=employer_id
    def serialize(self):
        return{
            "id":self.id,
            "user_id":self.user_id,
            "email":self.email,
            "first_name":self.first_name,
            "last_name":self.last_name,
            "phone_number":self.phone_number,
            "job_id":self.job_id,
            "user":self.user.serialize(),
            "job":self.job.serialize()
        }

class Applicantresume(db.Model):
    __tablename__ = 'applicantresume'
    id = db.Column(db.Integer, primary_key=True)
    applicant_user_resume=db.Column(db.LargeBinary,unique=False, nullable=True)
    applicant_resume_name=db.Column(db.String(80),unique=False, nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'),nullable=True)
    job_id = db.Column(db.Integer, db.ForeignKey('postjobs.id'),nullable=True)
    user = db.relationship(User, backref="applicant_resume")

    def __init__(self,user_id,job_id,applicant_user_resume,applicant_resume_name):
        self.user_id=user_id
        self.job_id=job_id
        self.applicant_user_resume=applicant_user_resume
        self.applicant_resume_name=applicant_resume_name

    def serialize(self):
        return {
            "id": self.id,
            "user_id":self.user_id,
            "job_id":self.job_id,
            "applicant_resume_name":self.applicant_resume_name,
            "user":self.user.serialize()
            }

class Favoriteapplicant(db.Model):
    __tablename__ = 'favoriteapplicant'
    id = db.Column(db.Integer, primary_key=True)
    employer_id = db.Column(db.Integer, db.ForeignKey('employer.id'),nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'),nullable=True)
    job_id = db.Column(db.Integer, db.ForeignKey('postjobs.id'),nullable=True)
    employer = db.relationship(Employer, backref="employer_favoriteapplicant")
    user = db.relationship(User, backref="user_favoriteapplicant")
    job = db.relationship('Postjobs', backref="employer_saved_jobs")

    def __init__(self,employer_id,user_id,job_id):
        self.employer_id=employer_id
        self.user_id=user_id
        self.job_id=job_id

    def serialize(self):
        return{
            "id":self.id,
            "employer_id":self.employer_id,
            "user_id":self.user_id,
            "job_id":self.job_id,
            "user":self.user.serialize(),
            "job":self.job.serialize(),
            "userbio": self.user.user_bio.serialize() if self.user.user_bio else None
        }

# class Matcheduser(db.Model):
#     __tablename__ = 'matcheduser'
#     id = db.Column(db.Integer, primary_key=True)
#     # user_id=db.Column(db.Integer,unique=False,nullable=True)
#     # job_id=db.Column(db.Integer,unique=False,nullable=True)

class Applicantchat(db.Model):
    __tablename__ = 'applicantchat'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'),nullable=True)
    job_id = db.Column(db.Integer, db.ForeignKey('postjobs.id'),nullable=True)
    message = db.Column(db.String(4000), nullable=False)
    current_date = db.Column(Date, default=func.current_date())
    current_time = db.Column(Time, default=func.current_time())
    user = db.relationship(User, backref="applicantchat_user")
    job = db.relationship('Postjobs', backref="applicantchat_job")

    def __init__(self,user_id,job_id,message):
        self.user_id=user_id
        self.job_id=job_id
        self.message=message

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "job_id": self.job_id,
            "message":self.message,
            "current_date": self.current_date.isoformat() if self.current_date else None,
            "current_time": self.current_time.strftime('%H:%M') if self.current_time else None,
            "user": self.user.serialize(),
            "job": self.job.serialize()
        }

class Employerchat(db.Model):
    __tablename__ = 'employerchat'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'),nullable=True)
    job_id = db.Column(db.Integer, db.ForeignKey('postjobs.id'),nullable=True)
    message = db.Column(db.String(4000), nullable=False)
    current_date = db.Column(Date, default=func.current_date())
    current_time = db.Column(Time, default=func.current_time())
    user = db.relationship(User, backref="employer_user")
    job = db.relationship('Postjobs', backref="employer_job")

    def __init__(self,user_id,job_id,message):
        self.user_id=user_id
        self.job_id=job_id
        self.message=message

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "job_id": self.job_id,
            "message":self.message,
            "current_date": self.current_date.isoformat() if self.current_date else None,
            "current_time": self.current_time.strftime('%H:%M') if self.current_time else None,
            "user": self.user.serialize(),
            "job": self.job.serialize()
        }
    

class Saveduserprofile(db.Model):
    __tablename__ = 'saveduserprofile'
    id = db.Column(db.Integer, primary_key=True)
    employer_id = db.Column(db.Integer, db.ForeignKey('employer.id'),nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'),nullable=True)
    employer = db.relationship(Employer, backref="employer_saved_user_profile")
    user = db.relationship(User, backref="user_saved_user_profile")

    def __init__(self,employer_id,user_id):
        self.employer_id=employer_id
        self.user_id=user_id

    def serialize(self):
        return{
            "id":self.id,
            "employer_id":self.employer_id,
            "user_id":self.user_id,
            "user":self.user.serialize(),
        }

class Contacteduserprofile(db.Model):
    __tablename__ = 'contacteduserprofile'
    id = db.Column(db.Integer, primary_key=True)
    employer_id = db.Column(db.Integer, db.ForeignKey('employer.id'),nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'),nullable=True)
    employer = db.relationship(Employer, backref="employer_contacted_user_profile")
    user = db.relationship(User, backref="user_contacted_user_profile")

    def __init__(self,employer_id,user_id):
        self.employer_id=employer_id
        self.user_id=user_id

    def serialize(self):
        return{
            "id":self.id,
            "employer_id":self.employer_id,
            "user_id":self.user_id,
            "user":self.user.serialize(),
        }
    


class Temp(db.Model):
    __tablename__ = 'temp'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)

    def __init__(self,email):
        self.email=email



