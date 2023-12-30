  
import os
from flask_admin import Admin
from .models import db, User,Usereducation,Userexperience,UserBio,Userpreference,Userresume,Userskills,Usersavedjobs,Userappliedjobs,Employer,Postjobs,Applicants,Favoriteapplicant,Applicantresume,Applicantchat,Employerchat
from flask_admin.contrib.sqla import ModelView

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')

    
    # Add your models here, for example this is how we add a the User model to the admin
    admin.add_view(ModelView(User, db.session))
    admin.add_view(ModelView(UserBio, db.session))
    admin.add_view(ModelView(Usereducation, db.session))
    admin.add_view(ModelView(Userexperience, db.session))
    admin.add_view(ModelView(Userpreference, db.session))
    admin.add_view(ModelView(Userresume, db.session))
    admin.add_view(ModelView(Userskills, db.session))
    admin.add_view(ModelView(Usersavedjobs, db.session))
    admin.add_view(ModelView(Userappliedjobs, db.session))
    admin.add_view(ModelView(Employer, db.session))
    admin.add_view(ModelView(Postjobs, db.session))
    admin.add_view(ModelView(Applicants, db.session))
    admin.add_view(ModelView(Favoriteapplicant, db.session))
    admin.add_view(ModelView(Applicantresume, db.session))
    admin.add_view(ModelView(Applicantchat, db.session))
    admin.add_view(ModelView(Employerchat, db.session))

    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))