from flask import Flask, request, session, g, redirect, url_for, abort, flash
from flask import send_from_directory

import datetime
from flask_cors import CORS
import os
import sqlite3
import json
import logging
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
from functools import wraps
from os import environ, path
from flask import Flask, render_template, send_from_directory

app = Flask(__name__, static_url_path='', static_folder="./static")
app.debug = True
app.config.from_object(__name__)

here = path.abspath(path.dirname(__name__))

# webpack = Webpack()
# app.config["WEBPACK_MANIFEST_PATH"] = path.join(here, "manifest.json")
# webpack.init_app(app)


app.config.update(dict(
    DATABASE=os.path.join(app.root_path, 'thantaan.db'),
    SECRET_KEY='DEV KEY'
    ))
app.config.from_envvar('THATAAN_SETTINGS', silent=True)

@app.route("/")
def index():
    return app.send_static_file("index.html")

@app.route('/dist/bundle.js')
def send_bundle():
    return app.send_static_file('dist/bundle.js')

def connect_db():
    """ connects to specific database """
    rv = sqlite3.connect(app.config['DATABASE'])
    rv.row_factory = sqlite3.Row
    return rv


def get_db():
    """ opens a new database connection if there is none
    yet for the current application context """
    if not hasattr(g, 'sqlite_db'):
        g.sqlite_db = connect_db()
    return g.sqlite_db


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        credentials_json = request.get_json(silent=True)
        username = credentials_json['username']
        password = credentials_json['password']
        if check_credentials(username, password):
            reponse_json = json.dumps({'token':
                                       encode_auth_token(username)
                                       .decode("utf-8")})
            return reponse_json
        return 'Invalid Credentials or Username doesn\' exits'
    return 'Valid Credentials'


def check_credentials(username, password):
    db = get_db()
    cur = db.execute('select password from user where username = ?', [username])
    cur_value = cur.fetchone()
    if cur_value:
        return check_password_hash(cur_value[0], password)
    return False


def encode_auth_token(username):
    try:
        payload = {
            'username': username,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1, seconds=5),
            'iat': datetime.datetime.utcnow()
        }
        return jwt.encode(payload, app.config.get('SECRET_KEY'),
                          algorithm='HS256')
    except Exception as e:
        return e


def decode_auth_token(auth_token):
    try:
        payload = jwt.decode(auth_token, app.config.get('SECRET_KEY'))
        return payload['username']
    except jwt.InvalidTokenError:
        return 'Invalid token'
    except jwt.ExpiredSignatureError:
        return 'Expired Signature'


@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        db = get_db()
        hashed_password = generate_password_hash(request.get_json()['password'])
        db.execute('insert into user values (NULL, ?, ?)',
                   [request.get_json()['username'], hashed_password])
        db.commit()

    return 'Signup successful'


def login_required(execute_after_verification):
    @wraps(execute_after_verification)
    def wrap(*args, **kwargs):
        token = request.headers['Authorization']
        if 'Invalid token' != decode_auth_token(token[4:]):
            return execute_after_verification(*args, **kwargs)
        else:
            return 'please login'
    return wrap


@app.route('/history')
@login_required
def get_history():
    return 'inside history'  # slicing prefix to token


@app.route('/practise_data/<level_number>/')
def get_practise_data(level_number):
    practise_data_dir = './practise_data/level_%s.txt' % level_number
    with open(practise_data_dir, 'r') as practise_data_file:
        practise_data = ''
        for line in practise_data_file:
            practise_data += line
    return json.dumps(practise_data)


if __name__ == "__main__":
    app.run(threaded=True)
