import React, { useEffect, useState } from 'react';


// Define a separate function to fetch categories
export const fetchProductCategories = async () => {
  try {
    const response = await fetch('https://fakestoreapi.com/products/categories');
    const categories = await response.json();
    return categories;
  } catch (error) {
    console.error(error);
    throw error; // Re-throw the error to handle it at the caller's level if needed
  }
};

export const fetchProducts = async () => {
  try {
    const response = await fetch(`https://fakestoreapi.com/products`);
    const result = await response.json();
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
};



function ProductList({cart}) {
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [sortingOrder, setSortingOrder] = useState('asc');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]); // Add state for categories
  
  useEffect(() => {
    async function fetchData() {
      try {
        const productsData = await fetchProducts();
        setProducts(productsData);
      } catch (error) {
        // Handle errors here if needed
      }
    }

    async function fetchCategories() {
      try {
        const categoriesData = await fetchProductCategories();
        setCategories(categoriesData);
      } catch (error) {
        // Handle errors here if needed
      }
    }

    fetchData();
    fetchCategories(); // Fetch categories

  }, []);




  const handleDetailsClick = async (productId) => {
    setSelectedProductId(productId);
  };

  const handleCategorySelect = (event) => {
    setSelectedCategory(event.target.value);
  };

  const sortProductsByName = () => {
    setSortingOrder((prevSortingOrder) => (prevSortingOrder === 'asc' ? 'desc' : 'asc'));
    setProducts((prevProducts) =>
      prevProducts.sort((a, b) => {
        if (a.name && b.name) {
          return sortingOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
        } else {
          return 0;
        }
      })
    );
  };


  const handleAddToCart = (productId) => {
    if (cart) {
      // Assuming you want to add one item to the cart
      const quantity = 1;
  
      // Create a copy of the existing cart products array
      const updatedProducts = [...cart.products];
  
      // Check if the product with the given productId already exists in the cart
      const existingProduct = updatedProducts.find((product) => product.productId === productId);
  
      if (existingProduct) {
        // If the product already exists in the cart, update its quantity
        existingProduct.quantity += quantity;
      } else {
        // If the product doesn't exist in the cart, add it
        updatedProducts.push({ productId, quantity });
      }
  
      // Update the cart object with the updated products array
      const updatedCart = { ...cart, products: updatedProducts };
  
      // Set the updated cart in the state or send it to a server/API
      // You might need to implement an updateCart function for this
  
      // For now, let's just log the updated cart
      console.log(updatedCart);
    } else {
      console.error('Cart data is not available.');
    }
  };
  
  
  

  return (
    <div className="product-list-container">

      <button onClick={sortProductsByName}>
        Sort by Name {sortingOrder === 'asc' ? '▲' : '▼'}
      </button>

      <label htmlFor="categoryDropdown">Filter by Category:</label>
      <select id="categoryDropdown" value={selectedCategory} onChange={handleCategorySelect}>
      <option value="">All Categories</option>
        {categories.map((category) => ( // Use categories state to populate options
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>


      <div className="product-cards-container">
        {products
          .filter((product) => !selectedCategory || product.category === selectedCategory)
          .map((product) => (
            <div key={product.id} className="product-card">
              <h3>{product.title}</h3>
              <p>Price: ${product.price}</p>
              <p>Category: {product.category}</p>
              <img src={product.image} alt={product.title} /> {/* Use the <img> element */}
              <button onClick={() => handleDetailsClick(product.id)}>Details</button>
              <button onClick={() => handleAddToCart(product.id)}>Add to Cart</button>

              {selectedProductId === product.id && (
                <div className='product-details'>
                
                <p>Description: {product.description}</p>
                
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

export default ProductList;
