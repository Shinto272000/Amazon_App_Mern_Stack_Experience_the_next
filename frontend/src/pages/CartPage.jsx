
import React from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const CartPage = () => {
  const navigate =useNavigate();
  const { cart, updateCartItem, removeFromCart } = useCart();

  const handleIncrease = (productId) => {
    const item = cart.items.find(item => item.productId._id === productId);
    if (item) {
      updateCartItem(productId, item.quantity + 1);
    }
  };

  const handleDecrease = (productId) => {
    const item = cart.items.find(item => item.productId._id === productId);
    if (item && item.quantity > 1) {
      updateCartItem(productId, item.quantity - 1);
    }
  };

  const handleRemove = (productId) => {
    removeFromCart(productId);
  };

  const subtotal = cart.items ? cart.items.reduce((acc, item) => acc + item.quantity * item.productId.price, 0) : 0;
  const totalItems = cart.items ? cart.items.reduce((acc, item) => acc + item.quantity, 0) : 0;

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {cart.items && cart.items.length > 0 ? (
          <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-start">
            <div className="lg:col-span-8">
              <div className="bg-white shadow-md rounded-lg">
                <h1 className="text-2xl font-bold p-6 border-b">Shopping Cart ({totalItems} items)</h1>
                <div className="divide-y divide-gray-200">
                  {cart.items.map(item => (
                    <div key={item.productId._id} className="p-6 flex flex-col sm:flex-row items-center justify-between">
                      <div className="flex items-center mb-4 sm:mb-0">
                        <img src={item.productId.imageUrls[0]} alt={item.productId.name} className="w-24 h-24 object-contain mr-6 rounded-md" />
                        <div>
                          <h2 className="text-lg font-semibold text-gray-800">{item.productId.name}</h2>
                          <p className="text-gray-600 font-bold mt-1">₹{item.productId.price.toFixed(2)}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="flex items-center border rounded-md">
                          <button onClick={() => handleDecrease(item.productId._id)} className="text-gray-600 hover:bg-gray-200 px-3 py-1 transition-colors duration-200">-</button>
                          <span className="px-4 py-1 font-medium">{item.quantity}</span>
                          <button onClick={() => handleIncrease(item.productId._id)} className="text-gray-600 hover:bg-gray-200 px-3 py-1 transition-colors duration-200">+</button>
                        </div>
                        <button onClick={() => handleRemove(item.productId._id)} className="ml-6 text-sm text-red-500 hover:text-red-700 font-semibold transition-colors duration-200">Remove</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="lg:col-span-4 mt-8 lg:mt-0">
              <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-xl font-bold border-b pb-4 mb-4">Order Summary</h2>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-600">Subtotal ({totalItems} items)</span>
                  <span className="font-bold text-gray-800">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-bold text-gray-800">Free</span>
                </div>
                <div className="flex justify-between items-center font-bold text-xl border-t pt-4">
                  <span>Total</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <button onClick={() => navigate('/checkout')} className="w-full mt-6 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 rounded-lg transition-colors duration-300">Proceed to Checkout</button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center bg-white shadow-md rounded-lg p-12">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8">Looks like you haven't added anything to your cart yet.</p>
            <Link to="/home" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300">
              Continue Shopping
            </Link>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;
