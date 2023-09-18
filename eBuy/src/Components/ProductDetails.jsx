import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function ProductDetails({ productId }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product details');
        }
        const productData = await response.json();
        setProduct(productData);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'An error occurred while fetching product details');
        setLoading(false);
      }
    }

    fetchData();
  }, [productId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>No product details available</div>;
  }

  return (
    <div>
      <h3>Product Name: {product.title}</h3>
      <p>Price: ${product.price}</p>
      <p>Category: {product.category}</p>
      <p>Description: {product.description}</p>
      <img src={product.image} alt={product.title} />
      {/* Add more product details here */}
    </div>
  );
}

ProductDetails.propTypes = {
  productId: PropTypes.number.isRequired, // Assuming productId is a number
};

export default ProductDetails;
