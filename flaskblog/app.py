
from sqlalchemy import false
from webapp import app, api, Dbs
from flask import Flask, jsonify, request, session, send_from_directory, redirect
# from flask_cors import CORS  # CORS config
from werkzeug.security import check_password_hash, generate_password_hash
from webapp.models.User import User as u
from webapp.models.Post import Post as p
from webapp.models.Image import Image as I
from webapp.routes.Users.Users import Users
from webapp.routes.Users.User import User
from webapp.routes.Posts.Post import Post
from webapp.routes.Posts.Posts import Posts
from webapp.routes.images import Image
from webapp.utils.save_image import save_postimage
import json


# cors_config = {
#     "origins": ["https://something:3000"]
# }  # allow only backend url
# CORS(app, resources={
#     r"/*": cors_config
# })

api.add_resource(Post, '/post/<int:id>')
api.add_resource(Posts, '/posts')
api.add_resource(User, '/user/<int:id>')
api.add_resource(Users, '/users')
api.add_resource(Image, '/image/<int:id>')
# api.add_resource(authentication.Register,'/register')
# api.add_resource(PPicture,'/ppicture/<int:user_id>')


@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('./index.html')


@app.route('/')
def index():
    print('somthing')
    return app.send_static_file('./index.html')


@app.route('/login', methods=['POST'])
def login():
    print(request)  # remove all print commands
    email = request.json['email']
    pss = request.json['password']
    print(session)  # remove all print commands
    print(pss)  # remove all print commands
    user = u.query.filter_by(email=email).first()
    # print(user.password)
    if user:
        # the first one should be the hash
        if check_password_hash(user.password, pss):
            session['username'] = user.email

            print(session)  # remove all print commands
            response = jsonify(
                {'message': 'you logged in', 'id': user.id})
            response.status_code = 200

        else:
            response = jsonify({'message': 'bad_credentials'})
            response.status_code = 400
    else:
        response = jsonify({'message': 'user does not exist'})
        response.status_code = 400

    return response


@app.route('/checking')
def checking():
    print(request)  # remove all print commands
    if 'username' in session:
        email = session['username']
        user = u.query.filter_by(email=email).first()
        username = user.fname
        userId = user.id
        if user.is_admin:
            response = jsonify(
                {'resp': 'yes Admin', 'name': 'Admin', 'id': userId})
        else:
            response = jsonify({'resp': 'yes', 'name': username, 'id': userId})
    else:
        response = jsonify({'resp': 'no'})

    return response


@app.route('/api/user/<int:id>')
def annonce(id):
    user = u.query.filter_by(id=id).first()
    picture = user.ppicture
    picture = picture.replace('webapp', '')
    return jsonify({'owner': user.fname+' '+user.lname, 'email': user.email, 'phone': user.phone, "photo": picture})


@app.route('/toggleUser/<int:id>')
def toggle(id):
    if 'username' in session:
        email = session['username']
        user = u.query.filter_by(email=email).first()
        if user.is_admin:
            user1 = u.query.filter_by(id=id).first()
            if user1.is_admin:
                user1.is_admin = False
                response = jsonify({'message': 'user is now not admin'})
            else:
                user1.is_admin = True
                response = jsonify({'message': 'user is now admin'})

        else:
            response = jsonify({'message': 'Oops not auhtorized '})
            response.status_code = 400
    else:
        response = jsonify({'message': 'Oops not auhtorized'})
        response.status_code = 400
    Dbs.session.commit()
    return response


@app.route('/carts')
def cartes():
    if 'username' in session:
        email = session['username']
        user = u.query.filter_by(email=email).first()
        if user.is_admin:
            users = len(u.query.all())
            pending = len(p.query.filter_by(is_valid=False).all())
            posts = len(p.query.all())
            response = jsonify(
                {"users": users, "pending": pending, "posts": posts})
            response.status_code = 200
        else:
            response = jsonify({'message': 'Oops not auhtorized '})
            response.status_code = 400
    else:
        response = jsonify({'message': 'Oops not auhtorized'})
        response.status_code = 400
    Dbs.session.commit()
    return response


@app.route('/togglePost/<int:id>')
def toggleP(id):
    if 'username' in session:
        email = session['username']
        user = u.query.filter_by(email=email).first()
        if user.is_admin:
            post = p.query.filter_by(id=id).first()
            if post.is_valid:
                post.is_valid = False
                response = jsonify({'message': 'Annoce is not validated'})
            else:
                post.is_valid = True
                response = jsonify({'message': 'Annoce is validated'})
        else:
            response = jsonify({'message': 'Oops not auhtorized '})
            response.status_code = 400
    else:
        response = jsonify({'message': 'Oops not auhtorized'})
        response.status_code = 400
    Dbs.session.commit()
    return response


@app.route('/getImages/<int:id>')
def getImages(id):
    images = I.query.filter_by(post_id=id).all()
    dico = {}
    i = 1
    for image in images:
        dico[i] = {'path': (image.img).replace(
            'webapp', ''), 'image_id': image.id}
        i = i+1
    print(dico)
    return jsonify(dico)


@app.route('/logout')
def logout():
    print(request.json)
    if 'username' in session:
        session.pop('username', None)
    return jsonify({'message': 'you logged out successfully'})


@app.route('/info')
def info():
    maisons = len(p.query.filter_by(element_type="MaiVil").all())
    print(maisons)
    Appartement = len(p.query.filter_by(element_type="Appartement").all())
    TerraFerms = len(p.query.filter_by(element_type="TerraFerms").all())
    MagCom = len(p.query.filter_by(element_type="MagCom").all())
    BurPla = len(p.query.filter_by(element_type="BurPla").all())
    aVend = len(p.query.filter_by(post_type="aVend").all())
    aLouer = len(p.query.filter_by(post_type="aLouer").all())
    Rabat = len(p.query.filter_by(city="Rabat").all())
    Casablanca = len(p.query.filter_by(city="Casablanca").all())
    Fes = len(p.query.filter_by(city="Fes").all())
    Marrakech = len(p.query.filter_by(city="Marrakech").all())
    Agadir = len(p.query.filter_by(city="Agadir").all())

    # return jsonify({"test": "help"})

    return jsonify({"maisons": maisons, "Appartement": Appartement, "TerraFerms": TerraFerms, "MagCom": MagCom, "BurPla": BurPla, "aVend": aVend, "aLouer": aLouer, "Rabat": Rabat, "Fes": Fes, "Casablanca": Casablanca, "Marrakech": Marrakech, "Agadir": Agadir})


#############"send static files"

@app.route('/static/<path:path>')
def send_report(path):
    print('help')
    return send_from_directory('static', path)


if __name__ == '__main__':

    app.run(host='0.0.0.0', debug=True)
