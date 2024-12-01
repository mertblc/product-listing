import React, { useState } from 'react';

// Mapping colors to their proper names and hex values
const colorDetails = {
  yellow: { name: 'Yellow Gold', hex: '#E6CA97' },
  white: { name: 'White Gold', hex: '#D9D9D9' },
  rose: { name: 'Rose Gold', hex: '#E1A4A9' },
};

const ProductCard = ({ product }) => {
  const [selectedColor, setSelectedColor] = useState('yellow'); // Default color is yellow

  const handleColorChange = (color) => {
    setSelectedColor(color); // Update selected color state
  };

  // Generate star rating based on popularity score
  const renderStars = () => {
    const stars = [];
    const scoreOutOf5 = (product.popularityScore / 100) * 5; // Convert score to 0-5 scale
    const roundedScore = Math.round(scoreOutOf5 * 2) / 2; // Round to the nearest 0.5 for half-stars

    for (let i = 0; i < 5; i++) {
      stars.push(
        <span
          key={i}
          style={{
            color: i < Math.floor(roundedScore) ? '#E6CA97' : '#d3d3d3', // Filled stars
            fontSize: '20px',
          }}
        >
          ★
        </span>
      );
    }

    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
        {stars}
        <span style={{ fontSize: '12px', color: '#333', fontFamily: 'Avenir-Book, sans-serif' }}>
          {roundedScore.toFixed(1)}/5
        </span>
      </div>
    );
  };

  return (
    <div className="product-card">
      {/* Display the image based on the selected color */}
      <img
        src={product.images[selectedColor]}
        alt={`${product.name} in ${colorDetails[selectedColor].name}`}
        style={{ width: '100%', height: '150px', objectFit: 'contain', marginBottom: '10px' }}
      />

      {/* Product details */}
      <h2>{product.name}</h2>
      <p>${product.price} USD</p>

      {/* Star rating */}
      <div className="stars">{renderStars()}</div>

      {/* Color picker buttons */}
      <div className="color-picker">
        {Object.keys(colorDetails).map((color) => (
          <button
            key={color}
            onClick={() => handleColorChange(color)}
            style={{
              backgroundColor: colorDetails[color].hex,
              border: selectedColor === color ? '2px solid black' : '1px solid gray',
              borderRadius: '50%',
              width: '30px',
              height: '30px',
              margin: '5px',
            }}
          ></button>
        ))}
      </div>

      {/* Display selected color name */}
      <p name="colorName" style={{ marginTop: '10px', fontWeight: 'bold' }}>
        {colorDetails[selectedColor].name}
      </p>
    </div>
  );
};

export default ProductCard;
