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
  



  export const fetchProductsDescending = async () => {
    try {
      const response = await fetch(`${BASE_URL}/products?sort=desc`);
      const result = await response.json();
      return result;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

 //fetching all categories
  export const fetchCategories = async () => {
    try {
      const response = await fetch(`${BASE_URL}/products/categories`)
  
      const result = await response.json();
      console.log(result);
      return result
    } catch (err) {
      console.error(err);
    }
  }

 //fetching a product by a category
  export const fetchProductsByCategory = async (category) => {
    try {
      const response = await fetch(`${BASE_URL}/products/category/${category}`);
      const result = await response.json();
      return result;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };