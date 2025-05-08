import sys
import json

def my_function(name):
    return f"Hello, {name}!"

if __name__ == "__main__":
    # Get the input from Node.js
    input_data = json.loads(sys.stdin.read())
    name = input_data.get("name", "World")
    
    # Call the function and print the result
    result = my_function(name)
    print(json.dumps({"message": result}))
