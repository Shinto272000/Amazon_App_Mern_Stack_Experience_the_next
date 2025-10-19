import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';

const Header = ({ selectedCategory, setSelectedCategory }) => {
  const [user, setUser] = useState(null);
  const { cart, fetchCart, clearCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      axios.get(`/auth/user/${storedUserId}`)
        .then(response => {
          setUser(response.data.user);
          fetchCart(); // Fetch cart when user is loaded
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setUser(null); // Clear user state
    clearCart(); // Clear cart state
    navigate('/'); // Navigate to sign-in page
  };

  const cartItemCount = cart.items ? cart.items.reduce((acc, item) => acc + item.quantity, 0) : 0;

  return (
    <header className="bg-gray-800 text-white p-2 md:p-3 flex items-center justify-between flex-wrap">
      {/* Logo */}
      <div className="flex items-center flex-shrink-0 mr-4">
        <Link to="/">
          <img
            className="w-20 md:w-24 cursor-pointer object-contain"
            src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
            alt="Amazon Logo"
          />
        </Link>
      </div>

      {/* Search Bar */}
      <div className="flex-grow flex items-center mx-2 md:mx-4 order-3 md:order-2 w-full md:w-auto mt-2 md:mt-0">
        {/* Category Dropdown */}
        <select
          className="p-2 h-full rounded-l-md border-r border-gray-300 focus:outline-none bg-gray-200 text-black text-sm"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Smartphones">Smartphones</option>
          <option value="Women's Clothing">Women's Clothing</option>
          <option value="Men's Clothing">Men's Clothing</option>
          <option value="Electronics">Electronics</option>
        </select>
        <input
          className="p-2 h-full w-full flex-grow focus:outline-none bg-white text-black text-sm cursor-not-allowed "
          type="text"
          placeholder="Search Amazon.in" disabled
        />
        <button className="p-2 bg-yellow-500 hover:bg-yellow-600 rounded-r-md text-black">
          {/* Search Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 md:h-6 md:w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>

      {/* Right Section - Account, Orders, Cart */}
      <div className="flex items-center space-x-4 md:space-x-6 whitespace-nowrap order-2 md:order-3">
        <div className="link group relative">
          <Link to={user ? '/home' : '/'}>
            <div className="flex flex-col">
              <p className="text-xs hidden sm:inline">Hello, {user ? user.fullName : 'Sign In'}</p>
              <p className="font-bold text-sm">Accounts & Lists</p>
            </div>
          </Link>
          {user && (
            <div className="absolute hidden group-hover:block bg-white text-gray-800 text-sm rounded-md shadow-lg py-2 z-30 min-w-[120px] right-0 top-full">
              <button onClick={handleSignOut} className="block w-full text-left px-4 py-2 hover:bg-gray-100">Sign Out</button>
            </div>
          )}
        </div>

        <Link to="/myorders" className="link">
          <p className="text-xs hidden sm:inline">Returns</p>
          <p className="font-bold text-sm">& Orders</p>
        </Link>

        <Link to="/cart" className="link relative flex items-center">
          {/* Cart Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 md:h-10 md:w-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 0a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <span className="absolute top-0 -right-1 md:right-auto md:left-5 h-4 w-4 bg-yellow-500 rounded-full text-black font-bold text-center text-xs">
            {cartItemCount}
          </span>
          <p className="hidden md:inline font-bold text-sm mt-2">Cart</p>
        </Link>
      </div>
    </header>
  );
};

export default Header;
