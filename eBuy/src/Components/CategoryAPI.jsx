

async function fetchProductCategories() {
    try {
      const response = await fetch('https://fakestoreapi.com/products/categories');
      const categories = await response.json();
      return categories;
    } catch (error) {
      console.error(error);
      throw error; // Re-throw the error to handle it at the caller's level if needed
    }
  }
  
  export default fetchProductCategories;
  