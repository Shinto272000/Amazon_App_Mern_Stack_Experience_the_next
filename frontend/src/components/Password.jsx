
import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const Password = () => {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { identifier } = location.state || {};

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, { identifier, password });
      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        navigate('/home');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Enter Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Password;
