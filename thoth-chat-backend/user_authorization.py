from flask import request, redirect, url_for, jsonify, json
from flask_login import login_user, logout_user, current_user, login_required
from werkzeug.security import generate_password_hash, check_password_hash

from models import *
from app import app, db



@app.route('/user_login', methods=['POST'])
def user_login():
    req_data = request.get_json()
    email = req_data["email"]
    password = req_data["password"]
    user = User.query.filter_by(user_mail=email).first()
    if not user:
        return "The user does not exists"
    if not check_password_hash(user.user_password, password):
        return "The password does not match"
    login_user(user)
    return jsonify(id=current_user.id,name=current_user.user_name,email=current_user.user_mail,company_id=current_user.company_id)


@app.route('/user_logout', methods=['GET'])
@login_required
def user_logout():
    logout_user()
    return "You are logged out!"


@app.route('/user_register', methods=['POST'])
def user_register():
    req_data = request.get_json()
    username = req_data["username"]
    email = req_data["email"]
    password = req_data["password"]
    company_name = req_data["company_name"]
    comp = Companydetails.query.filter_by(company_name=company_name).first()
    print(comp.id)
    user = User.query.filter_by(user_mail=email).first()
    if user:
        return "User already exist"
    new_user = User(user_mail=email, user_name=username,
                    user_password=generate_password_hash(password, method='sha256'), company_id=comp.id)
    db.session.add(new_user)
    db.session.commit()
    return "User registered succesfully"


@app.route('/company_register', methods=['POST'])
def company_register():
    req_data = request.get_json()
    company_name = req_data["company_name"]
    company_email = req_data["company_email"]
    company_password = req_data["company_password"]
    company = Companydetails.query.filter_by(company_email=company_email).first()
    if company:
        return "Company already exist"
    new_company = Companydetails(company_name=company_name, company_email=company_email,
                                 company_password=generate_password_hash(company_password, method='sha256'))
    db.session.add(new_company)
    db.session.commit()
    return "Company registered succesfully"

@app.route('/list-rooms/<id>',methods=['GET'])
def list_rooms(id):
    user_object=User.query.filter_by(id=id).first()
    list_of_users=user_object.user_involved_in_conversations
    return jsonify([{"conversation_id":c.conversation_id,"conversation_name":c.conversation_name} for c in list_of_users])


#coustomized code

@app.route('/users-list',methods=['GET'])
def user_list():
    users_list = User.query.all()
    return jsonify(([{"id":user.id,"user_mail":user.user_mail,"user_name":user.user_name,"company_name":user.company_id} for user in users_list]))