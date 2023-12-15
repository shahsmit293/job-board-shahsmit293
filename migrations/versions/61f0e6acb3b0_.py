"""empty message

Revision ID: 61f0e6acb3b0
Revises: e9238693a784
Create Date: 2023-12-15 02:31:18.166611

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '61f0e6acb3b0'
down_revision = 'e9238693a784'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('userskills', schema=None) as batch_op:
        batch_op.add_column(sa.Column('skill_year', sa.Integer(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('userskills', schema=None) as batch_op:
        batch_op.drop_column('skill_year')

    # ### end Alembic commands ###
