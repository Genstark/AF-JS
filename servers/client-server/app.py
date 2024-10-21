# app.py
from flask import Flask, render_template
from flask_socketio import SocketIO, emit

app = Flask(__name__)
socketio = SocketIO(app)

@app.route('/')
def index():
    return render_template('index.html')

@socketio.on('message')
def handle_message(msg):
    print('Received message: ' + msg)
    # Echo the message back to all clients
    emit('message', msg, broadcast=True)

if __name__ == '__main__':
    # Allow unsafe Werkzeug for development purposes
    socketio.run(app, debug=True, allow_unsafe_werkzeug=True)
