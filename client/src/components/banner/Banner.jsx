import React from 'react'
import { Link } from 'react-router-dom';

const Banner = ({imageUrl, title = "page title"}) => {

  return (
    <div
      style={{ backgroundImage: `url(${imageUrl})`,backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}
      className="w-full h-[50vh] flex justify-center items-center"
      role="banner"
      aria-label={`${title} banner`}
    >
      <h1 className="text-4xl md:text-5xl font-semibold font-serif text-gold px-4 py-2 rounded">
        <Link to="/" className="hover:underline">
          Home
        </Link>
        <span className="mx-2">/</span>
        {title}
      </h1>
    </div>
  );
}

export default Banner