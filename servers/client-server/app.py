from flask import Flask
import socketio
import time
import random
from threading import Thread

# Create a Socket.IO client to connect to the Express server
sio = socketio.Client()

# Create a Flask application (no Flask-SocketIO server)
app = Flask(__name__)

# Track state for sending alternating messages
check = 'y'

# Socket.IO client events (connecting to Express server)
@sio.event
def connect():
    print('Connected to Express server:', sio.sid)

@sio.event
def message(data):
    print('Message from server:', data)

@sio.event
def reply(data):
    print('Reply from server:', data)

@sio.event
def disconnect():
    print('Disconnected from Express server')

# Flask route to trigger connection start
@app.route('/')
def start_communication():
    if not sio.connected:  # Ensure only one connection is made
        Thread(target=connect_to_server).start()
        return "Started communication with Express server!", 200
    else:
        return "Already connected to the server", 200

def connect_to_server():
    if not sio.connected:  # Make sure to check connection status
        sio.connect('http://localhost:3000')  # Connect to the Express server
        run_client()  # Start sending and receiving messages

def run_client():
    global check
    while sio.connected:  # Only send messages if the client is connected
        # Send random object to the Express server
        object_to_send = {'message': random.randint(1000, 10000000)}
        time.sleep(2)

        if check == 'n':
            sio.emit('message', object_to_send)
            check = 'y'
        elif check == 'y':
            sio.emit('reply', {'message': random.randint(1000, 10000000)})
            check = 'n'
        else:
            pass

if __name__ == '__main__':
    # Flask runs on localhost:5000
    app.run(host='localhost', port=5000, debug=True)

    # Disconnect gracefully when Flask stops
    sio.disconnect()
