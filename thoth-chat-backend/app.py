from flask import Flask, jsonify, json,render_template
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager
from flask_cors import CORS
from flask_socketio import SocketIO

# SQLite supports FOREIGN KEY syntax when emitting CREATE statements for tables, however by default these constraints have no effect on the operation of the table.
# These imports are solution to the problem
from sqlalchemy.engine import Engine
from sqlalchemy import event


# SQLite supports FOREIGN KEY syntax when emitting CREATE statements for tables, however by default these constraints have no effect on the operation of the table.
# These lines are solution to that problem
@event.listens_for(Engine, "connect")
def set_sqlite_pragma(dbapi_connection, connection_record):
    cursor = dbapi_connection.cursor()
    cursor.execute("PRAGMA foreign_keys=ON")
    cursor.close()


app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///login_db.sqlite3'
app.config['SECRET_KEY']='This is Secret'
#instantiating db variable
login_manager=LoginManager()
login_manager.init_app(app)
db = SQLAlchemy(app)
migrate = Migrate(app, db, compare_type=True)
socketio = SocketIO(app, cors_allowed_origins="*")



@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

from user_authorization import *




