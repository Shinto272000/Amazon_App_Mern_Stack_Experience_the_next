import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import SecondaryHeader from '../components/SecondaryHeader';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';


const ProductDetailsPage = () => {
  const navigate = useNavigate()
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const [reviews, setReviews] = useState([]); // New state for reviews
  const [reviewsLoading, setReviewsLoading] = useState(true); // New state for reviews loading
  const [reviewsError, setReviewsError] = useState(null); // New state for reviews error
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProductAndReviews = async () => {
      try {
        setLoading(true);
        setReviewsLoading(true);

        // Fetch product details
        const productResponse = await axios.get(`/products/${id}`);
        setProduct(productResponse.data);
        setMainImage(productResponse.data.imageUrls[0]);

        // Fetch reviews for the product
        const reviewsResponse = await axios.get(`/api/reviews/product/${id}`);
        setReviews(reviewsResponse.data);

        setLoading(false);
        setReviewsLoading(false);
      } catch (err) {
        setError(err);
        setReviewsError(err);
        setLoading(false);
        setReviewsLoading(false);
      }
    };

    fetchProductAndReviews();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product._id, 1);
    navigate('/cart');
  };

  if (loading) return <p className="text-center py-10 text-lg font-medium text-gray-700">Loading product details...</p>;
  if (error) return <p className="text-center py-10 text-red-500 text-lg font-medium">Error loading product: {error.message}</p>;
  if (!product) return <p className="text-center py-10 text-lg font-medium text-gray-700">Product not found.</p>;

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <Header />
      <SecondaryHeader />
      <div className="p-4 md:p-8">
        <div className="w-full bg-white shadow-lg rounded-lg overflow-hidden lg:flex">
          {/* Image Gallery */}
          <div className="lg:w-1/2 p-4 flex flex-col lg:flex-row items-start">
            <div className="flex lg:flex-col space-x-2 lg:space-x-0 lg:space-y-2 overflow-x-auto lg:overflow-y-auto pb-2 lg:pb-0 lg:pr-4 order-2 lg:order-1">
              {product.imageUrls.map((imageUrl, index) => (
                <img
                  key={index}
                  src={imageUrl}
                  alt={`Thumbnail ${index + 1}`}
                  className={`w-16 h-16 md:w-20 md:h-20 object-cover border-2 rounded-md cursor-pointer ${imageUrl === mainImage ? 'border-blue-500' : 'border-gray-300'}
                  hover:border-blue-400 transition-all duration-200`}
                  onClick={() => setMainImage(imageUrl)}
                />
              ))}
            </div>
            <div className="w-full max-w-md mb-4 lg:mb-0 border rounded-lg overflow-hidden shadow-sm flex-grow order-1 lg:order-2">
              <img src={mainImage} alt={product.name} className="w-full h-80 md:h-96 object-contain" />
            </div>
          </div>

          {/* Product Details */}
          <div className="lg:w-1/2 p-6 md:p-8 flex flex-col justify-between">
            <div>
              <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-2">{product.name}</h1>
              {product.brand && (
                <p className="text-md md:text-lg text-gray-600 mb-3">Brand: <span className="font-semibold">{product.brand}</span></p>
              )}
              <div className="flex items-center mt-2 mb-4">
                <span className="text-yellow-500 text-xl mr-1">
                  {Array(Math.floor(product.rating))
                    .fill()
                    .map((_, i) => (
                      <svg key={i} className="h-5 w-5 inline-block" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.92 8.727c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                      </svg>
                    ))}
                </span>
                <span className="text-gray-600 text-sm">({product.rating} out of 5)</span>
              </div>

              <p className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">₹{product.price}</p>
              <p className="text-gray-700 text-base leading-relaxed mb-6">{product.description}</p>

              <div className="mb-4">
                {product.countInStock > 0 ? (
                  <span className="bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full">In Stock ({product.countInStock})</span>
                ) : (
                  <span className="bg-red-100 text-red-800 text-sm font-semibold px-3 py-1 rounded-full">Out of Stock</span>
                )}
              </div>

              {product.category && (
                <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full mb-6">
                  {product.category}
                </span>
              )}
            </div>

            <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 mt-6">
              <button onClick={handleAddToCart}  className="button w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors duration-200">Add to Cart</button>
              <button onClick={handleAddToCart} className="button w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors duration-200">Buy Now</button>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6 md:p-8 mt-8">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 border-b-2 border-gray-200 pb-3">Customer Reviews</h2>
          {reviewsLoading ? (
            <p className="text-center text-gray-700">Loading reviews...</p>
          ) : reviewsError ? (
            <p className="text-center text-red-500">Error loading reviews: {reviewsError.message}</p>
          ) : reviews.length === 0 ? (
            <p className="text-center text-gray-700">No reviews yet.</p>
          ) : (
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review._id} className="border-b border-gray-200 pb-4 last:border-b-0">
                  <div className="flex items-center mb-2">
                    <p className="font-semibold text-gray-800 mr-2">{review.name}</p>
                    <span className="text-yellow-500 text-lg">
                      {Array(Math.floor(review.rating))
                        .fill()
                        .map((_, i) => (
                          <svg key={i} className="h-4 w-4 inline-block" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.92 8.727c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                          </svg>
                        ))}
                    </span>
                  </div>
                  <p className="text-gray-700 text-sm mb-2">{review.comment}</p>
                  <p className="text-gray-500 text-xs">Reviewed on {new Date(review.createdAt).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetailsPage;

