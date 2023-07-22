from flask import Flask, request, jsonify, send_file
import os

app = Flask(__name__)


@app.route("/get_image", methods=["GET"])
def get_image():
    data = request.get_json()

    image_filepath = os.path.join(os.getcwd(), "images", data[count])

    if os.path.exists(image_filepath):
        return "Image not found"

    return send_file(image_filepath, mimetype="image/jpg")


@app.route("/get_response", methods=["GET"])
def get_response():
    data = request.get_json()

    response_data = {
        "response": "Response from API"
    }

    return jsonify(response_data)


if __name__ == "__main__":
    app.run(debug=True)
