import React from 'react';
import './Cart.css';

function Cart({ cart }) {
  return (
    <div className={`cart${location.pathname === '/cart' ? ' cart-page' : ''}`}>
      <h2>Cart</h2>
      {cart.products.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul>
            {cart.products.map((productItem) => (
              <li key={productItem.productId}>
                 <img src={productItem.productImage} alt={productItem.productName} /> {/* Display product image */}
                <p>{productItem.productName}</p>
                <p>Quantity: {productItem.quantity}</p>
              </li>
            ))}
          </ul>
          <p>Total: {/* Calculate and display the total price here */}</p>
          <button>Checkout</button>
        </div>
      )}
    </div>
  );
}

export default Cart;
