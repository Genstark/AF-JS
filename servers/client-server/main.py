import socketio
import time
import random

sio = socketio.Client()

@sio.event
def connect():
    print('Connected to server:', sio.sid)

@sio.event
def message(data):
    print('Message from server:', data)

@sio.event
def reply(data):
    print('reply from server:', data)

@sio.event
def disconnect():
    print('Disconnected from server')

def connect_to_server():
    sio.connect('http://localhost:3000')

check = 'y'

if __name__ == '__main__':
    try:
        connect_to_server()
        while True:
            object = {'message': random.randint(1000, 10000000)}
            
            time.sleep(2)
            
            if check == 'n':
                sio.emit('message', object)
                check = 'y'
            elif check == 'y':
                sio.emit('reply', {'message': random.randint(1000, 10000000)})
                check = 'n'
            else:
                pass
    except KeyboardInterrupt:
        print("Exiting...")
    finally:
        # Disconnect from the Express server when done
        sio.disconnect()
