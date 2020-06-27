"""empty message

Revision ID: fac339ffcf31
Revises: 
Create Date: 2020-03-11 15:02:58.436643

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'fac339ffcf31'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('companydetails',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('company_name', sa.String(length=100), nullable=True),
    sa.Column('company_email', sa.String(length=100), nullable=True),
    sa.Column('company_password', sa.Text(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('company_email')
    )
    op.create_table('conversation',
    sa.Column('conversation_id', sa.Integer(), nullable=False),
    sa.Column('conversation_name', sa.String(length=100), nullable=True),
    sa.PrimaryKeyConstraint('conversation_id')
    )
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_mail', sa.String(length=100), nullable=True),
    sa.Column('user_name', sa.String(length=100), nullable=True),
    sa.Column('user_password', sa.Text(), nullable=True),
    sa.Column('company_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['company_id'], ['companydetails.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('user_mail')
    )
    op.create_table('message',
    sa.Column('msg_id', sa.Integer(), nullable=False),
    sa.Column('sender_id', sa.Integer(), nullable=False),
    sa.Column('conversation_id', sa.Integer(), nullable=False),
    sa.Column('attachment_path', sa.Text(), nullable=True),
    sa.Column('content', sa.Text(), nullable=True),
    sa.Column('sent_time', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['conversation_id'], ['conversation.conversation_id'], ),
    sa.ForeignKeyConstraint(['sender_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('msg_id'),
    sa.UniqueConstraint('attachment_path')
    )
    op.create_table('user_conversation',
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('conversation_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['conversation_id'], ['conversation.conversation_id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], )
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('user_conversation')
    op.drop_table('message')
    op.drop_table('user')
    op.drop_table('conversation')
    op.drop_table('companydetails')
    # ### end Alembic commands ###
