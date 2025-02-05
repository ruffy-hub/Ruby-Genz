from flask import request, Flask, render_template, redirect, url_for
import logging

app = Flask(__name__)

app.logger.setLevel(logging.INFO)


# Dummy users for demonstration
users = {
    "user1": "password1",
    "user2": "password2"
}

@app.route('/')
def home():
    return render_template('loginpage.html')

@app.route('/login', methods=['POST'])
def login():
    username = request.form.get('username')
    password = request.form.get('password')

    # Simple authentication logic
    if username in users and users[username] == password:
        app.logger.info("jksdhfkjshfksjdhf")
        return redirect(url_for('welcome', username=username))
    else:
        return "Invalid credentials, please try again!"

@app.route('/welcome/<username>')
def welcome(username):
    return f"Welcome, {username}!"

if __name__ == '__main__':
    app.run(debug=True)
