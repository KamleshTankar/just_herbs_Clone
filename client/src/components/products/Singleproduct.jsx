import React, { useState, useEffect } from 'react'
import { useParams } from "react-router";
import Skeleton from "react-loading-skeleton";

import Bestseller from "../bestseller/BestSeller";
import Explores from "../Explores/ExploresInfo"
import ProductReview from '../Reviews/ProductReview';

const Singleproduct = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState(null);
  
  const { id } = useParams();
    
  const FetchProducts = async () => {
        try {
          const response = await fetch(`https://dummyjson.com/products/${id}`);
          const data = await response.json();
          setProducts(data);
        } catch (error) {
          console.log("Failed to fetch product:", error);
        } finally {
          setLoading(false);
        }
    };
  
  useEffect(() => {
    FetchProducts();
  }, [id,]);

  const SkeletonLoading = () => {
      return (
          <div className="w-full grid grid-cols-1 tab:grid-cols-1 lap:grid-cols-1 justify-center">
            <Skeleton height={300} width={300} />
            <Skeleton height={20} width={250} />
            <Skeleton height={20} width={250} />
            <Skeleton height={30} width={250} />
          </div>
      );
  };

  if (loading) return <SkeletonLoading />;

  if(!products) return <div className='text-center py-10'>Product not found.</div>
    
  return (
    <>
        <section className=' w-full max-w-5xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6'>
      <div className='flex flex-col items-center gap-4'>
        <img src={products.thumbnail} alt={products.title} className='w-full max-w-sm rounded-lg shadow-md'/>
        <div className='flex gap-3 overflow-x-auto'>
          {products.images?.map((img, idx) => (
          <img key={idx} src={img} alt={`product-img-${idx}`} className='w-24 h-24 object-cover rounded-md shadow-sm'/>
          ))}
        </div>
      </div>
      
      <div className='flex flex-col gap-4'>
        <h1 className='text-3xl font-bold'>{products.title}</h1>

        <div className='text-xl flex item-center gap-4'>
          <span className='text-green-600 font-semibold'>${products.price}</span>
          <span className='line-through text-gray-500 text-lg'>${Math.round(products.price * 1.3)}</span>
        </div>
        
        <p className='text-gray-600'>MRP is inclusive of all taxes.</p>

        <div>
          <label htmlFor="" className='block mb-1 text-gray-700 font-medium'>Quantity</label>
          <input type="number" min="1" defaultValue={1} className='w-20 px-3 py-2 border rounded-md focus:ring focus:ring-blue-200'/>
        </div>

        <button className='bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-md shadow transition'>Add to Cart</button>

        <div className='text-gray-700'><span className='font-medium'>Standard</span></div>
        <div className='text-gray-700'><span className='font-medium'>Sent via courier</span></div>

      </div>
      </section>
      <Explores/>
      <Bestseller />
      <ProductReview/>
    </>
  );
}

export default Singleproduct