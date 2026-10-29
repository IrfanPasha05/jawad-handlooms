import json
import os
from pathlib import Path
from flask import Flask, jsonify, request
from flask_cors import CORS

BASE_DIR = Path(__file__).resolve().parent
app = Flask(__name__)

# Set CORS_ORIGINS in production to trusted frontend origins, comma-separated.
origins = [item.strip() for item in os.getenv("CORS_ORIGINS", "*").split(",") if item.strip()]
CORS(app, resources={r"/api/*": {"origins": origins}})


def load_products():
    with (BASE_DIR / "products.json").open(encoding="utf-8") as file:
        return json.load(file)


@app.get("/")
def index():
    return jsonify({
        "service": "Jawad Handlooms API",
        "status": "ok",
        "docs": ["/api/health", "/api/products", "/api/categories"]
    })


@app.get("/api/health")
def health():
    return jsonify({"status": "healthy"}), 200


@app.get("/api/products")
def products():
    items = load_products()
    category = request.args.get("category", "").strip().lower()
    query = request.args.get("q", "").strip().lower()
    if category and category != "all":
        items = [item for item in items if item["category"].lower() == category]
    if query:
        items = [
            item for item in items
            if query in item["name"].lower()
            or query in item["category"].lower()
            or query in item["description"].lower()
        ]
    return jsonify({"count": len(items), "products": items})


@app.get("/api/categories")
def categories():
    return jsonify(sorted({item["category"] for item in load_products()}))


@app.errorhandler(404)
def not_found(_error):
    return jsonify({"error": "Not found"}), 404


@app.errorhandler(500)
def server_error(_error):
    app.logger.exception("Unexpected server error")
    return jsonify({"error": "Internal server error"}), 500


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=int(os.getenv("PORT", "5000")), debug=False)
