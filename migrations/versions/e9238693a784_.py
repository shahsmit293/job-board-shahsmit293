"""empty message

Revision ID: e9238693a784
Revises: 3df4a81a14d2
Create Date: 2023-12-11 18:34:36.450940

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e9238693a784'
down_revision = '3df4a81a14d2'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('userextradetail',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('gender', sa.String(length=40), nullable=True),
    sa.Column('disability', sa.String(length=40), nullable=True),
    sa.Column('work_authorization', sa.String(length=80), nullable=False),
    sa.Column('race', sa.String(length=80), nullable=True),
    sa.Column('language', sa.String(length=80), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('userbio', schema=None) as batch_op:
        batch_op.alter_column('user_id',
               existing_type=sa.INTEGER(),
               nullable=True)
        batch_op.alter_column('location',
               existing_type=sa.VARCHAR(length=80),
               nullable=True)
        batch_op.alter_column('phone_number',
               existing_type=sa.INTEGER(),
               nullable=True)
        batch_op.drop_column('gender')
        batch_op.drop_column('language')
        batch_op.drop_column('race')
        batch_op.drop_column('disability')
        batch_op.drop_column('work_authorization')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('userbio', schema=None) as batch_op:
        batch_op.add_column(sa.Column('work_authorization', sa.VARCHAR(length=80), autoincrement=False, nullable=False))
        batch_op.add_column(sa.Column('disability', sa.VARCHAR(length=40), autoincrement=False, nullable=True))
        batch_op.add_column(sa.Column('race', sa.VARCHAR(length=80), autoincrement=False, nullable=True))
        batch_op.add_column(sa.Column('language', sa.VARCHAR(length=80), autoincrement=False, nullable=True))
        batch_op.add_column(sa.Column('gender', sa.VARCHAR(length=40), autoincrement=False, nullable=True))
        batch_op.alter_column('phone_number',
               existing_type=sa.INTEGER(),
               nullable=False)
        batch_op.alter_column('location',
               existing_type=sa.VARCHAR(length=80),
               nullable=False)
        batch_op.alter_column('user_id',
               existing_type=sa.INTEGER(),
               nullable=False)

    op.drop_table('userextradetail')
    # ### end Alembic commands ###
