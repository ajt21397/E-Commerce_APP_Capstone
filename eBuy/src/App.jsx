import React, { useState, useEffect } from 'react';
import Navbar from './Components/NavBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';
import Cart from './Components/Cart'; // Import the Cart component


function App() {
  const [savedUsername, setSavedUsername] = useState('');
  const [savedPassword, setSavedPassword] = useState('');
  const [cart, setCart] = useState(null);

  useEffect(() => {
    // Fetch or create the cart when the component mounts
    async function fetchCartData() {
      try {
        const response = await fetch(`https://fakestoreapi.com/carts?userId=3`);
        const cartData = await response.json();

        if (cartData.length === 0) {
          // If the cart doesn't exist, create a new one
          const newCartResponse = await fetch('https://fakestoreapi.com/carts', {
            method: 'POST',
            body: JSON.stringify({
              userId: 3,
              date: new Date().toISOString(),
              products: [],
            }),
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (!newCartResponse.ok) {
            throw new Error('Failed to create a new cart');
          }

          const newCartData = await newCartResponse.json();
          setCart(newCartData);
        } else {
          // Use the existing cart data
          setCart(cartData[0]);
        }
      } catch (error) {
        console.error('An error occurred while fetching/creating the cart:', error);
      }
    }

    fetchCartData();
  }, []);

  return (
    <Router>
      <div className="App">
        <h1 className='title'>Ebuy</h1>
        <Navbar cart={cart} />
        <Routes>
          <Route path="/" element={<Home cart={cart} />} />
          <Route path="/login" element={<Login savedUsername={savedUsername} savedPassword={savedPassword} />} />
          <Route path="/cart" element={<Cart cart={cart} />} /> {/* Render the Cart component with the cart prop */}

        </Routes>
        <div className='center-content'></div>
      </div>
    </Router>
  );
}

export default App;
