
import React, { createContext, useReducer, useContext } from 'react';
import axios from 'axios';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CART':
      return action.payload;
    case 'CLEAR_CART':
      return { items: [] };
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, { items: [] });

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await axios.get('/api/cart', {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch({ type: 'SET_CART', payload: response.data });
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const addToCart = async (productId, quantity) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('/api/cart', 
        { productId, quantity }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch({ type: 'SET_CART', payload: response.data });
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const updateCartItem = async (productId, quantity) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`/api/cart/${productId}`, 
        { quantity }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch({ type: 'SET_CART', payload: response.data });
    } catch (error) {
      console.error('Error updating cart item:', error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`/api/cart/${productId}`, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch({ type: 'SET_CART', payload: response.data });
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider value={{ cart, fetchCart, addToCart, updateCartItem, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
