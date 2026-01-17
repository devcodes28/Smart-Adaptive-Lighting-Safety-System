from flask import Blueprint, jsonify

vision_api = Blueprint("vision_api", __name__)

@vision_api.route("/api/status", methods=["GET"])
def system_status():
    return jsonify({
        "system": "Smart Community Night Safety System",
        "backend": "running",
        "mode": "development"
    })

@vision_api.route("/api/crowd", methods=["GET"])
def crowd_status():
    return jsonify({
        "people_count": 0,
        "crowd_level": "SAFE"
    })

@vision_api.route("/api/accident", methods=["GET"])
def accident_status():
    return jsonify({
        "accident_detected": False
    })

@vision_api.route("/api/alert", methods=["GET"])
def alert_status():
    return jsonify({
        "alert": False,
        "type": None
    })
