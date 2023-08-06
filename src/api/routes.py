"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)


# @api.route('/hello', methods=['POST', 'GET'])
# def handle_hello():

#     response_body = {
#         "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
#     }

#     return jsonify(response_body), 200

# # create one user
# @api.route('/users', methods=['POST'])
# def create_user():

#     request_body = request.get_json(force=True)
# # creacion de un registro en la tabla de user
#     user = User(email=request_body["email"],password=request_body["password"],is_active=request_body[True])
#     db.session.add(user)
#     db.session.commit()

#     response_body = {
#         "msg": "user created",
#     }
#        return jsonify(response_body), 200
    # ENDPOINTS PARA CREACIÓN DE USUARIO

@api.route('/user', methods=['POST'])
def create_user():
    request_body = request.get_json(force=True)
    if 'email' not in request_body or 'password' not in request_body:
        return jsonify({"error": "Missing required fields"}), 400

    existing_user = User.query.filter_by(
        email=request_body['email']).first()
    if existing_user:
        return jsonify({"error": "User with this email already exists"}), 409

    user = User(email=request_body['email'], password=request_body['password'], is_active = True)

    db.session.add(user)
    db.session.commit()

    response_body = {
        "results": 'User Created',
        "user": user.serialize()
    }

    response = jsonify(response_body)
    # Agregar el encabezado "Access-Control-Allow-Origin" para permitir solicitudes desde cualquier origen (*)
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response, 200

 


@api.route("/signup", methods=["POST"])
def signup():  
    request_body = request.get_json(force=True)
    #creacion de un registro en la tabla de user 
    if "is_active" not in request_body:
            request_body.update({"is_active":True})

    if "email" not in request_body:
        return jsonify({"msg": "You have to put an email"}), 404
    
    email_query = User.query.filter_by(email=request_body["email"]).first()
    
    if email_query != None:
        return jsonify({"msg": "User already exists"}), 400
        
    if "password" not in request_body:
        return jsonify({"msg": "You have to put a password"}), 404
    
    user = User(email=request_body["email"],password=request_body["password"],is_active=request_body["is_active"])

    db.session.add(user)
    db.session.commit()

    response_body = {
        "msg": "User created"
    }
    
    return jsonify(response_body), 200

#login users
# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.


@api.route("/login", methods=["POST"])
def login():
    response = jsonify()
    response.headers["Access-Control-Allow-Origin"] = "https://glowing-disco-66j9q69p5xj3x66r-3001.app.github.dev/api/login"
    response.headers["Access-Control-Allow-Credentials"] = "true"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
    response.headers["Access-Control-Max-Age"] = "3600"


    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = User.query.filter_by(email=email).first()

    if user is None:
        return jsonify({"msg": "user doesn't exist"}), 404
    
    if email != user.email or password != user.password:
        return jsonify({"msg": "Bad username or password"}), 401
    
    if user.is_active is False:
        return jsonify({"msg":"User is not active"}),401
    
    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)


#ruta protegida
# Protect a route with jwt_required, which will kick out requests
# without a valid JWT present.
@api.route("/private", methods=["GET"])
@jwt_required()
def get_profile():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    user = User.query.filter_by(email=current_user).first()
    
    return jsonify(user.serialize()), 200

