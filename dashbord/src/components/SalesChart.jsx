import React from 'react'

import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const SalesChart = () => {

    const data = [
      {
        name: "2009",
        uv: 4000,
        pv: 2400,
        amt: 2400,
      },
      {
        name: "2011",
        uv: 3000,
        pv: 1398,
        amt: 2210,
      },
      {
        name: "2013",
        uv: 2000,
        pv: 9800,
        amt: 2290,
      },
      {
        name: "2015",
        uv: 2780,
        pv: 3908,
        amt: 2000,
      },
      {
        name: "2017",
        uv: 1890,
        pv: 4800,
        amt: 2181,
      },
      {
        name: "2019",
        uv: 2390,
        pv: 3800,
        amt: 2500,
      },
      {
        name: "2021",
        uv: 3490,
        pv: 4300,
        amt: 2100,
      },
      {
        name: "2023",
        uv: 4900,
        pv: 5300,
        amt: 4200,
      },
    ];

  return (
    <div className="w-[95%] h-auto mx-auto mt-2 text-center">
      <h3 className="text-xl font-medium">Sales Chart</h3>
      <LineChart className='mx-auto w-4/5'
        width={900}
        height={400}
        data={data}
        margin={{ top: 5, right: 0, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="pv" stroke="#8884d8" />
        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
      </LineChart>
    </div>
  );
}

export default SalesChart