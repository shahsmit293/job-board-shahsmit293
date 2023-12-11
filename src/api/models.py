from flask_sqlalchemy import SQLAlchemy
# from sqlalchemy import ARRAY

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(180), unique=False, nullable=False)

    def __init__(self,email,password):
        self.email=email
        self.password=password

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            }
    
class UserBio(db.Model):
    __tablename__ = 'userbio'
    id = db.Column(db.Integer, primary_key=True)
    first_name=db.Column(db.String(40),unique=False,nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'),nullable=False)
    last_name=db.Column(db.String(40),unique=False,nullable=False)
    location=db.Column(db.String(80),unique=False,nullable=False)
    phone_number=db.Column(db.Integer,unique=True,nullable=False)
    gender=db.Column(db.String(40),unique=False,nullable=True)
    disability=db.Column(db.String(40),unique=False,nullable=True)
    work_authorization=db.Column(db.String(80),unique=False,nullable=False)
    race=db.Column(db.String(80),unique=False,nullable=True)
    language=db.Column(db.String(80),unique=False,nullable=True)
    user = db.relationship(User, backref="user_bio")


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
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'),nullable=False)
    user = db.relationship(User, backref="user_education")
    

class Userexperience(db.Model):
    __tablename__ = 'userexperience'
    id = db.Column(db.Integer, primary_key=True)
    job_title=db.Column(db.String(80),unique=False,nullable=True)
    company_name=db.Column(db.String(80),unique=False,nullable=True)
    job_type=db.Column(db.String(80),unique=False,nullable=True)
    start_year=db.Column(db.Integer,unique=False,nullable=True)
    end_year=db.Column(db.Integer,unique=False,nullable=True)
    description=db.Column(db.String(4000),unique=False,nullable=True)
    location=db.Column(db.String(80),unique=False,nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'),nullable=False)
    user = db.relationship(User, backref="user_experience")

class Userpreference(db.Model):
    __tablename__ = 'userpreference'
    id = db.Column(db.Integer, primary_key=True)
    job_title_preference=db.Column(db.String(500),unique=False,nullable=True)
    min_salary=db.Column(db.Integer,unique=False,nullable=True)
    relocation=db.Column(db.String(80),unique=False,nullable=True)
    temperory_job=db.Column(db.String(80),unique=False,nullable=True)
    permanent_job=db.Column(db.String(80),unique=False,nullable=True)
    contract_job=db.Column(db.String(80),unique=False,nullable=True)
    part_time_job=db.Column(db.String(80),unique=False,nullable=True)
    full_time_job=db.Column(db.String(80),unique=False,nullable=True)
    remote_job=db.Column(db.String(80),unique=False,nullable=True)
    onsite_job=db.Column(db.String(80),unique=False,nullable=True)
    hybrid_job=db.Column(db.String(80),unique=False,nullable=True)
    day_shift_job=db.Column(db.String(80),unique=False,nullable=True)
    night_shift_job=db.Column(db.String(80),unique=False,nullable=True)
    location_preference=db.Column(db.String(500),unique=False,nullable=True)
    user_visibility_profile=db.Column(db.String(80),unique=False,nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'),nullable=False)
    user = db.relationship(User, backref="user_preference")

class Userinternship(db.Model):
    __tablename__ = 'userinternship'
    id = db.Column(db.Integer, primary_key=True)
    job_title=db.Column(db.String(80),unique=False,nullable=True)
    company_name=db.Column(db.String(80),unique=False,nullable=True)
    job_type=db.Column(db.String(80),unique=False,nullable=True)
    start_year=db.Column(db.Integer,unique=False,nullable=True)
    end_year=db.Column(db.Integer,unique=False,nullable=True)
    description=db.Column(db.String(4000),unique=False,nullable=True)
    location=db.Column(db.String(80),unique=False,nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'),nullable=False)
    user = db.relationship(User, backref="user_internship")

class Userresume(db.Model):
    __tablename__ = 'userresume'
    id = db.Column(db.Integer, primary_key=True)
    user_resume=db.Column(db.LargeBinary,unique=False, nullable=True)
    resume_name=db.Column(db.String(80))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'),nullable=False)
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
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'),nullable=False)
    user = db.relationship(User, backref="user_skills")

class Usercertificates(db.Model):
    __tablename__ = 'usercertificates'
    id = db.Column(db.Integer, primary_key=True)
    certificate_name=db.Column(db.String(80),unique=False,nullable=True)
    # certificate_image=db.Column(db.String(80),unique=False,nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'),nullable=False)
    user = db.relationship(User, backref="user_certificates")

class Usersavedjobs(db.Model):
    __tablename__ = 'usersavedjobs'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'),nullable=False)
    job_id = db.Column(db.Integer, db.ForeignKey('postjobs.id'),nullable=False)
    user = db.relationship(User, backref="user_savedjobs")

class Userappliedjobs(db.Model):
    __tablename__ = 'userappliedjobs'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'),nullable=False)
    job_id = db.Column(db.Integer, db.ForeignKey('postjobs.id'),nullable=False)
    user = db.relationship(User, backref="user_appliedjobs")
    job = db.relationship('Postjobs', backref="job_appliedjobs")

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
    company_logo = db.Column(db.LargeBinary, unique=False, nullable=True)
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
    min_experience=db.Column(db.Integer,unique=False,nullable=True)
    max_experience=db.Column(db.Integer,unique=False,nullable=True)
    min_salary=db.Column(db.Integer,unique=False,nullable=True)
    max_salary=db.Column(db.Integer,unique=False,nullable=True)
    working_times=db.Column(db.String(80),unique=False,nullable=True)
    description=db.Column(db.String(5000),unique=False,nullable=True)
    weekend_job=db.Column(db.String(80),unique=False,nullable=True)
    # benefits = db.Column(ARRAY(db.String), unique=False, nullable=True)
    language=db.Column(db.String(50),unique=False,nullable=True)
    employer = db.relationship(Employer, backref="employer_postjobs")

    def __init__(self,employer_id,company_name,
                 company_logo,first_name,last_name,job_title,
                 company_email,company_phone_number,number_hiring,
                 work_location_type,location,job_type,working_hours,
                 experience_level_type,min_experience,max_experience,
                 min_salary,max_salary,working_times,description,weekend_job,language):
        self.employer_id=employer_id
        self.company_name=company_name
        self.company_logo=company_logo
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
            "company_logo": self.company_logo,
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
            "min_experience": self.min_experience,
            "max_experience": self.max_experience,
            "min_salary": self.min_salary,
            "max_salary": self.max_salary,
            "working_times": self.working_times,
            "description": self.description,
            "weekend_job": self.weekend_job,
            "language": self.language,
            "employer":self.employer.serialize()
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
    employer_id = db.Column(db.Integer, db.ForeignKey('employer.id'),nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'),nullable=False)
    job_id = db.Column(db.Integer, db.ForeignKey('postjobs.id'),nullable=False)
    employer = db.relationship(Employer, backref="employer_applicants")
    user = db.relationship(User, backref="user_applicants")

class Favoriteapplicant(db.Model):
    __tablename__ = 'favoriteapplicant'
    id = db.Column(db.Integer, primary_key=True)
    employer_id = db.Column(db.Integer, db.ForeignKey('employer.id'),nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'),nullable=False)
    job_id = db.Column(db.Integer, db.ForeignKey('postjobs.id'),nullable=False)
    employer = db.relationship(Employer, backref="employer_favoriteapplicant")
    user = db.relationship(User, backref="user_favoriteapplicant")

# class Matcheduser(db.Model):
#     __tablename__ = 'matcheduser'
#     id = db.Column(db.Integer, primary_key=True)
#     # user_id=db.Column(db.Integer,unique=False,nullable=True)
#     # job_id=db.Column(db.Integer,unique=False,nullable=True)

