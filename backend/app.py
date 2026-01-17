from flask import Flask, jsonify
from utils.config import APP_NAME
from api.visionRoutes import vision_api

app = Flask(__name__)
app.register_blueprint(vision_api)

@app.route("/")
def home():
    return jsonify({
        "app": APP_NAME,
        "status": "Backend running successfully"
    })

@app.route("/health")
def health():
    return jsonify({"status": "OK"})

if __name__ == "__main__":
    print("🚀 Starting backend server...")
    app.run(host="0.0.0.0", port=5000, debug=True)
