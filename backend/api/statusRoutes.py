from flask import Blueprint, jsonify
import state

status_bp = Blueprint("status", __name__)

@status_bp.route("/status", methods=["GET"])
def status():
    return jsonify({
        "occupancy": "NO",
        "crowd": "NORMAL",
        "accident": "NO",
        "brightness": "OFF",
        "emergency": state.emergency_state
    })
