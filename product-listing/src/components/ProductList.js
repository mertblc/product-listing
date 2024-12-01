import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import axios from 'axios';
import ProductCard from './ProductCard';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const Arrow = ({ className, style, onClick, direction }) => {
    return (
      <div
        className={className}
        style={{
          ...style,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: '#000', // Black background for the circle
          color: '#00ff04', // Yellow arrow color for contrast
          borderRadius: '100%', // Circle shape
          width: '20px', // Arrow button width
          height: '20px', // Arrow button height
          zIndex: 2, // Ensure it appears above the slider
          cursor: 'pointer',
          position: 'absolute',
          top: '52%',
          transform: 'translateY(-50%)',
          ...(direction === 'left' ? { left: '-30px' } : { right: '-30px' }), // Adjust position
        }}
        onClick={onClick}
      >
        {direction === 'left' ? '<' : '>'} {/* Render arrow direction */}
      </div>
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <Arrow direction="right" />,
    prevArrow: <Arrow direction="left" />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="product-list" style={{ font: 'Avenir, sans-serif'}}>
      <Slider {...settings}>
        {products.map((product) => (
          <div key={product.name}>
            <ProductCard product={product} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductList;
