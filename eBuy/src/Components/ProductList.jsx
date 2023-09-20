import React, { useEffect, useState } from 'react';
import './ProductList.css'; // Import your CSS file
import { useAuth } from './AuthContext'; // Import the AuthContext and useAuth



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



function ProductList({cart, setCart}) {
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [sortingOrder, setSortingOrder] = useState('asc');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]); // Add state for categories
  const { isLoggedIn } = useAuth(); // Use the useAuth hook to access isLoggedIn

  
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

  useEffect(() => {
    // Initialize the cart data from localStorage only if the user is logged in
    if (isLoggedIn) {
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    }
    
    // Fetch products and categories as before
  }, [setCart, isLoggedIn]);




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


  const handleAddToCart = (productId, productName, productImage) => {
    console.log('Adding product to cart:', productId);
    if (isLoggedIn && cart) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  
    if (cart) {
      const quantity = 1;
      const updatedProducts = [...cart.products];
      const existingProduct = updatedProducts.find((product) => product.productId === productId);
      localStorage.setItem('cart', JSON.stringify(cart));
  
      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        updatedProducts.push({ productId, productName, productImage, quantity }); // Include product image
      }
  
      const updatedCart = { ...cart, products: updatedProducts };
      setCart(updatedCart);
      console.log('Updated cart:', updatedCart);
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
              <button onClick={() => handleAddToCart(product.id, product.title, product.image)}>Add to Cart</button>

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
