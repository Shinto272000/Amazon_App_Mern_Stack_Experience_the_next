import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';

const DealsSection = ({ title = "Today's Deals", selectedCategory }) => { 
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        let url = '/products';
        if (selectedCategory && selectedCategory !== 'All') {
          url += `?category=${selectedCategory}`;
        }
        const response = await axios.get(url);
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]); // Refetch products when selectedCategory changes

  if (loading) return <p className="text-center py-10 text-lg font-medium">Loading products...</p>;
  if (error) return <p className="text-center py-10 text-red-500 text-lg font-medium">Error loading products: {error.message}</p>;

  return (
    <div className="relative bg-gray-100 p-6 md:p-10 rounded-lg shadow-inner my-8"> {/* Enhanced container styling */}
      <h2 className="text-3xl font-extrabold mb-6 text-gray-800 border-b-2 border-yellow-500 pb-2">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mx-auto"> {/* Responsive grid with gap */}
        {products.map((product) => (
          <ProductCard key={product._id} product={product} /> // Changed key to _id for uniqueness
        ))}
      </div>
    </div>
  );
};

export default DealsSection;
