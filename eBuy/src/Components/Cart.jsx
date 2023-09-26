import React from 'react';
import './Cart.css';
import { useState } from 'react';

function Cart({ cart,setCart }) {

  const [showCheckoutMessage, setShowCheckoutMessage] = useState(false);


  console.log('Cart:', cart);



  // Function to calculate the total price of items in the cart
    const calculateTotalPrice = () => {
      if (cart) {
        return cart.products.reduce((total, product) => {
          //  Logging the values of price, quantity, and intermediate totals
          console.log(`Price: ${product.price}, Quantity: ${product.quantity}, Total: ${total}`);
          
          // Ensure that price and quantity are numbers
          const price = typeof product.price === 'number' ? product.price : 0;
          const quantity = typeof product.quantity === 'number' ? product.quantity : 0;
          
          return total + price * quantity;
        }, 0);
      }
      return 0;
    };


    //increasing the quantity of the item in the cart
    const handleIncreaseQuantity = (productId) => {
        if (cart) {
          const updatedProducts = cart.products.map((product) => {
            if (product.productId === productId) {
              // Increment the quantity for the selected product
              return { ...product, quantity: product.quantity + 1 };
            }
            return product;
          });
    
          const updatedCart = { ...cart, products: updatedProducts };
          setCart(updatedCart);
        } else {
          console.error('Cart data is not available.');
        }
      };
    
      //decreasing the quantitiy of the item in the cart
      const handleDecreaseQuantity = (productId) => {
        if (cart) {
          const updatedProducts = cart.products.map((product) => {
            if (product.productId === productId) {
              // Decrement the quantity for the selected product
              const newQuantity = product.quantity - 1;
              
              // Ensure the quantity is never less than 1
              const updatedQuantity = Math.max(newQuantity, 1);
      
              return { ...product, quantity: updatedQuantity };
            }
            return product;
          });
      
          const updatedCart = { ...cart, products: updatedProducts };
          setCart(updatedCart);
        } else {
          console.error('Cart data is not available.');
        }
      };
    
      //removing the item from the cart completely
      const handleRemoveFromCart = (productId) => {
        if (cart) {
          const updatedProducts = cart.products.filter((product) => product.productId !== productId);
          
          const updatedCart = { ...cart, products: updatedProducts };
          setCart(updatedCart);
        } else {
          console.error('Cart data is not available.');
        }
      };

      const handleCheckout = () => {
        // Perform any necessary checkout logic here
        console.log('Checkout button clicked');

        
        // Resetting the cart, customer has bought something 
        setCart({ products: [] });
        
        // Show the checkout message
        setShowCheckoutMessage(true);
      };
      
    
  //the return renders the buttons in the cart itself to add, decrease and remove it
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
                <p>{productItem.price}</p>
                <p>Quantity: {productItem.quantity}</p>
                <button onClick={() => handleIncreaseQuantity(productItem.productId)}>+</button>
                <button onClick={() => handleDecreaseQuantity(productItem.productId)}>-</button>
                <button onClick={() => handleRemoveFromCart(productItem.productId)}>Remove</button>
              </li>
            ))}
          </ul>
          <p>Total: ${calculateTotalPrice().toFixed(2)}</p> {/* Display the total price */}
          {showCheckoutMessage ? (
          <p>Thanks for shopping at eBuy, enjoy your items!</p>
        ) : (
          <button onClick={handleCheckout}>Checkout</button>
        )}
        {console.log('showCheckoutMessage:', showCheckoutMessage)}
        </div>
      )}
    </div>
  );
}

export default Cart;