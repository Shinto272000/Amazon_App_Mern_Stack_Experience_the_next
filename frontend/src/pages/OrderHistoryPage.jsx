
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login'); // Redirect to login if not authenticated
          return;
        }
        const response = await axios.get(`/api/orders/myorders`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(response.data);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError(err.response?.data?.message || 'Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };

    fetchMyOrders();
  }, [navigate]);

  if (loading) {
    return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <p className="text-xl font-semibold">Loading your orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-100 min-h-screen">
        <Header />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6 md:p-8 text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Orders</h1>
            <p className="text-gray-700 mb-6">{error}</p>
            <button
              onClick={() => navigate('/home')}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
            >
              Go to Home
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
        <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6 md:p-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 border-b pb-4">Your Orders</h1>

          {orders.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-lg text-gray-600 mb-6">You haven't placed any orders yet.</p>
              <button
                onClick={() => navigate('/home')}
                className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              {orders.map(order => (
                <div key={order._id} className="border border-gray-200 rounded-lg p-6 shadow-md bg-white">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 border-b pb-3">
                    <div className="mb-2 sm:mb-0">
                      <p className="text-sm text-gray-600">Order ID: <span className="font-semibold text-gray-800 break-all">{order._id}</span></p>
                      <p className="text-sm text-gray-600">Placed On: <span className="font-semibold text-gray-800">{new Date(order.createdAt).toLocaleDateString()}</span></p>
                    </div>
                    <p className="text-xl font-bold text-gray-800">Total: ₹{order.totalPrice.toFixed(2)}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    <div>
                      <p className="font-semibold text-gray-700 mb-1">Shipping Address:</p>
                      <p className="text-gray-600">{order.shippingAddress.fullName}</p>
                      <p className="text-gray-600">{order.shippingAddress.street}</p>
                      <p className="text-gray-600">{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
                      <p className="text-gray-600">{order.shippingAddress.country}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-700 mb-1">Payment Method:</p>
                      <p className="text-gray-600">{order.paymentMethod}</p>
                      <p className="font-semibold text-gray-700 mt-3 mb-1">Estimated Delivery:</p>
                      <p className="text-gray-600">{new Date(order.estimatedDeliveryDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="font-semibold text-gray-700 mb-2">Items:</p>
                    <div className="divide-y divide-gray-100 border border-gray-200 rounded-md">
                      {order.orderItems.map(item => (
                        <div key={item.productId} className="flex flex-col sm:flex-row items-start sm:items-center py-3 px-4">
                          <img src={item.image} alt={item.name} className="w-16 h-16 object-contain mr-4 mb-2 sm:mb-0 rounded-md border border-gray-200" />
                          <div>
                            <p className="font-semibold text-gray-800">{item.name}</p>
                            <p className="text-sm text-gray-600">{item.quantity} x ₹{item.price.toFixed(2)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderHistoryPage;
