import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

function Navbar({ cart }) { // Add `cart` as a prop
  return (
    <nav className='navClass'>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to='/register'>Register</Link></li>
        {cart && (
          <li>
            <Link to="/cart">
              Cart ({cart.products.length})
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
