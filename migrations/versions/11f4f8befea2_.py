"""empty message

Revision ID: 11f4f8befea2
Revises: d38dccba217e
Create Date: 2023-12-03 12:33:07.335827

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '11f4f8befea2'
down_revision = 'd38dccba217e'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('employer',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('password', sa.String(length=80), nullable=False),
    sa.Column('first_name', sa.String(length=40), nullable=False),
    sa.Column('last_name', sa.String(length=40), nullable=False),
    sa.Column('location', sa.String(length=80), nullable=False),
    sa.Column('employer_phone_number', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('employer_phone_number')
    )
    op.create_table('postjobs',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('employer_id', sa.Integer(), nullable=False),
    sa.Column('company_name', sa.String(length=80), nullable=False),
    sa.Column('company_email', sa.String(length=120), nullable=False),
    sa.Column('company_phone_number', sa.Integer(), nullable=False),
    sa.Column('job_title', sa.String(length=500), nullable=True),
    sa.Column('min_salary', sa.Integer(), nullable=True),
    sa.Column('relocation', sa.String(length=80), nullable=True),
    sa.Column('temperory_job', sa.String(length=80), nullable=True),
    sa.Column('permanent_job', sa.String(length=80), nullable=True),
    sa.Column('contract_job', sa.String(length=80), nullable=True),
    sa.Column('part_time_job', sa.String(length=80), nullable=True),
    sa.Column('full_time_job', sa.String(length=80), nullable=True),
    sa.Column('remote_job', sa.String(length=80), nullable=True),
    sa.Column('onsite_job', sa.String(length=80), nullable=True),
    sa.Column('hybrid_job', sa.String(length=80), nullable=True),
    sa.Column('day_shift_job', sa.String(length=80), nullable=True),
    sa.Column('night_shift_job', sa.String(length=80), nullable=True),
    sa.Column('location', sa.String(length=100), nullable=True),
    sa.Column('description', sa.String(length=5000), nullable=True),
    sa.Column('min_experience', sa.Integer(), nullable=False),
    sa.Column('resume_required', sa.String(length=20), nullable=True),
    sa.Column('language', sa.String(length=50), nullable=True),
    sa.ForeignKeyConstraint(['employer_id'], ['employer.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('company_email'),
    sa.UniqueConstraint('company_phone_number')
    )
    op.create_table('usercertificates',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('certificate_name', sa.String(length=80), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('usereducation',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('collage_name', sa.String(length=80), nullable=True),
    sa.Column('start_year', sa.Integer(), nullable=True),
    sa.Column('end_year', sa.Integer(), nullable=True),
    sa.Column('gpa', sa.Integer(), nullable=True),
    sa.Column('major', sa.String(length=80), nullable=True),
    sa.Column('degree', sa.String(length=80), nullable=True),
    sa.Column('location', sa.String(length=80), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('userexperience',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('job_title', sa.String(length=80), nullable=True),
    sa.Column('company_name', sa.String(length=80), nullable=True),
    sa.Column('job_type', sa.String(length=80), nullable=True),
    sa.Column('start_year', sa.Integer(), nullable=True),
    sa.Column('end_year', sa.Integer(), nullable=True),
    sa.Column('description', sa.String(length=4000), nullable=True),
    sa.Column('location', sa.String(length=80), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('userinternship',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('job_title', sa.String(length=80), nullable=True),
    sa.Column('company_name', sa.String(length=80), nullable=True),
    sa.Column('job_type', sa.String(length=80), nullable=True),
    sa.Column('start_year', sa.Integer(), nullable=True),
    sa.Column('end_year', sa.Integer(), nullable=True),
    sa.Column('description', sa.String(length=4000), nullable=True),
    sa.Column('location', sa.String(length=80), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('userpreference',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('job_title_preference', sa.String(length=500), nullable=True),
    sa.Column('min_salary', sa.Integer(), nullable=True),
    sa.Column('relocation', sa.String(length=80), nullable=True),
    sa.Column('temperory_job', sa.String(length=80), nullable=True),
    sa.Column('permanent_job', sa.String(length=80), nullable=True),
    sa.Column('contract_job', sa.String(length=80), nullable=True),
    sa.Column('part_time_job', sa.String(length=80), nullable=True),
    sa.Column('full_time_job', sa.String(length=80), nullable=True),
    sa.Column('remote_job', sa.String(length=80), nullable=True),
    sa.Column('onsite_job', sa.String(length=80), nullable=True),
    sa.Column('hybrid_job', sa.String(length=80), nullable=True),
    sa.Column('day_shift_job', sa.String(length=80), nullable=True),
    sa.Column('night_shift_job', sa.String(length=80), nullable=True),
    sa.Column('location_preference', sa.String(length=500), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('userresume',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('userskills',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('skill', sa.String(length=80), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('applicants',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('employer_id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('job_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['employer_id'], ['employer.id'], ),
    sa.ForeignKeyConstraint(['job_id'], ['postjobs.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('beneifits',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('employer_id', sa.Integer(), nullable=False),
    sa.Column('job_id', sa.Integer(), nullable=False),
    sa.Column('retirement_plan', sa.String(length=120), nullable=True),
    sa.Column('bonus', sa.String(length=80), nullable=True),
    sa.Column('vision', sa.String(length=40), nullable=True),
    sa.Column('medical', sa.String(length=40), nullable=True),
    sa.Column('dental', sa.String(length=40), nullable=True),
    sa.ForeignKeyConstraint(['employer_id'], ['employer.id'], ),
    sa.ForeignKeyConstraint(['job_id'], ['postjobs.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('retirement_plan')
    )
    op.create_table('favoriteapplicant',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('employer_id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('job_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['employer_id'], ['employer.id'], ),
    sa.ForeignKeyConstraint(['job_id'], ['postjobs.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('userappliedjobs',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('job_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['job_id'], ['postjobs.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('usersavedjobs',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('job_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['job_id'], ['postjobs.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('first_name', sa.String(length=40), nullable=False))
        batch_op.add_column(sa.Column('last_name', sa.String(length=40), nullable=False))
        batch_op.add_column(sa.Column('location', sa.String(length=80), nullable=False))
        batch_op.add_column(sa.Column('phone_number', sa.Integer(), nullable=False))
        batch_op.add_column(sa.Column('gender', sa.String(length=40), nullable=True))
        batch_op.add_column(sa.Column('disability', sa.String(length=40), nullable=True))
        batch_op.add_column(sa.Column('work_authorization', sa.String(length=80), nullable=False))
        batch_op.add_column(sa.Column('race', sa.String(length=80), nullable=True))
        batch_op.add_column(sa.Column('language', sa.String(length=80), nullable=True))
        batch_op.add_column(sa.Column('user_visibility_profile', sa.String(length=80), nullable=True))
        batch_op.create_unique_constraint(None, ['phone_number'])
        batch_op.drop_column('is_active')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('is_active', sa.BOOLEAN(), autoincrement=False, nullable=False))
        batch_op.drop_constraint(None, type_='unique')
        batch_op.drop_column('user_visibility_profile')
        batch_op.drop_column('language')
        batch_op.drop_column('race')
        batch_op.drop_column('work_authorization')
        batch_op.drop_column('disability')
        batch_op.drop_column('gender')
        batch_op.drop_column('phone_number')
        batch_op.drop_column('location')
        batch_op.drop_column('last_name')
        batch_op.drop_column('first_name')

    op.drop_table('usersavedjobs')
    op.drop_table('userappliedjobs')
    op.drop_table('favoriteapplicant')
    op.drop_table('beneifits')
    op.drop_table('applicants')
    op.drop_table('userskills')
    op.drop_table('userresume')
    op.drop_table('userpreference')
    op.drop_table('userinternship')
    op.drop_table('userexperience')
    op.drop_table('usereducation')
    op.drop_table('usercertificates')
    op.drop_table('postjobs')
    op.drop_table('employer')
    # ### end Alembic commands ###
