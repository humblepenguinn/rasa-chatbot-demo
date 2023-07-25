from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import os
import json

import requests

app = Flask(__name__)
CORS(app)

global count

@app.route("/get_image_url", methods=["GET", "POST"])
def get_image():
    data = request.get_json()

    count = data["count"]

    with open("images.json", "r") as file:
        images = json.load(file)

    image_url = images[f"{count}"]

    return jsonify({"url": image_url})

@app.route("/get_response", methods=["GET", "POST"])
def get_response():
    recieved_data = request.get_json()

    user_input = recieved_data["user_input"]

    data = {
    'sender': 'user',
    'message': user_input
    }

    responses = requests.post("http://localhost:5005/webhooks/rest/webhook", json=data)

    print(f"{responses.text}")

    response_data = {
        "response": responses.json()[0]["text"]
    }

    return jsonify(response_data)


if __name__ == "__main__":
    app.run(debug=True)
