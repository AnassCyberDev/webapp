import os
from webapp import app
from datetime import datetime
import secrets
from werkzeug.utils import secure_filename


def save_pp(ppicture, email):
    if ppicture:
        # path_pic = os.path.join(app.root_path, 'static',
        #                         'profiles_pictures', email)
        path_pic = f"webapp/static/profiles_pictures/{email}/"
        filename = secure_filename(ppicture.filename)
        print(email, filename)
        if not os.path.exists(path_pic):
            os.mkdir(path_pic)
        now = str(datetime.utcnow()).replace(' ', '_').replace(
            '-', '').replace(':', '').replace('.', '_')
        _, extention = os.path.splitext(filename)
        pp_fn = now + extention
        # pp_root = os.path.join(path_pic, pp_fn)
        pp_root = path_pic+pp_fn
        print(pp_root)
        ppicture.save(pp_root)
        return pp_root
    else:
        # return os.path.join(app.root_path, 'static', 'profiles_pictures', 'default.jpg')
        return "/static/profiles_pictures/default.jpg"


def save_postimage(image, email, postid):
    if image:
        # path_pic = os.path.join('webapp', 'static',
        #                         'posts_images', email, postid)
        path_pic = f"webapp/static/posts_images/{email}/{postid}/"
        filename = secure_filename(image.filename)
        if not os.path.exists(path_pic):
            os.makedirs(path_pic)
        random_hex = secrets.token_hex(100)
        _, extention = os.path.splitext(filename)
        pp_fn = random_hex + extention
        # pp_root = os.path.join(path_pic, filename)
        pp_root = path_pic+filename
        print(pp_root, ('E'))
        image.save(pp_root)
        return pp_root
    else:
        # app.root_path,
        # return os.path.join('webapp', 'static', 'posts_images', 'default.jpg')
        return "webapp/static/posts_images/default.jpg"
