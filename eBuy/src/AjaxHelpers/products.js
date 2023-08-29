const BASE_URL = 'https://fakestoreapi.com';


//this is for fetching all the products
export const fetchProducts = async () => {
    try {
      const response = await fetch(`${BASE_URL}/products`)
  
      const result = await response.json();
      console.log(result);
      return result
    } catch (err) {
      console.error(err);
    }
  }

  //this is for fetching a specific product
  export const fetchProductById = async (productId) => {
    try {
      const response = await fetch(`${BASE_URL}/products/${productId}`);
      const result = await response.json();
      return result;
    } catch (err) {
      console.error(err);
      throw err; // Rethrow the error to be caught by the caller if needed
    }
  };
  

  //this is for limiting the number of products loaded
  export const fetchLimitedProducts = async (limit = 5) => {
    try {
      const response = await fetch(`${BASE_URL}/products?limit=${limit}`);
      const result = await response.json();
      return result;
    } catch (err) {
      console.error(err);
      throw err; // Rethrow the error to be caught by the caller if needed
    }
  };