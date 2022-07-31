from urllib import response
from flask_restful import Resource, reqparse, abort, fields, marshal_with
from passlib.hash import bcrypt
from flask import jsonify, request
from webapp import Dbs, app
from webapp.models.Image import Image as I
from webapp.models.Post import Post as P
from webapp.models.User import User as U
import os
import shutil

from webapp.utils.save_image import save_postimage


class Image(Resource):
    def __init__(self) -> None:
        super().__init__()
    image_update_args = reqparse.RequestParser()
    image_update_args.add_argument('id', type=int)
    image_update_args.add_argument('post_id', type=int)
    image_update_args.add_argument('img', type=str)

    resource_fields = {
        'id': fields.Integer,
        'img': fields.String,
        'post_id': fields.String,
        'add_date': fields.DateTime,
    }

    @marshal_with(resource_fields)
    def get(self, id):
        image = I.query.filter_by(id=id).first()
        if not image:
            abort(404, message=f"Il n'y a pas d'image avec identifiant {id}")
        return image

    @marshal_with(resource_fields)
    def patch(self, id):

        image = I.query.filter_by(id=id).first()
        print(image)
        post = P.query.filter_by(id=image.post_id).first()
        user = U.query.filter_by(id=post.author_id).first()
        if not image:
            abort(404, message=f"Il n'y a pas d'image avec identifiant {id}")
        print(request.files)
        if 'image' in request.files:
            img = request.files['image']
            prev_name = image.img
            image.img = save_postimage(img, user.email, str(post.id))
            print(image.img)  # to remove
            Dbs.session.commit()
            os.remove(prev_name)
            response = jsonify(
                {"message": "image updated successfully"})
        return response  # image

    def delete(self, id):
        image = I.query.filter_by(id=id).first()
        if not image:
            abort(404, message=f"Il n'y a pas d'image avec identifiant {id}")
        post = P.query.filter_by(id=image.post_id).first()
        user = U.query.filter_by(id=post.author_id).first()
        Dbs.session.delete(image)
        Dbs.session.commit()
        if os.path.exists(image.img):
            print("this is it ###############################", image.img)
            if image.img == "webapp/static/posts_images/default.jpg":
                pass
            else:
                os.remove(image.img)
        resp = jsonify({'message': 'image deleted successfuly'})
        resp.status_code = 202
        return resp
