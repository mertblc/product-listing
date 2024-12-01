import React from 'react';
import './index.css';
import ProductList from './components/ProductList';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function App() {
  return (
    <div className="App">
      <h1 style={{ fontFamily: 'Avenir-Book, sans-serif', fontSize: '45px', margin: '20px 0' }}>Product Listing</h1>
      <ProductList />
    </div>
  );
}

export default App;
