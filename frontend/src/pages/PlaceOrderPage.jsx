
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';

const PlaceOrderPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const { orderData } = location.state || {};

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [placedOrderDetails, setPlacedOrderDetails] = useState(null);

  useEffect(() => {
    if (!orderData) {
      navigate('/checkout'); // Redirect if no order data
    }
  }, [orderData, navigate]);

  const getDeliveryDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 7); // 7 days from today
    return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  const handlePlaceOrder = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      const estimatedDeliveryDate = new Date();
      estimatedDeliveryDate.setDate(estimatedDeliveryDate.getDate() + 7);

      const orderDataWithDelivery = {
        ...orderData,
        estimatedDeliveryDate: estimatedDeliveryDate,
      };

      const response = await axios.post(`/api/orders`, orderDataWithDelivery, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPlacedOrderDetails(response.data);
      setOrderPlaced(true);
      clearCart(); // Clear cart after successful order
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  if (!orderData) {
    return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <p className="text-xl font-semibold">No order data found. Redirecting...</p>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="bg-gray-100 min-h-screen">
        <Header />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6 md:p-8 text-center">
            <h1 className="text-3xl font-bold text-green-600 mb-4">Congratulations! Your Order Has Been Placed!</h1>
            <p className="text-gray-700 text-lg mb-6">Your order ID: <span className="font-semibold">{placedOrderDetails._id}</span></p>
            <p className="text-gray-700 text-lg mb-8">You can check the order details in Returns & Orders page</p>
            <button
              onClick={() => navigate('/home')}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
            >
              Continue Shopping
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6 md:p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">Confirm Your Order</h1>

          {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {error}</span>
          </div>}

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Shipping Address</h2>
            <p>{orderData.shippingAddress.fullName}</p>
            <p>{orderData.shippingAddress.street}</p>
            <p>{orderData.shippingAddress.city}, {orderData.shippingAddress.state} {orderData.shippingAddress.zipCode}</p>
            <p>{orderData.shippingAddress.country}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Payment Method</h2>
            <p>{orderData.paymentMethod}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Order Items</h2>
            <div className="divide-y divide-gray-200">
              {orderData.items.map(item => (
                <div key={item.productId} className="py-4 flex items-center">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-contain mr-4 rounded-md" />
                  <div>
                    <p className="font-semibold text-gray-800">{item.name}</p>
                    <p className="text-gray-600">{item.quantity} x ₹{item.price.toFixed(2)} = ₹{(item.quantity * item.price).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="text-right text-xl font-bold text-gray-800 mb-6">
            Total: ₹{orderData.totalPrice.toFixed(2)}
          </div>

          <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-6" role="alert">
            <p className="font-bold">Estimated Delivery:</p>
            <p>Order arriving on {getDeliveryDate()}</p>
          </div>

          <div className="mt-6 pt-6 border-t flex justify-end">
            <button
              onClick={handlePlaceOrder}
              disabled={loading}
              className={`py-2 px-6 rounded-md text-white font-semibold transition-colors duration-300
                ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
            >
              {loading ? 'Placing Order...' : 'Place Order'}
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PlaceOrderPage;
