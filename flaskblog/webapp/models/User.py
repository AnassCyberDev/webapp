from webapp import Dbs, app
from datetime import datetime
import os


class User(Dbs.Model):
    # __table__ = 'user'
    # __table_args__ = {'extend_existing': True}
    id = Dbs.Column(Dbs.Integer, primary_key=True)
    fname = Dbs.Column(Dbs.String(50))
    lname = Dbs.Column(Dbs.String(50))
    email = Dbs.Column(Dbs.String(100), nullable=False, unique=True)
    ppicture = Dbs.Column(Dbs.String(20), default=os.path.join(
        app.root_path, 'profiles_pictures', 'default.jpg'))
    password = Dbs.Column(Dbs.String(60), nullable=False)
    add_date = Dbs.Column(Dbs.DateTime, nullable=False,
                          default=datetime.utcnow)
    posts = Dbs.relationship('Post', backref='author',
                             lazy=True, cascade="all")
    phone = Dbs.Column(Dbs.String(16))  # ajouté par moi_meme
    is_admin = Dbs.Column(Dbs.Boolean,  default=False, nullable=False)

    def __repr__(self):
        propic = f"{self.ppicture.replace('webapp','')}"
        return f"User ('{self.fname}' '{self.lname}' :'{self.email}' : '{self.phone}' | '{propic}')"
