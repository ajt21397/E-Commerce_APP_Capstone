export async function updateCart(cartId, userId, date, products) {
    try {
      const response = await fetch(`https://fakestoreapi.com/carts/${cartId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          userId,
          date,
          products
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const jsonData = await response.json();
      return jsonData;
    } catch (error) {
      console.error('An error occurred:', error);
      throw error; // You can handle the error further up in your application
    }
  }
  
  // Example usage:
  const cartId = 7;
  const userId = 3;
  const date = '2019-12-10';
  const products = [{ productId: 1, quantity: 3 }];
  
  updateCart(cartId, userId, date, products)
    .then((json) => console.log(json))
    .catch((error) => console.error('Failed to update cart:', error));
  

export default updateCart;