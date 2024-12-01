import requests

# Test all products
response = requests.get('http://localhost:5000/products')
print("All Products:", response.json())

# Test filtered products
response = requests.get('http://localhost:5000/products/filter', params={
    'min_price': 100,
    'max_price': 500
})
print("Filtered Products:", response.json())