import React from 'react'

const Testimonials = () => {
  return (
    <section className="bg-gray-50 py-12 border border-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-8">
          What Our Customers Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-transform transform hover:-translate-y-1">
            <p className="text-gray-700 mb-4 italic">"Great products and fast shipping!"</p>
            <p className="text-sm font-medium text-gray-900">- John Doe</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-transform transform hover:-translate-y-1">
            <p className="text-gray-700 mb-4 italic">"Excellent customer service and quality."</p>
            <p className="text-sm font-medium text-gray-900">- Jane Smith</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-transform transform hover:-translate-y-1">
            <p className="text-gray-700 mb-4 italic">"Highly recommended for everyone!"</p>
            <p className="text-sm font-medium text-gray-900">- Mike Johnson</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials