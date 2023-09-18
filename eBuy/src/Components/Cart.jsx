import React from 'react';

function Cart({ cart }) {
  if (!cart || !cart.products || cart.products.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  return (
    <div>
      <h2>Your Cart</h2>
      <ul>
        {cart.products.map((product) => (
          <li key={product.productId}>
            Product: {product.productId}, Quantity: {product.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Cart;
