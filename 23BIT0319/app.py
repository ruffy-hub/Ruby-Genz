from flask import Flask, request, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from models import Score, Event, UserQuery
import openai
import os

app = Flask(__name__)
CORS(app)  # Allow frontend to communicate with backend

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///events   .db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)


# OpenAI API Key (Set as an environment variable for security)
openai.api_key = os.getenv("OPENAI_API_KEY")

# Create tables if they don’t exist
with app.app_context():
    db.create_all()

# Routes
@app.route('/')
def index():
    return render_template('index.html')  # Load the frontend page
@app.route('/scores', methods=['GET'])
def get_scores():
    scores = Score.query.order_by(Score.date.desc()).all()
    return jsonify([{'event_id': s.event_id, 'score': s.score, 'date': s.date} for s in scores])
@app.route('/register', methods=['POST'])
def register_event():
    data = request.json
    new_event = Event(
        name=data['name'],
        date=data['date'],
        location=data['location'],
        participants=data['participants'],
        rules=data['rules']
    )
    db.session.add(new_event)
    db.session.commit()
    return jsonify({'message': 'Event registered successfully!'})
@app.route('/update_score', methods=['POST'])
def update_score():
    data = request.json
    new_score = Score(
        event_id=data['event_id'],
        score=data['score'],
        date=data['date']
    )
    db.session.add(new_score)
    db.session.commit()
    return jsonify({'message': 'Score updated successfully!'})
@app.route('/event/<int:event_id>', methods=['GET'])
def get_event(event_id):
    event = Event.query.get(event_id)
    if event:
        return jsonify({
            'name': event.name,
            'date': event.date,
            'location': event.location,
            'participants': event.participants,
            'rules': event.rules
        })
    return jsonify({'message': 'Event not found!'}), 404
@app.route('/ask', methods=['POST'])
def ask_ai():
    user_query = request.json['query']
    
    # Fetch relevant data from the database
    events = Event.query.all()
    scores = Score.query.all()
    
    # Prepare context for AI
    context = f"Events: {[e.name for e in events]}. Scores: {[s.score for s in scores]}."
    prompt = f"{context}\n\nUser Query: {user_query}\nAI Response:"

    # Call OpenAI API
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=prompt,
        max_tokens=100
    )
    
    # Save query and response
    new_query = UserQuery(query=user_query, response=response.choices[0].text.strip())
    db.session.add(new_query)
    db.session.commit()
    
    return jsonify({'response': response.choices[0].text.strip()})

if __name__ == "__main__":
    app.run(debug=True)
