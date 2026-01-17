from flask import Blueprint, jsonify

vision_bp = Blueprint("vision", __name__)

@vision_bp.route("/health", methods=["GET"])
def vision_health():
    return jsonify({"vision": "ok"})
