from flask_restful import Resource, reqparse, fields, marshal_with, abort
from werkzeug.security import generate_password_hash
from flask import request, session
from webapp import Dbs
from webapp.models.User import User as u
from webapp.utils.save_image import save_pp
from webapp.utils.switch import switch_bool


class Users(Resource):
    def __init__(self) -> None:
        super().__init__()
    user_add_args = reqparse.RequestParser()
    user_add_args.add_argument('fname', type=str, required=True)
    user_add_args.add_argument('lname', type=str, required=True)
    user_add_args.add_argument('email', type=str, required=True)
    user_add_args.add_argument('phone', type=str, required=True)
    user_add_args.add_argument('password', type=str, required=True)
    user_add_args.add_argument('is_admin', type=str)
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
    def get(self):
        if 'username' in session:
            email = session['username']
            user = u.query.filter_by(email=email).first()
            if user.is_admin:
                users = u.query.all()
                return users
        else:
            abort(
                400, message=f"unauthorised access to this page")

    def createPass(self):
        import random
        import string
        str = string.ascii_lowercase
        password = ''.join(random.choice(str)
                           for i in range(20))  # naming added to view password
        print(password)  # viewing password
        return password

    @marshal_with(resource_fields)
    def post(self):
        print(request.files)
        args = self.user_add_args.parse_args()
        if 'ppicture' in request.files:
            ppicture = request.files['ppicture']
        else:
            ppicture = None
        if 'phone' in args:
            phone = args['phone']
        else:
            phone = 'phone'
        self.pss = self.createPass()
        user = u(fname=args['fname'], lname=args['lname'], email=args['email'], phone=phone, password=generate_password_hash(
            args['password']), is_admin=switch_bool(args['is_admin']), ppicture=save_pp(ppicture, args['email']))  # user does  choose password
        Dbs.session.add(user)
        Dbs.session.commit()
        print(user)
        return user
