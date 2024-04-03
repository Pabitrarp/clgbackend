import React, { useState } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';

const Carousal = () => {
  const slides = [
    {
      url: 'https://images.pexels.com/photos/14693027/pexels-photo-14693027.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      url: 'https://images.pexels.com/photos/12560704/pexels-photo-12560704.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      url: 'https://images.pexels.com/photos/3934616/pexels-photo-3934616.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      url: 'https://images.pexels.com/photos/15997337/pexels-photo-15997337/free-photo-of-bicycle-under-building-wall-with-painted-pixel-eyes.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      url: 'https://images.pexels.com/photos/14486283/pexels-photo-14486283.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className="max-w-[1400px] h-[780px] w-full m-auto py-16 px-4 relative group">
      <div
        style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
        className="w-full h-full rounded-2xl bg-center bg-cover duration-500 relative"
      >
        {/* Left arrow */}
        <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 -translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white">
          <BsChevronCompactLeft onClick={prevSlide} size={30} />
        </div>
        {/* Right Arrow */}
        <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 -translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white">
          <BsChevronCompactRight onClick={nextSlide} size={30} />
        </div>
      </div>
      <div className="flex top-4 justify-center py-2">
        {slides.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            className={`text-2xl cursor-pointer ${
              currentIndex === slideIndex ? 'text-blue-500' : 'text-gray-500'
            }`}
            onClick={() => goToSlide(slideIndex)}
          >
            <RxDotFilled />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousal;
