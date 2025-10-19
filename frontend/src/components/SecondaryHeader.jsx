import React from 'react';

const SecondaryHeader = () => {
  return (
    <div className="flex items-center space-x-2 md:space-x-3 p-2 pl-3 md:pl-6 bg-gray-700 text-white text-xs md:text-sm overflow-x-auto whitespace-nowrap">
      <p className="link flex items-center font-bold">
        {/* Menu Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 md:h-6 md:w-6 mr-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
        All
      </p>
      <p className="link">Fresh</p>
      <p className="link">Amazon miniTV</p>
      <p className="link">Sell</p>
      <p className="link">Bestsellers</p>
      <p className="link">Mobiles</p>
      <p className="link hidden sm:inline-flex">Today's Deals</p>
      <p className="link hidden sm:inline-flex">Fashion</p>
      <p className="link hidden lg:inline-flex">Electronics</p>
      <p className="link hidden lg:inline-flex">Prime</p>
      <p className="link hidden lg:inline-flex">New Releases</p>
      <p className="link hidden xl:inline-flex">Home & Kitchen</p>
      <p className="link hidden xl:inline-flex">Customer Service</p>
    </div>
  );
};

export default SecondaryHeader;
