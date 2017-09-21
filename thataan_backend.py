from flask import Flask, request, session, g, redirect, url_for, abort, flash
from flask_cors import CORS
import os
import sqlite3
import json
import logging
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.config.from_object(__name__)
CORS(app)

app.config.update(dict(
    DATABASE=os.path.join(app.root_path, 'thantaan.db'),
    SECRET_KEY='DEV KEY'
    ))
app.config.from_envvar('THATAAN_SETTINGS', silent=True)


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
        if check_credentials(credentials_json['username'],
                             credentials_json['password']):
            reponse_json = json.dumps({'token': 'username'})
            return reponse_json
        return 'Invalid Credentials or Username doesn\' exits'
    return 'Valid Credentials'

def check_credentials(username, password):
    db = get_db()
    cur = db.execute('select password from user where  = ?', [username])
    return check_password_hash(cur.fetchone()[0], password)

@app.route('/signup', methods = ['GET', 'POST'])
def signup():
    if request.method == 'POST':
        db = get_db()
        hashed_password = generate_password_hash(request.get_json()['password'])
        db.execute('insert into user values (NULL, ?, ?)',
                   [request.get_json()['username'], hashed_password])
        db.commit()

    return 'Signup successful'
