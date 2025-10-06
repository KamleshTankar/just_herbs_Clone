import React from 'react'

const Banner = ({page}) => {
  return (
    <div className="w-full h-8 px-4 mt-2 text-right flex justify-between items-center bg-white">
      <h2>{page}</h2> <h4>Home - {page}</h4>
    </div>
  );
}

export default Banner