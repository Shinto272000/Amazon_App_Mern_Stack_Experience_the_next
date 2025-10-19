import React, { useState, useEffect } from 'react';
import banner1 from '../assets/bg_images/amazone_banner1.jpg';
import banner2 from '../assets/bg_images/amazone_banner2.jpg';
import banner3 from '../assets/bg_images/amazone_banner3.jpg';
import banner4 from '../assets/bg_images/amazone_banner4.jpg';

const images = [
  banner1,
  banner2,
  banner3,
  banner4,
];

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      goToNext();
    }, 5000); // Auto-advance every 5 seconds
    return () => clearTimeout(timer);
  }, [currentIndex]);

  return (
    <div className="relative h-[200px] sm:h-[300px] md:h-[400px] lg:h-[450px]  overflow-hidden bg-gray-200">
      {/* Image */}
      <img
        src={images[currentIndex]}
        alt="Banner"
        className="w-full h-full object-cover object-center transition-opacity duration-700 ease-in-out"
      />

      {/* Left Arrow */}
      <div
        onClick={goToPrevious}
        className="absolute top-1/2 left-0 transform -translate-y-1/2 p-2 md:p-4 cursor-pointer bg-black bg-opacity-40 text-white hover:bg-opacity-60 rounded-r-md text-lg md:text-2xl"
      >
        &#10094;
      </div>
      {/* Right Arrow */}
      <div
        onClick={goToNext}
        className="absolute top-1/2 right-0 transform -translate-y-1/2 p-2 md:p-4 cursor-pointer bg-black bg-opacity-40 text-white hover:bg-opacity-60 rounded-l-md text-lg md:text-2xl"
      >
        &#10095;
      </div>

      {/* Gradient Overlay */}
      <div className="absolute bottom-0 w-full h-20 md:h-32 bg-gradient-to-t from-gray-100 to-transparent" />
    </div>
  );
};

export default Banner;
