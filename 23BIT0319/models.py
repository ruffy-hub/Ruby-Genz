from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()  # Initialize SQLAlchemy instance

class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    date = db.Column(db.String(50), nullable=False)
    location = db.Column(db.String(100), nullable=False)
    participants = db.Column(db.String(500))  # JSON or comma-separated
    rules = db.Column(db.String(1000))

class Score(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    event_id = db.Column(db.Integer, db.ForeignKey('event.id'), nullable=False)  # Corrected this line
    score = db.Column(db.Integer, nullable=False)
    date = db.Column(db.String(50), nullable=False)

class UserQuery(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    query = db.Column(db.String(500), nullable=False)
    response = db.Column(db.String(1000))
    timestamp = db.Column(db.String(50))  # Removed "check"
