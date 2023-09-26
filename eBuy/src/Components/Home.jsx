import React, { useState, useEffect } from 'react';
import ProductList from './ProductList';

export default function Home({ cart, setCart }) {
  return (
    <div>
      <h2 className="Htitle">Products</h2>
      <ProductList cart={cart} setCart={setCart} /> {/* Pass cart and setCart to ProductList */}
    </div>
  );
}