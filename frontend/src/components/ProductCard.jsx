import React from 'react';
import { Link } from 'react-router-dom'; // Import Link

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product._id}`} className="no-underline text-inherit"> {/* Wrap with Link */}
      <div className="relative flex flex-col bg-white z-30 p-4 sm:p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 h-full">
        <p className="absolute top-2 right-2 text-xs italic text-gray-400">{product.category}</p>

        <img src={product.imageUrls[1]} className="h-32 w-32 sm:h-40 sm:w-40 object-contain mx-auto mb-4" alt={product.name} />

        <h4 className="my-2 text-md sm:text-lg font-semibold line-clamp-1">{product.name}</h4>

        <div className="flex items-center mb-2">
          {/* Star Rating */}
          {Array(Math.floor(product.rating))
            .fill()
            .map((_, i) => (
              <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.92 8.727c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
              </svg>
            ))}
        </div>

        <p className="text-xs sm:text-sm my-2 line-clamp-2 flex-grow">{product.description}</p>

        <div className="mb-4 font-bold text-lg sm:text-xl">
          <p>₹{product.price}</p>
        </div>

      </div>
    </Link>
  );
};

export default ProductCard;
