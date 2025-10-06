import React from 'react'
import { Link } from 'react-router-dom';

const Banner = ({imageUrl, title}) => {
    const BanStyle = {
      backgroundImage: `url(${imageUrl})`,
      backgroundSize: "cover", // Ensures the image covers the entire container
      backgroundPosition: "top",
      backgroundRepeat: "no-repeat",
    };
  return (
      <div style={BanStyle} className='w-full h-[50vh] flex justify-center items-center' role="banner">
        <h1 className='text-4xl md:text-5xl font-semibold font-serif text-gold px-4 py-2 rounded'><Link to='/' className='hover:underline'>Home</Link><span className='mx-2'>/</span>{title}</h1>
    </div>
  )
}

export default Banner