from flask import Flask
from flask_cors import CORS

# Blueprint imports
from api.statusRoutes import status_bp
from api.sosRoutes import sos_bp
from api.visionRoutes import vision_bp


def create_app():
    app = Flask(__name__)
    CORS(app)

    # Register blueprints
    app.register_blueprint(status_bp, url_prefix="/api")
    app.register_blueprint(sos_bp, url_prefix="/api")
    app.register_blueprint(vision_bp, url_prefix="/api/vision")

    return app


app = create_app()

if __name__ == "__main__":
    print("🚀 Backend server running...")
    app.run(host="0.0.0.0", port=5000, debug=True)
