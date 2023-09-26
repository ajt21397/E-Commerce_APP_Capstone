import React, { useState, useEffect } from 'react';
import Navbar from './Components/NavBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';
import Cart from './Components/Cart'; // Import the Cart component
import './App.css'; // Import your CSS file
import { AuthProvider } from './Components/AuthContext'; // Import your AuthProvider
import Registration from './Components/Registration'; // Import your Registration component



function App() {
  const [savedUsername, setSavedUsername] = useState('');
  const [savedPassword, setSavedPassword] = useState('');
  const [cart, setCart] = useState({ products: [] }); // Initialize cart with an empty array
  const [savedUserId, setSavedUserId] = useState('');


  useEffect(() => {
    // Fetch or create the cart when the component mounts
    async function fetchCartData() {
      console.log('Fetching cart data...'); // Add this line
      try {
        if (savedUserId) { // Check if savedUserId is defined
          const response = await fetch(`https://fakestoreapi.com/carts?userId=${savedUserId}`);
          const cartData = await response.json();
  
          if (cartData.length === 0) {
            // If the cart doesn't exist, create a new one
            const newCartResponse = await fetch('https://fakestoreapi.com/carts', {
              method: 'POST',
              body: JSON.stringify({
                userId: savedUserId, // Use the saved user ID
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
        }
      } catch (error) {
        console.error('An error occurred while fetching/creating the cart:', error);
      }
    }

    fetchCartData();
  }, [savedUserId]);

  return (
    <AuthProvider>
    <Router>
      <div className="page-container">
        <h1 className='title'>Ebuy</h1>
        <Navbar cart={cart} />
        <Routes>
        <Route path="/" element={<Home cart={cart} setCart={setCart} />} />
          <Route path="/login" element={<Login savedUsername={savedUsername} savedPassword={savedPassword} />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/cart" element={<Cart cart={cart} setCart={setCart}/>} /> {/* Render the Cart component with the cart prop */}
          
        </Routes>
      </div>
    </Router>
    </AuthProvider>
  );
}

export default App;