import React, { useState, useEffect } from 'react';
import { fetchProducts, fetchProductById, fetchLimitedProducts } from './AjaxHelpers/products'; // Import your functions
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [limitedProducts, setLimitedProducts] = useState([]);
  const [limit, setLimit] = useState(5); // State for setting the limit

  useEffect(() => {
    fetchProducts()
      .then(data => {
        setProducts(data);
        setIsLoading(false);
      })
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    fetchLimitedProducts(limit) // Fetch limited products based on the current limit
      .then(data => setLimitedProducts(data))
      .catch(error => console.error(error));
  }, [limit]); // Trigger the effect when the limit changes

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

      {/* Input field and button for setting the limit */}
      <div>
        <label>Number of Products: </label>
        <input
          type="number"
          min="1"
          value={limit}
          onChange={(e) => setLimit(parseInt(e.target.value, 10))}
        />
      </div>

      <ul>
        {limitedProducts.map(product => (
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
