import React from 'react';
import heroImage from "../../assets/hero-image.png";
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <div className="h-[75vh] flex justify-between px-10 bg-[#fff8f2]">
      {/* Left Content */}
      <div className="max-w-xl flex flex-col justify-center">
        <h1 className="md:text-5xl text-4xl font-bold text-gray-900 mb-6 leading-tight">
          Explore Our <br /> Book Collection
        </h1>
        <p className="text-gray-700 text-lg mb-6">
          Discover a world of knowledge and entertainment with our diverse range of books across all genres.
        </p>
        <Link to="/all-books" className="bg-orange-600 text-white px-6 py-3 rounded-md text-lg hover:bg-orange-700 transition">
          Shop Now
        </Link>
      </div>

      {/* Right Image */}
      <div className="lg:flex hidden items-end h-full">
        <img
          src={heroImage}
          className="w-[84%] object-contain"
          alt="Hero"
        />
      </div>
    </div>
  );
}

export default Hero;
