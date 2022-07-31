from webapp import Dbs, app
from datetime import datetime
import os


class Image(Dbs.Model):
    # __table_args__ = {'extend_existing': True}
    id = Dbs.Column(Dbs.Integer, primary_key=True)
    img = Dbs.Column(Dbs.String(20), default=os.path.join(
        app.root_path, 'posts_imags', 'static', 'default.jpg'), nullable=False)
    post_id = Dbs.Column(
        Dbs.Integer, Dbs.ForeignKey('post.id'), nullable=False)
    add_date = Dbs.Column(Dbs.DateTime, nullable=False,
                          default=datetime.utcnow)

    def __repr__(self):
        return f"{self.img.replace('webapp','')}"
