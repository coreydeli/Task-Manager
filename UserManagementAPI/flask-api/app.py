# Main Application File
## Creates a user signup endpoint to create new users

from flask import Flask, request, jsonify
app = Flask(__name__)
users = {}

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    username = data['username']
    password = data['password']
    if username in users:
        return jsonify({'message': 'User already exists'}), 400
    users[username] = password
    return jsonify ({'message': 'User created successfully'}), 

## Creates a login endpoint to connect through
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data['username']
    password = data['password']
    if users.get(username) == password:
        return jsonify({'token': 'demo-token'}), 200
    return jsonify({'message': 'Invalid credentials'}), 400

if __name__ == '__main__':
    app.run(debug=True)