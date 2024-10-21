# client.py
import socketio

# Create a Socket.IO client
sio = socketio.Client()

# Event handler for successful connection
@sio.event
def connect():
    print('Connected to server',  sio.sid)


# Event handler for incoming messages
@sio.event
def message(data):
    print('Message from server:', data)

# Event handler for disconnection
@sio.event
def disconnect():
    print('Disconnected from server')

# Connect to the Express Socket.IO server
sio.connect('http://localhost:3000')

try:
    while True:
        # Read input from the user
        msg = input("Enter a message to send (or 'exit' to quit): ")
        if msg.lower() == 'exit':
            break
        # Emit the message to the server
        sio.send(msg)

except KeyboardInterrupt:
    print("Exiting...")

# Disconnect when done
sio.disconnect()
