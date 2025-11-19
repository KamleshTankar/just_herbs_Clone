import React from 'react'

import Banner from '../../assets/banner/Strip_banner.webp'

const ExploresInfo = () => {
  return (
    <div className=" w-[90%] h-56 p-6 my-2 mx-auto relative rounded-lg bg-cover bg-center" style={{ backgroundImage: `url(${Banner})` }}>
      <h2 className='text-center font-titles font-semibold text-yellow-700 text-4xl'>Explores Info</h2>
    </div>
  )
}

export default ExploresInfo