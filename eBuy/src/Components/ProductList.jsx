import React, { useEffect, useState } from 'react';
import './ProductList.css'; // Import your CSS file
import { useAuth } from './AuthContext'; // Import the AuthContext and useAuth



// fetch categories
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


//Where I display all my products, sorting, search bar and most cart stuff
function ProductList({cart, setCart}) {
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [sortingOrder, setSortingOrder] = useState('asc');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]); // Add state for categories
  const { isLoggedIn } = useAuth(); // Use the useAuth hook to access isLoggedIn
  const [selectedSortingOrder, setSelectedSortingOrder] = useState('asc');
  const [searchQuery, setSearchQuery] = useState(''); //for search bar
  const [filteredProducts, setFilteredProducts] = useState([]); //for search bar


 //for the search bar
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  //for increasing the quantity on the product list
  const handleIncreaseQuantity = (productId) => {
    if (cart) {
      const updatedProducts = cart.products.map((product) => {
        if (product.productId === productId) {
          // Increment the quantity for the selected product
          return { ...product, quantity: product.quantity + 1 };
        }
        return product;
      });
  
      const updatedCart = { ...cart, products: updatedProducts };
      setCart(updatedCart);
    } else {
      console.error('Cart data is not available.');
    }
  };
  

  //for decreasing quantity
  const handleDecreaseQuantity = (productId) => {
    if (cart) {
      const updatedProducts = cart.products.map((product) => {
        if (product.productId === productId) {
          // Decrement the quantity for the selected product
          const newQuantity = product.quantity - 1;
  
          // Ensure the quantity is never less than 1
          const updatedQuantity = Math.max(newQuantity, 1);
  
          return { ...product, quantity: updatedQuantity };
        }
        return product;
      });
  
      const updatedCart = { ...cart, products: updatedProducts };
      setCart(updatedCart);
    } else {
      console.error('Cart data is not available.');
    }
  };
  



  
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
  }, []); // Add an empty dependency array to run this effect only once
  
  
  
  

  useEffect(() => {
    // Initialize the cart data from localStorage only if the user is logged in
    if (isLoggedIn) {
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    }
    
    // Fetch products and categories
  }, [setCart, isLoggedIn]);


  useEffect(() => {
    filterProducts();
  }, [searchQuery, products]);
  
  

  const handleCategorySelect = (event) => {
    setSelectedCategory(event.target.value);
  };


  //sorting by name
  const sortProductsByName = () => {
    setProducts((prevProducts) => {
      const newSortingOrder = sortingOrder === 'asc' ? 'desc' : 'asc';
      return [...prevProducts].sort((a, b) => {
        if (a.title && b.title) {
          return newSortingOrder === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
        } else {
          return 0;
        }
      });
    });
    setSortingOrder((prevSortingOrder) => (prevSortingOrder === 'asc' ? 'desc' : 'asc'));
  };

  
  //sorting by price, high to low, and low to high
  const sortProductsByPrice = () => {
    setProducts((prevProducts) => {
      const newSortingOrder = selectedSortingOrder;
      return [...prevProducts].sort((a, b) => {
        if (newSortingOrder === 'asc') {
          return a.price - b.price;
        } else {
          return b.price - a.price;
        }
      });
    });
  };
  
  


  //where my items go to the shopping cart
  const handleAddToCart = (productId, productName, productImage, price) => {
    console.log('Adding to cart:', productId, productName);
  
    if (cart) {
      const existingProduct = cart.products.find((product) => product.productId === productId);
  
      if (existingProduct) {
        // If the product is already in the cart, increase its quantity
        console.log('Product already in cart. Incrementing quantity.');
        const updatedProducts = cart.products.map((product) => {
          if (product.productId === productId) {
            return { ...product, quantity: product.quantity + 1 };
          }
          return product;
        });
  
        const updatedCart = { ...cart, products: updatedProducts };
        setCart(updatedCart);
      } else {
        // If the product is not in the cart, add it with a quantity of 1
        console.log('Product not in cart. Adding with quantity 1.');
        const updatedCart = {
          ...cart,
          products: [
            ...cart.products,
            { productId, productName, productImage, price, quantity: 1 },
          ],
        };
        setCart(updatedCart);
      }
    } else {
      console.error('Cart data is not available.');
    }
  };
  

  //for the search bar specifically filtering words and matching it with the items' title, not case sensitive 
  const filterProducts = () => {
    const filtered = products.filter((product) => {
      const titleMatches = product.title.toLowerCase().includes(searchQuery.toLowerCase());
      const descriptionMatches = product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return titleMatches || descriptionMatches;
    });
    setFilteredProducts(filtered);
  };
  

  

  return (
    <div className="product-list-container">

    {/*for search bar */}
    <input
      type="text"
      id="search"
      name="search"
      value={searchQuery}
      onChange={handleSearchInputChange}
      placeholder="Search..."
      style={{ width: '200px', padding: '8px' }}
    />



      {/*Button to sort by name, once to start with the top letter, click again to start with bottom letter */}
      <button onClick={sortProductsByName}>Sort by Name {sortingOrder === 'asc' ? '▲' : '▼'}</button>

      {/*Button to sort the products by prices, click once to start from highest to low and then lowest to high */}
      <label htmlFor="sortDropdown">Sort by Price:</label>
      <select
        id="sortDropdown"
        value={selectedSortingOrder}
        onChange={(e) => {
          setSelectedSortingOrder(e.target.value);
          sortProductsByPrice(); 
          }}
      >
      <option value="asc">High to Low</option>
      <option value="desc">Low to High</option>
      </select>




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
      {/*To filter through the product list for the search bar as well as the categories of the drop down window */}
      {filteredProducts
      .filter((product) => (!selectedCategory || product.category === selectedCategory) && (
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
         ))
        .map((product) => (
            <div key={product.id} className="product-card">
              <h3>{product.title}</h3>
              <p>Price: ${product.price}</p>
              <p>Category: {product.category}</p>
              <img src={product.image} alt={product.title} /> {/* Use the <img> element */}
              <p>Description: {product.description}</p> {/* Display the description */}
              
              {/* Display quantity and buttons to increase/decrease */}
              <p>Quantity: {product.quantity}</p>
              <button onClick={() => handleAddToCart(product.id, product.title, product.image, product.price)}>Add to Cart</button>
              {/* Add a button to decrease quantity */}
              <button onClick={() => handleIncreaseQuantity(product.id)}>+</button> 
              <button onClick={() => handleDecreaseQuantity(product.id)}>-</button>              

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
