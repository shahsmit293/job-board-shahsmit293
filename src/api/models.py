from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    first_name=db.Column(db.String(40),unique=False,nullable=False)
    last_name=db.Column(db.String(40),unique=False,nullable=False)
    location=db.Column(db.String(80),unique=False,nullable=False)
    phone_number=db.Column(db.Integer,unique=True,nullable=False)
    gender=db.Column(db.String(40),unique=False,nullable=True)
    disability=db.Column(db.String(40),unique=False,nullable=True)
    work_authorization=db.Column(db.String(80),unique=False,nullable=False)
    race=db.Column(db.String(80),unique=False,nullable=True)
    language=db.Column(db.String(80),unique=False,nullable=True)
    user_visibility_profile=db.Column(db.String(80),unique=False,nullable=True) 
    

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }

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
    # resume_pdf=db.Co
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'),nullable=False)
    user = db.relationship(User, backref="user_resume")

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
    password = db.Column(db.String(80), unique=False, nullable=False)
    first_name=db.Column(db.String(40),unique=False,nullable=False)
    last_name=db.Column(db.String(40),unique=False,nullable=False)
    location=db.Column(db.String(80),unique=False,nullable=False)
    employer_phone_number=db.Column(db.Integer,unique=True,nullable=False)
    job = db.relationship('Postjobs', backref="employer_jobs")

class Postjobs(db.Model):
    __tablename__ = 'postjobs'
    id = db.Column(db.Integer, primary_key=True)
    employer_id = db.Column(db.Integer, db.ForeignKey('employer.id'),nullable=False)
    company_name=db.Column(db.String(80),unique=False,nullable=False)
    # company_logo=db.Column(db.String(80),unique=False,nullable=False)
    company_email = db.Column(db.String(120), unique=True, nullable=False)
    company_phone_number = db.Column(db.Integer, unique=True, nullable=False)
    job_title=db.Column(db.String(500),unique=False,nullable=True)
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
    location=db.Column(db.String(100),unique=False,nullable=True)
    description=db.Column(db.String(5000),unique=False,nullable=True)
    min_experience=db.Column(db.Integer,unique=False,nullable=False)
    resume_required=db.Column(db.String(20),unique=False,nullable=True)
    language=db.Column(db.String(50),unique=False,nullable=True)
    employer = db.relationship(Employer, backref="employer_postjobs")

class Beneifits(db.Model):
    __tablename__ = 'beneifits'
    id = db.Column(db.Integer, primary_key=True)
    employer_id = db.Column(db.Integer, db.ForeignKey('employer.id'),nullable=False)
    job_id = db.Column(db.Integer, db.ForeignKey('postjobs.id'),nullable=False)
    retirement_plan = db.Column(db.String(120), unique=True, nullable=True)
    bonus = db.Column(db.String(80), unique=False, nullable=True)
    vision=db.Column(db.String(40),unique=False,nullable=True)
    medical=db.Column(db.String(40),unique=False,nullable=True)
    dental=db.Column(db.String(40),unique=False,nullable=True)
    employer = db.relationship(Employer, backref="employer_beneifits")
    job = db.relationship(Postjobs, backref="postjobs_beneifits")

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

