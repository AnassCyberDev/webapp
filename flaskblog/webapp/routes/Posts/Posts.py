from flask_restful import Resource, reqparse, abort, fields, marshal_with
from webapp import Dbs
import json
from webapp.models.Choices.cities import Citeis
from webapp.models.Choices.elements import ElemntType
from webapp.models.Choices.post import PostType
from webapp.models.Image import Image as I
from webapp.models.User import User as u
from webapp.models.Post import Post as p
from flask import request, session
from webapp.utils.save_image import save_postimage
from webapp.utils.switch import switch_bool


class Posts (Resource):
    def __init__(self) -> None:
        super().__init__()
    post_add_args = reqparse.RequestParser()
    post_add_args.add_argument('title', type=str, required=True)
    post_add_args.add_argument('body', type=str, required=True)
    post_add_args.add_argument('price', type=str)  # , required=True)
    post_add_args.add_argument('author_id', type=int)  # , required=True)
    post_add_args.add_argument('city', type=str)  # , required=True)
    post_add_args.add_argument('post_type', type=str)  # , required=True)
    post_add_args.add_argument('element_type', type=str)  # , required=True)
    post_add_args.add_argument('age_bien', type=str)  # , required=True)
    post_add_args.add_argument('chambres', type=str)  # , required=True)
    post_add_args.add_argument('salons', type=str)  # , required=True)
    post_add_args.add_argument('salle_bain', type=str)  # , required=True)
    post_add_args.add_argument('surface', type=str)  # , required=True)
    post_add_args.add_argument('etage', type=str)  # , required=True)
    post_add_args.add_argument('n_etages', type=str)  # , required=True)
    post_add_args.add_argument('s_soupante', type=str)  # , required=True)
    post_add_args.add_argument('zoning', type=str)  # , required=True)
    post_add_args.add_argument('is_valid', type=str)  # , required=True)

    resource_fields = {
        'id': fields.Integer,
        'title': fields.String,
        'body': fields.String,
        'add_date': fields.DateTime,
        'price': fields.String,
        'author_id': fields.Integer,
        'images': fields.List(fields.String),
        'image1': fields.List(fields.String),
        'image2': fields.List(fields.String),
        'image3': fields.List(fields.String),
        'image4': fields.List(fields.String),
        "image5": fields.List(fields.String),
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
    def get(self):
        if 'username' in session:
            email = session['username']
            user = u.query.filter_by(email=email).first()
            if user.is_admin:
                posts = p.query.all()
            else:
                posts1 = p.query.filter_by(is_valid=True).all()
                posts = p.query.filter_by(author_id=user.id).all()
                if len(posts1) > 0:
                    for post in posts1:
                        posts.append(post)
        else:
            posts = p.query.filter_by(is_valid=True).all()
        return posts

    @marshal_with(resource_fields)
    def post(self):
        if 'username' in session:
            email = session['username']
            # print(email)
            user = u.query.filter_by(email=email).first()
            # print(user)
            args = self.post_add_args.parse_args()
            info = open(
                "webapp/routes/posts/trans/frTranslation.json", encoding='utf-8')
            data = json.load(info)
            print('this is your data', data)
            if args['city'] in data.keys():
                city = args['city']
            else:
                city = "unkown"
            if args['post_type']:
                post_type = args['post_type']
            else:
                post_type = "undefined"
            if args['element_type']:
                element_type = args['element_type']
            else:
                element_type = "undefined"
            # print(args)
            #user = u.query.filter_by(id=args['author_id']).first()
            # print(user)
            # if not user:
            #    abort(
            #       404, message=f"Il n'y a pas d'utilisateur avec identifiant {args['author_id']}")
            post = p(title=args['title'], body=args['body'], price=args['price'], author_id=user.id, city=city,
                     post_type=post_type, element_type=element_type, surface=args['surface'], zoning=args['zoning'], is_valid=switch_bool(args['is_valid']))

            if args['salons']:
                post.salons = args['salons']
            else:
                post.salons = ""
            if args['chambres']:
                post.chambres = args['chambres']
            else:
                post.chambres = ""
            if args['salle_bain']:
                post.salle_bain = args['salle_bain']
            else:
                post.salle_bain = ""
            if args['etage']:
                post.etage = args['etage']
            else:
                post.etage = ""
            if args['age_bien']:
                post.age_bien = args['age_bien']
            else:
                post.age_bien = ""
            if args['n_etages']:
                post.n_etages = args['n_etages']
            else:
                post.n_etages = ""
            if args['s_soupante']:
                post.s_soupante = args['s_soupante']
            else:
                post.s_soupante = ""

            # post = p(title=args['title'], body=args['body'], price=args['price'], author_id=user.id, city=args['city'], age_bien=args['age_bien'], salons=args['salons'], chambres=args['chambres'],
            #          post_type=args['post_type'], element_type=args['element_type'], salle_bain=args['salle_bain'], surface=args['surface'], s_soupante=args['s_soupante'], etage=args['etage'], n_etages=args['n_etages'], zoning=args['zoning'], is_valid=switch_bool(args['is_valid']))
            print('done')
            Dbs.session.add(post)
            print('done1')
            Dbs.session.commit()
            print('done2')
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
            image5 = request.files.getlist("image5")
            if len(image5):
                images.append(image5[0])
            if len(images) > 0:
                for image in images:
                    print(image)
                    img = I(img=save_postimage(image, user.email,
                            str(post.id)), post_id=post.id)
                    Dbs.session.add(img)
                    Dbs.session.commit()
            else:
                img = I(img=save_postimage(None, user.email,
                        str(post.id)), post_id=post.id)
                Dbs.session.add(img)
                Dbs.session.commit()
            print(post.id)
            return post  # .id  # changed from post to post.id

        else:
            abort(
                400, message=f"please log in")
