from datetime import datetime
from flask_login import UserMixin
from app import db


class Companydetails(db.Model):
    id=db.Column(db.Integer,primary_key=True)
    company_name=db.Column(db.String(100))
    company_email=db.Column(db.String(100),unique=True)
    company_password=db.Column(db.Text())
    users=db.relationship('User',backref='belongs_to_company',lazy=True)


user_conversation=db.Table('user_conversation',
    db.Column('user_id',db.Integer,db.ForeignKey('user.id'),nullable=False),
    db.Column('conversation_id',db.Integer,db.ForeignKey('conversation.conversation_id'),nullable=False)
                           )


class User(UserMixin,db.Model):
    id=db.Column(db.Integer,primary_key=True)
    user_mail=db.Column(db.String(100),unique=True)
    user_name=db.Column(db.String(100))
    user_password=db.Column(db.Text())
    company_id = db.Column(db.Integer, db.ForeignKey('companydetails.id'), nullable=False)
    messages_authored=db.relationship('Message',backref='author_of_message',lazy=True)


class Message(db.Model):
    msg_id=db.Column(db.Integer,primary_key=True)
    sender_id=db.Column(db.Integer,db.ForeignKey('user.id'),nullable=False)
    conversation_id = db.Column(db.Integer, db.ForeignKey('conversation.conversation_id'), nullable=False)
    attachment_path = db.Column(db.Text(), unique=True)
    content=db.Column(db.Text())
    sent_time=db.Column(db.DateTime,default=datetime.now)


class Conversation(db.Model):
    conversation_id=db.Column(db.Integer,primary_key=True)
    conversation_name=db.Column(db.String(100))
    messages_in_conversation=db.relationship('Message',backref='belongs_to_conversation',lazy=True)
    users_in_this_conversation=db.relationship('User',secondary=user_conversation,backref=db.backref('user_involved_in_conversations',lazy='dynamic'))

