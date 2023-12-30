"""empty message

Revision ID: 127e983bd0f5
Revises: fa459f24818f
Create Date: 2023-12-30 20:57:12.770249

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '127e983bd0f5'
down_revision = 'fa459f24818f'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('usercertificates')
    with op.batch_alter_table('applicantchat', schema=None) as batch_op:
        batch_op.drop_constraint('applicantchat_user_id_fkey', type_='foreignkey')
        batch_op.drop_constraint('applicantchat_job_id_fkey', type_='foreignkey')
        batch_op.create_foreign_key(None, 'user', ['user_id'], ['id'])
        batch_op.create_foreign_key(None, 'postjobs', ['job_id'], ['id'])

    with op.batch_alter_table('applicantresume', schema=None) as batch_op:
        batch_op.drop_constraint('applicantresume_user_id_fkey', type_='foreignkey')
        batch_op.drop_constraint('applicantresume_job_id_fkey', type_='foreignkey')
        batch_op.create_foreign_key(None, 'postjobs', ['job_id'], ['id'])
        batch_op.create_foreign_key(None, 'user', ['user_id'], ['id'])

    with op.batch_alter_table('applicants', schema=None) as batch_op:
        batch_op.drop_constraint('applicants_employer_id_fkey', type_='foreignkey')
        batch_op.drop_constraint('applicants_job_id_fkey', type_='foreignkey')
        batch_op.drop_constraint('applicants_user_id_fkey', type_='foreignkey')
        batch_op.create_foreign_key(None, 'user', ['user_id'], ['id'])
        batch_op.create_foreign_key(None, 'employer', ['employer_id'], ['id'])
        batch_op.create_foreign_key(None, 'postjobs', ['job_id'], ['id'])

    with op.batch_alter_table('employerchat', schema=None) as batch_op:
        batch_op.drop_constraint('employerchat_job_id_fkey', type_='foreignkey')
        batch_op.drop_constraint('employerchat_user_id_fkey', type_='foreignkey')
        batch_op.create_foreign_key(None, 'user', ['user_id'], ['id'])
        batch_op.create_foreign_key(None, 'postjobs', ['job_id'], ['id'])

    with op.batch_alter_table('favoriteapplicant', schema=None) as batch_op:
        batch_op.drop_constraint('favoriteapplicant_job_id_fkey', type_='foreignkey')
        batch_op.drop_constraint('favoriteapplicant_user_id_fkey', type_='foreignkey')
        batch_op.drop_constraint('favoriteapplicant_employer_id_fkey', type_='foreignkey')
        batch_op.create_foreign_key(None, 'user', ['user_id'], ['id'])
        batch_op.create_foreign_key(None, 'employer', ['employer_id'], ['id'])
        batch_op.create_foreign_key(None, 'postjobs', ['job_id'], ['id'])

    with op.batch_alter_table('postjobs', schema=None) as batch_op:
        batch_op.drop_constraint('postjobs_employer_id_fkey', type_='foreignkey')
        batch_op.create_foreign_key(None, 'employer', ['employer_id'], ['id'])

    with op.batch_alter_table('userappliedjobs', schema=None) as batch_op:
        batch_op.drop_constraint('userappliedjobs_job_id_fkey', type_='foreignkey')
        batch_op.drop_constraint('userappliedjobs_user_id_fkey', type_='foreignkey')
        batch_op.drop_constraint('userappliedjobs_employer_id_fkey', type_='foreignkey')
        batch_op.create_foreign_key(None, 'employer', ['employer_id'], ['id'])
        batch_op.create_foreign_key(None, 'postjobs', ['job_id'], ['id'])
        batch_op.create_foreign_key(None, 'user', ['user_id'], ['id'])

    with op.batch_alter_table('userbio', schema=None) as batch_op:
        batch_op.drop_constraint('userbio_user_id_fkey', type_='foreignkey')
        batch_op.create_foreign_key(None, 'user', ['user_id'], ['id'])

    with op.batch_alter_table('usereducation', schema=None) as batch_op:
        batch_op.drop_constraint('usereducation_user_id_fkey', type_='foreignkey')
        batch_op.create_foreign_key(None, 'user', ['user_id'], ['id'])

    with op.batch_alter_table('userexperience', schema=None) as batch_op:
        batch_op.drop_constraint('userexperience_user_id_fkey', type_='foreignkey')
        batch_op.create_foreign_key(None, 'user', ['user_id'], ['id'])

    with op.batch_alter_table('userextradetail', schema=None) as batch_op:
        batch_op.drop_constraint('userextradetail_user_id_fkey', type_='foreignkey')
        batch_op.create_foreign_key(None, 'user', ['user_id'], ['id'])

    with op.batch_alter_table('userpreference', schema=None) as batch_op:
        batch_op.drop_constraint('userpreference_user_id_fkey', type_='foreignkey')
        batch_op.create_foreign_key(None, 'user', ['user_id'], ['id'])

    with op.batch_alter_table('userresume', schema=None) as batch_op:
        batch_op.drop_constraint('userresume_user_id_fkey', type_='foreignkey')
        batch_op.create_foreign_key(None, 'user', ['user_id'], ['id'])

    with op.batch_alter_table('usersavedjobs', schema=None) as batch_op:
        batch_op.drop_constraint('usersavedjobs_job_id_fkey', type_='foreignkey')
        batch_op.drop_constraint('usersavedjobs_user_id_fkey', type_='foreignkey')
        batch_op.create_foreign_key(None, 'user', ['user_id'], ['id'])
        batch_op.create_foreign_key(None, 'postjobs', ['job_id'], ['id'])

    with op.batch_alter_table('userskills', schema=None) as batch_op:
        batch_op.drop_constraint('userskills_user_id_fkey', type_='foreignkey')
        batch_op.create_foreign_key(None, 'user', ['user_id'], ['id'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('userskills', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.create_foreign_key('userskills_user_id_fkey', 'user', ['user_id'], ['id'], ondelete='CASCADE')

    with op.batch_alter_table('usersavedjobs', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.create_foreign_key('usersavedjobs_user_id_fkey', 'user', ['user_id'], ['id'], ondelete='CASCADE')
        batch_op.create_foreign_key('usersavedjobs_job_id_fkey', 'postjobs', ['job_id'], ['id'], ondelete='CASCADE')

    with op.batch_alter_table('userresume', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.create_foreign_key('userresume_user_id_fkey', 'user', ['user_id'], ['id'], ondelete='CASCADE')

    with op.batch_alter_table('userpreference', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.create_foreign_key('userpreference_user_id_fkey', 'user', ['user_id'], ['id'], ondelete='CASCADE')

    with op.batch_alter_table('userextradetail', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.create_foreign_key('userextradetail_user_id_fkey', 'user', ['user_id'], ['id'], ondelete='CASCADE')

    with op.batch_alter_table('userexperience', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.create_foreign_key('userexperience_user_id_fkey', 'user', ['user_id'], ['id'], ondelete='CASCADE')

    with op.batch_alter_table('usereducation', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.create_foreign_key('usereducation_user_id_fkey', 'user', ['user_id'], ['id'], ondelete='CASCADE')

    with op.batch_alter_table('userbio', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.create_foreign_key('userbio_user_id_fkey', 'user', ['user_id'], ['id'], ondelete='CASCADE')

    with op.batch_alter_table('userappliedjobs', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.create_foreign_key('userappliedjobs_employer_id_fkey', 'employer', ['employer_id'], ['id'], ondelete='CASCADE')
        batch_op.create_foreign_key('userappliedjobs_user_id_fkey', 'user', ['user_id'], ['id'], ondelete='CASCADE')
        batch_op.create_foreign_key('userappliedjobs_job_id_fkey', 'postjobs', ['job_id'], ['id'], ondelete='CASCADE')

    with op.batch_alter_table('postjobs', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.create_foreign_key('postjobs_employer_id_fkey', 'employer', ['employer_id'], ['id'], ondelete='CASCADE')

    with op.batch_alter_table('favoriteapplicant', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.create_foreign_key('favoriteapplicant_employer_id_fkey', 'employer', ['employer_id'], ['id'], ondelete='CASCADE')
        batch_op.create_foreign_key('favoriteapplicant_user_id_fkey', 'user', ['user_id'], ['id'], ondelete='CASCADE')
        batch_op.create_foreign_key('favoriteapplicant_job_id_fkey', 'postjobs', ['job_id'], ['id'], ondelete='CASCADE')

    with op.batch_alter_table('employerchat', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.create_foreign_key('employerchat_user_id_fkey', 'user', ['user_id'], ['id'], ondelete='CASCADE')
        batch_op.create_foreign_key('employerchat_job_id_fkey', 'postjobs', ['job_id'], ['id'], ondelete='CASCADE')

    with op.batch_alter_table('applicants', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.create_foreign_key('applicants_user_id_fkey', 'user', ['user_id'], ['id'], ondelete='CASCADE')
        batch_op.create_foreign_key('applicants_job_id_fkey', 'postjobs', ['job_id'], ['id'], ondelete='CASCADE')
        batch_op.create_foreign_key('applicants_employer_id_fkey', 'employer', ['employer_id'], ['id'], ondelete='CASCADE')

    with op.batch_alter_table('applicantresume', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.create_foreign_key('applicantresume_job_id_fkey', 'postjobs', ['job_id'], ['id'], ondelete='CASCADE')
        batch_op.create_foreign_key('applicantresume_user_id_fkey', 'user', ['user_id'], ['id'], ondelete='CASCADE')

    with op.batch_alter_table('applicantchat', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.create_foreign_key('applicantchat_job_id_fkey', 'postjobs', ['job_id'], ['id'], ondelete='CASCADE')
        batch_op.create_foreign_key('applicantchat_user_id_fkey', 'user', ['user_id'], ['id'], ondelete='CASCADE')

    op.create_table('usercertificates',
    sa.Column('id', sa.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('certificate_name', sa.VARCHAR(length=80), autoincrement=False, nullable=True),
    sa.Column('user_id', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], name='usercertificates_user_id_fkey', ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id', name='usercertificates_pkey')
    )
    # ### end Alembic commands ###
