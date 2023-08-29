import React, { useState, useEffect } from 'react';
import { fetchProducts, fetchProductById, fetchProductsDescending, fetchCategories, fetchProductsByCategory } from './AjaxHelpers/products'; // Import your functions
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [limitedProducts, setLimitedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCategoryProducts, setSelectedCategoryProducts] = useState([]); // State for products based on selected category



  useEffect(() => {
    fetchProducts()
      .then(data => {
        setProducts(data);
        setIsLoading(false);
      })
      .catch(error => console.error(error));
  }, []);



  useEffect(() => {
    fetchProductsDescending()
      .then(data => setProducts(data))
      .catch(error => console.error(error));
  }, []); // Fetch products with descending sort on component mount

  useEffect(() => {
    fetchCategories()
      .then(data => {
        setCategories(data);
        setIsLoading(false);
      })
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      fetchProductsByCategory(selectedCategory)
        .then(data => setSelectedCategoryProducts(data)) // Update the selectedCategoryProducts state
        .catch(error => console.error(error));
    } else {
      // Fetch all products when no specific category is selected
      fetchProducts()
        .then(data => setSelectedCategoryProducts(data)) // Update the selectedCategoryProducts state
        .catch(error => console.error(error));
    }
  }, [selectedCategory]);


  const handleProductClick = async (productId) => {
    try {
      const productData = await fetchProductById(productId);
      setSelectedProduct(productData);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <h1>Ebuy</h1>


      {/* Select dropdown for choosing category */}
      <div>
        <label>Select Category: </label>
        <select
          value={selectedCategory || ''}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="jewelery">Jewelery</option>
          <option value="electronics">Electronics</option>
          <option value="men's clothing">Men's Clothing</option>
          <option value="women's clothing">Women's clothing</option>
          {/* Add more categories here */}
        </select>
      </div>

      <ul>
        {selectedCategoryProducts.map(product => (
          <li key={product.id}>
            <button onClick={() => handleProductClick(product.id)}>
              View Details
            </button>
            {product.title}
          </li>
        ))}
      </ul>

      {selectedProduct && (
        <div>
          <h2>{selectedProduct.title}</h2>
          <p>{selectedProduct.description}</p>
          <strong>${selectedProduct.price}</strong>
        </div>
      )}
    </div>
  );
}

export default App;
