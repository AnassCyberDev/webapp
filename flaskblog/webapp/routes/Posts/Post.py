import os
import json
import shutil
from flask_restful import Resource, reqparse, abort, fields, marshal_with
from webapp import Dbs, app
from flask import session
from flask import jsonify, request
from webapp.models.Choices.cities import Citeis
from webapp.models.Choices.elements import ElemntType
from webapp.models.Choices.post import PostType
from webapp.models.User import User as u
from webapp.models.Post import Post as p
from webapp.models.Image import Image as I
from webapp.utils.save_image import save_postimage


class Post(Resource):
    def __init__(self) -> None:
        super().__init__()
    post_update_args = reqparse.RequestParser()
    post_update_args.add_argument('title', type=str)
    post_update_args.add_argument('body', type=str)
    post_update_args.add_argument('price', type=str)
    post_update_args.add_argument('author_id', type=int)
    post_update_args.add_argument('city', type=str)
    post_update_args.add_argument('post_type', type=str)
    post_update_args.add_argument('element_type', type=str)
    post_update_args.add_argument('age_bien', type=str)
    post_update_args.add_argument('chambres', type=str)
    post_update_args.add_argument('salons', type=str)
    post_update_args.add_argument('salle_bain', type=str)
    post_update_args.add_argument('surface', type=str)
    post_update_args.add_argument('etage', type=str)
    post_update_args.add_argument('n_etages', type=str)
    post_update_args.add_argument('s_soupante', type=str)
    post_update_args.add_argument('zoning', type=str)
    post_update_args.add_argument('is_valid', type=str)

    resource_fields = {
        'id': fields.Integer,
        'title': fields.String,
        'body': fields.String,
        'add_date': fields.DateTime,
        'price': fields.String,
        'author_id': fields.Integer,
        'image1': fields.List(fields.String),
        'image2': fields.List(fields.String),
        'image3': fields.List(fields.String),
        'image4': fields.List(fields.String),
        'images': fields.List(fields.String),
        'city': fields.String(attribute=lambda x: str(Citeis(x.city).value)),
        'post_type': fields.String(attribute=lambda x: str(PostType(x.post_type).value)),
        'element_type': fields.String(attribute=lambda x: str(ElemntType(x.element_type).value)),
        'age_bien': fields.String,  # changed for test
        'salons': fields.String,  # changed for test
        'chambres': fields.String,  # changed for test
        'salle_bain': fields.String,  # changed for test
        's_soupante': fields.String,
        'surface': fields.String,
        'etage': fields.String,  # changed for test
        'n_etages': fields.String,  # changed for test
        'chambres': fields.String,  # changed for test
        'zoning': fields.String,
        'is_valid': fields.Boolean
    }

    @marshal_with(resource_fields)
    def get(self, id):
        post = p.query.filter_by(id=id).first()
        if not post:
            abort(404, message=f"Il n'y a pas de post avec identifiant {id}")
        return post

    @marshal_with(resource_fields)
    def patch(self, id):
        print(session)  # for authentication purposes
        args = self.post_update_args.parse_args()
        post = p.query.filter_by(id=id).first()

        user = u.query.filter_by(id=post.author_id).first()

        print(user.id, post.author_id)
        if 'username' in session:
            if user.email == session['username'] and user.id == post.author_id:

                if not post:
                    abort(
                        404, message=f"Il n'y a pas de post avec identifiant {id}")
                if args['title']:
                    post.title = args['title']
                if args['body']:
                    post.body = args['body']
                if args['price']:
                    post.price = args['price']
                if args['author_id']:
                    post.author_id = user.id
                if args['city']:
                    info = open(
                        "webapp/routes/posts/trans/frTranslation.json", encoding='utf-8')
                    data = json.load(info)
                    print('this is your data', data)
                    if args['city'] in data.keys():
                        post.city = args['city']
                    else:
                        post.city = "unkown"
                if args['post_type']:
                    post.post_type = args['post_type']
                if args['element_type']:
                    post.element_type = args['element_type']
                if args['age_bien']:
                    post.age_bien = args['age_bien']
                if args['salons']:
                    post.salons = args['salons']
                if args['chambres']:
                    post.chambres = args['chambres']
                if args['salle_bain']:
                    post.salle_bain = args['salle_bain']
                if args['etage']:
                    post.etage = args['etage']
                if args['n_etages']:
                    post.n_etages = args['n_etages']
                if args['surface']:
                    post.surface = args['surface']
                if args['s_soupante']:
                    post.s_soupante = args['s_soupante']
                if args['zoning']:
                    post.zoning = args['zoning']
                if args['is_valid']:
                    if args['is_valid'] == 'true':
                        post.is_valid = True
                    elif args['is_valid'] == 'false':
                        post.is_valid = False
                images = []
                image1 = request.files.getlist("image1")
                if len(image1):
                    images.append(image1[0])
                image2 = request.files.getlist("image2")
                if len(image2):
                    images.append(image2[0])
                image3 = request.files.getlist("image3")
                if len(image3):
                    images.append(image3[0])
                image4 = request.files.getlist("image4")
                if len(image4):
                    images.append(image4[0])
                print(images)
                if len(images) > 0:
                    for image in images:
                        print(image)
                        img = I(img=save_postimage(image, user.email,
                                str(post.id)), post_id=post.id)
                        Dbs.session.add(img)
                Dbs.session.commit()
                return post

            else:
                abort(
                    400, message=f"unauthorised access to this item")

        else:
            abort(
                400, message=f"please log in")

    def delete(self, id):
        print(session)  # for authentication purposes
        post = p.query.filter_by(id=id).first()
        user = u.query.filter_by(id=post.author_id).first()

        print(user.id, post.author_id)
        if 'username' in session:
            user1 = u.query.filter_by(email=session['username']).first()
            if user.email == session['username'] and user.id == post.author_id:

                #post = p.query.filter_by(id=id).first()
                if not post:
                    abort(
                        404, message=f"Il n'y a pas de post avec identifiant {id}")
                    #user = u.query.filter_by(id=post.author_id).first()
                Dbs.session.delete(post)
                Dbs.session.commit()
                if os.path.exists(os.path.join(app.root_path, 'static', 'posts_images', user.email, str(post.id))):
                    shutil.rmtree(os.path.join(app.root_path, 'static',
                                               'posts_images', user.email, str(post.id)))
                    resp = jsonify({'message': 'post deleted successfuly'})
                    resp.status_code = 202
                    return resp
            elif user1.is_admin:

                if not post:
                    abort(
                        404, message=f"Il n'y a pas de post avec identifiant {id}")

                Dbs.session.delete(post)
                Dbs.session.commit()
                if os.path.exists(os.path.join(app.root_path, 'static', 'posts_images', user.email, str(post.id))):
                    shutil.rmtree(os.path.join(app.root_path, 'static',
                                               'posts_images', user.email, str(post.id)))
                    resp = jsonify({'message': 'post deleted successfuly'})
                    resp.status_code = 202
                    return resp

            else:
                abort(
                    400, message=f"unauthorised access to this item")

        else:
            abort(
                400, message=f"please log in")
