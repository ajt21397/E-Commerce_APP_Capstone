import React, { useState, useEffect } from 'react';
import ProductList from './ProductList';

export default function Home({ cart }) { // Add `cart` as a prop
  // Remove the useEffect block entirely
  return (
    <div className="home">
      <h2 className="Htitle">Products</h2>
      <ProductList cart={cart} />
    </div>
  );
}
