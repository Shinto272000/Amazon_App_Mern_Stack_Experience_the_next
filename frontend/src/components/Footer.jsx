import React from 'react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-gray-800 text-white mt-8 text-sm">
      <div
        className="bg-gray-700 hover:bg-gray-600 cursor-pointer text-center p-3"
        onClick={scrollToTop}
      >
        Back to top
      </div>
      <div className="container mx-auto p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <h4 className="font-bold mb-3">Get to Know Us</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white">About Us</a></li>
              <li><a href="#" className="hover:text-white">Careers</a></li>
              <li><a href="#" className="hover:text-white">Press Releases</a></li>
              <li><a href="#" className="hover:text-white">Amazon Science</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-3">Connect with Us</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white">Facebook</a></li>
              <li><a href="#" className="hover:text-white">Twitter</a></li>
              <li><a href="#" className="hover:text-white">Instagram</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-3">Make Money with Us</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white">Sell on Amazon</a></li>
              <li><a href="#" className="hover:text-white">Sell under Amazon Accelerator</a></li>
              <li><a href="#" className="hover:text-white">Protect and Build Your Brand</a></li>
              <li><a href="#" className="hover:text-white">Amazon Global Selling</a></li>
              <li><a href="#" className="hover:text-white">Become an Affiliate</a></li>
              <li><a href="#" className="hover:text-white">Fulfilment by Amazon</a></li>
              <li><a href="#" className="hover:text-white">Advertise Your Products</a></li>
              <li><a href="#" className="hover:text-white">Amazon Pay on Merchants</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-3">Let Us Help You</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white">COVID-19 and Amazon</a></li>
              <li><a href="#" className="hover:text-white">Your Account</a></li>
              <li><a href="#" className="hover:text-white">Returns Centre</a></li>
              <li><a href="#" className="hover:text-white">100% Purchase Protection</a></li>
              <li><a href="#" className="hover:text-white">Amazon App Download</a></li>
              <li><a href="#" className="hover:text-white">Help</a></li>
            </ul>
          </div>
        </div>
        <hr className="border-gray-600 my-8" />
        <div className="flex flex-col items-center space-y-4">
            <img
              className="w-20 md:w-24 object-contain"
              src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
              alt="Amazon Logo"
            />
          <div className="text-center text-xs text-gray-400">
            <p>&copy; 1996-2025, Amazon.com, Inc. or its affiliates</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
