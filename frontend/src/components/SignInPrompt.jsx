import React from 'react';
import { Link } from 'react-router-dom';

const SignInPrompt = () => {
  return (
    <div className="bg-white p-4 m-3 md:m-5 rounded-lg shadow-md text-center">
      <h3 className="text-lg font-bold mb-2">Sign in for your best experience</h3>
      <Link to="/" className="button w-full block mb-2">
        Sign in securely
      </Link>
      <p className="text-xs text-gray-600">
        New customer?
        <Link to="/register" className="text-blue-500 hover:underline ml-1">
          Start here.
        </Link>
      </p>
    </div>
  );
};

export default SignInPrompt;
