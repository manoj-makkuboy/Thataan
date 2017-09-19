from flask import Flask, request
from flask_cors import CORS
import json

app= Flask(__name__)
CORS(app)

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        request_json = request.get_json()
        return json.dumps({'token' :request_json['username']})
