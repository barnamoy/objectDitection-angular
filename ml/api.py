# import the necessary packages
from flask import Flask, request, Response, jsonify
from flask_cors import CORS
# Initialize the Flask application
app = Flask(__name__)
CORS(app)
# route http posts to this method
@app.route('/api/detect', methods=['POST'])
def main():
    img = request.files["image"].read()
    return Response(response=img, status=200,mimetype="image/jpeg")

# start flask app
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
