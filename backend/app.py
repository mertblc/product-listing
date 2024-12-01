from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
import json
import requests
import os

app = Flask(__name__, static_folder='../frontend/build', static_url_path='')
CORS(app)

# Load product data from the JSON file
# Get the absolute path to the current directory
current_dir = os.path.dirname(os.path.abspath(__file__))

# Load product data from the JSON file
with open(os.path.join(current_dir, 'products.json'), 'r') as file:
    products = json.load(file)

# Function to fetch current gold price
def get_gold_price():
    try:
        response = requests.get('https://api.metals-api.com/v1/latest', params={
            'access_key': 'YOUR_API_KEY',  # Replace with your actual API key
            'base': 'USD',
            'symbols': 'XAU'  # Gold price
        })
        data = response.json()
        return data['rates']['XAU']
    except Exception as e:
        print(f"Error fetching gold price: {e}")
        return 85.0  # Default price per gram if API fails


# API Endpoint: Get all products with calculated prices
@app.route('/products', methods=['GET'])
def get_products():
    gold_price = get_gold_price()
    for product in products:
        product['price'] = round((product['popularityScore'] + 1) * product['weight'] * gold_price, 2)
    return jsonify(products)


# API Endpoint: Filter products
@app.route('/products/filter', methods=['GET'])
def filter_products():
    min_price = float(request.args.get('min_price', 0))
    max_price = float(request.args.get('max_price', float('inf')))
    filtered = [
        product for product in products
        if min_price <= product['price'] <= max_price
    ]
    return jsonify(filtered)


# Serve React Frontend
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_frontend(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')


# Run the server
if __name__ == '__main__':
    app.run(debug=True)
