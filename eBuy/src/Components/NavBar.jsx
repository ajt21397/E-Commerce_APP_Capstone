import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

//navgation bar function and cart used as a prop
function Navbar({ cart }) { 

   // Calculate the total quantity of items in the cart
   const totalQuantity = cart.products.reduce((total, product) => total + product.quantity, 0);


  //navagation links to login , register (a template since the API wont register), home, and cart link with the number next to it
  return (
    <nav className='navClass'>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to='/register'>Register</Link></li>
        {cart && (
          <li>
            <Link to="/cart">
              Cart ({totalQuantity})
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
