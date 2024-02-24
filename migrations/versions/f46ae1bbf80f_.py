"""empty message

Revision ID: f46ae1bbf80f
Revises: 0c97f8eb75bd
Create Date: 2024-02-24 03:35:08.472493

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f46ae1bbf80f'
down_revision = '0c97f8eb75bd'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('postjobs', schema=None) as batch_op:
        batch_op.drop_constraint('postjobs_company_phone_number_key', type_='unique')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('postjobs', schema=None) as batch_op:
        batch_op.create_unique_constraint('postjobs_company_phone_number_key', ['company_phone_number'])

    # ### end Alembic commands ###
