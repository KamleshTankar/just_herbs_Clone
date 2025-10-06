import React from 'react'

import { TbTrendingDown, TbTrendingUp } from "react-icons/tb";

const InfoCard = ( props ) => {
  return (
    <div className={`h-full rounded-xl px-3 py-4 relative ${props.Color}`}>
      {props.grow === true ? <span className=' absolute top-24 text-5xl font-bold opacity-15 text-gray-700'><TbTrendingUp/></span>:<span className=' absolute top-24 text-5xl font-bold opacity-15 text-gray-700'><TbTrendingDown/></span>}
      <div className="h-full flex flex-col justify-between">
        <div className="flex items-center justify-between text-white">
          <div>
            <div className='text-2xl font-medium'>{props.title}</div>
            <h4 className='text-3xl font-semibold'>{props.count}</h4>
          </div>
          <div className={`w-12 h-12 ${props.icbg} cursor-pointer rounded-lg flex items-center justify-center`}>{props.Icon}</div>
        </div>
        <div className="flex items-center justify-between text-white">
          <div className='font-medium'>Last Month</div>
          <div className='text-xl font-medium'>{props.Icon2}</div>
        </div>
      </div>
    </div>
  );
}

export default InfoCard