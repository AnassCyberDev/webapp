from webapp.models.Choices.cities import Citeis
from webapp.models.Choices.elements import ElemntType
from webapp.models.Choices.post import PostType
from webapp.models.User import User
from webapp import Dbs
from datetime import datetime


class Post(Dbs.Model):
    id = Dbs.Column(Dbs.Integer, primary_key=True)
    title = Dbs.Column(Dbs.String(100), nullable=False)
    body = Dbs.Column(Dbs.Text, nullable=False)
    author_id = Dbs.Column(
        Dbs.Integer, Dbs.ForeignKey('user.id'), nullable=False)
    add_date = Dbs.Column(Dbs.DateTime, nullable=False,
                          default=datetime.utcnow)
    price = Dbs.Column(Dbs.String, nullable=False)
    images = Dbs.relationship('Image', backref='post',
                              lazy=True, cascade="all")
    city = Dbs.Column(Dbs.Enum(Citeis))
    post_type = Dbs.Column(Dbs.Enum(PostType))
    element_type = Dbs.Column(Dbs.Enum(ElemntType))
    age_bien = Dbs.Column(Dbs.String, nullable=False)
    chambres = Dbs.Column(Dbs.String, nullable=False)  # ajouté par moi_meme
    salons = Dbs.Column(Dbs.String, nullable=False)  # ajouté par moi_meme
    salle_bain = Dbs.Column(Dbs.String, nullable=False)  # ajouté par moi_meme
    surface = Dbs.Column(Dbs.String, nullable=False)  # ajouté par moi_meme
    etage = Dbs.Column(Dbs.String, nullable=False)  # ajouté par moi_meme
    n_etages = Dbs.Column(Dbs.String, nullable=False)  # ajouté par moi_meme
    s_soupante = Dbs.Column(Dbs.String, nullable=False)  # ajouté par moi_meme
    zoning = Dbs.Column(Dbs.String(100), nullable=False)  # ajouté par moi_meme
    is_valid = Dbs.Column(Dbs.Boolean,  default=False, nullable=False)

    def __repr__(self):
        return f"'{self.id}' '{self.title}' '{self.add_date}'"
