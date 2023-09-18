import React, { useEffect, useState } from 'react';
import fetchProductCategories from './CategoryAPI'; // Import the category-fetching function

function Categories() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(''); // State to store the selected category
  const [products, setProducts] = useState([]); // State to store the original product list
  const [sortingOrder, setSortingOrder] = useState('asc'); // State to store the sorting order
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const categoriesData = await fetchProductCategories();
        setCategories(categoriesData);
        setIsLoading(false);
      } catch (error) {
        // Handle errors here if needed
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  // Function to handle category selection
  const handleCategorySelect = (event) => {
    setSelectedCategory(event.target.value);
  };

  // Fetch the original product list
  useEffect(() => {
    async function fetchAllProducts() {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const productsData = await response.json();
        setProducts(productsData);
      } catch (error) {
        // Handle errors here if needed
      }
    }

    fetchAllProducts();
  }, []);

  // Function to sort the product list by title
  const sortProductsByTitle = () => {
    setSortingOrder((prevSortingOrder) => (prevSortingOrder === 'asc' ? 'desc' : 'asc'));
  };

  // Sort the products array in place based on the current sorting order
  useEffect(() => {
    if (sortingOrder === 'asc') {
      products.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      products.sort((a, b) => b.title.localeCompare(a.title));
    }
  }, [sortingOrder, products]);

  return (
    <div>
      <h1>Product Categories</h1>
      <label htmlFor="categoryDropdown">Select a Category:</label>
      <select id="categoryDropdown" value={selectedCategory} onChange={handleCategorySelect}>
        <option value="">All Categories</option>
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>

      <button onClick={sortProductsByTitle}>
        Sort by Title {sortingOrder === 'asc' ? '▲' : '▼'}
      </button>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {/* Display products based on the selected category */}
          <ul>
            {products
              .filter((product) => !selectedCategory || product.category === selectedCategory)
              .map((product) => (
                <li key={product.id}>{product.title}</li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Categories;
