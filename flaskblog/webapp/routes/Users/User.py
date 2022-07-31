from flask_restful import Resource, reqparse, abort, fields, marshal_with
from werkzeug.security import generate_password_hash
from flask import Flask, jsonify, request, session
from webapp import Dbs, app
from webapp.models.User import User as u
import os
import shutil
from webapp.utils.save_image import save_pp

from webapp.utils.switch import switch_bool


class User(Resource):
    def __init__(self) -> None:
        super().__init__()
    user_update_args = reqparse.RequestParser()
    user_update_args.add_argument('id', type=int)
    user_update_args.add_argument('fname', type=str)
    user_update_args.add_argument('lname', type=str)
    user_update_args.add_argument('email', type=str)
    user_update_args.add_argument('phone', type=str)
    user_update_args.add_argument('password', type=str)
    user_update_args.add_argument('ppicture', type=str)
    user_update_args.add_argument('is_admin', type=str)
    resource_fields = {
        'id': fields.Integer,
        'fname': fields.String,
        'lname': fields.String,
        'email': fields.String,
        'phone': fields.String,
        'password': fields.String,
        'ppicture': fields.String,
        'add_date': fields.DateTime,
        'posts': fields.List(fields.String),
        'is_admin': fields.Boolean
    }

    @marshal_with(resource_fields)
    def get(self, id):
        print(session)  # for authentication purposes
        user = u.query.filter_by(id=id).first()
        if 'username' in session:
            if user.email == session['username']:
                print(user)
                return user
            else:
                abort(
                    400, message=f"unauthorised access to this page")

        else:
            abort(
                400, message=f"please log in")

    @marshal_with(resource_fields)
    def patch(self, id):
        args = self.user_update_args.parse_args()
        user = u.query.filter_by(id=id).first()
        print(user)  # to remove all print commands
        if 'username' in session:
            print(session['username'])  # to remove all print commands
            print(user.email)  # to remove all print commands
            if user.email == session['username']:
                if args['fname']:
                    print('print fname in request')
                    user.fname = args['fname']
                if args['lname']:
                    print('print lname in request')
                    user.lname = args['lname']
                if args['email']:
                    print('print email in request')
                    user.email = args['email']
                if args['phone']:
                    print('print phone in request')
                    user.phone = args['phone']
                if args['is_admin']:
                    print('print isadmin in request')
                    user.is_admin = switch_bool(args['is_admin'])
                if args['password']:
                    print('print password in request')
                    user.password = generate_password_hash(args['password'])
                if 'ppicture' in request.files:
                    ppicture = request.files['ppicture']
                    user.ppicture = save_pp(ppicture, user.email)
                Dbs.session.commit()

            else:
                abort(
                    400, message=f"unauthorised access to this page")

        else:
            abort(
                400, message=f"please log in")

        return user

    def delete(self, id):
        user = u.query.filter_by(id=id).first()
        if not user:
            abort(
                404, message=f"Il n'y a pas d'utilisateur avec identifiant {id}")
        email = user.email
        Dbs.session.delete(user)
        Dbs.session.commit()
        if os.path.exists(os.path.join(app.root_path, 'static', 'profiles_pictures', email)):
            shutil.rmtree(os.path.join(app.root_path, 'static',
                          'profiles_pictures', email))
        if os.path.exists(os.path.join(app.root_path, 'static', 'posts_images', email)):
            shutil.rmtree(os.path.join(
                app.root_path, 'static', 'posts_images', email))
        resp = jsonify({'message': 'User deleted successfuly'})
        resp.status_code = 202
        return resp
