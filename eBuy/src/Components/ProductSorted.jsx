

async function fetchProductsSortedBy(order) {
    try {
      const response = await fetch(`https://fakestoreapi.com/products?sort=${order}`);
      const result = await response.json();
      return result;
    } catch (error) {
      console.error(error);
      throw error; // Re-throw the error to handle it at the caller's level if needed
    }
  }
  
  export default fetchProductsSortedBy;
  