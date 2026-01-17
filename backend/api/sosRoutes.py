from flask import Blueprint, jsonify
import state

sos_bp = Blueprint("sos", __name__)

@sos_bp.route("/sos", methods=["POST"])
def sos():
    state.emergency_state = True
    print("🚨 EMERGENCY MODE ACTIVATED")

    return jsonify({
        "status": "ok",
        "emergency": True
    })
