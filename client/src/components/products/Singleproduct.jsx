import React, { useState, useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from "react-router";
import Skeleton from "react-loading-skeleton";

import Bestseller from "../bestseller/BestSeller";
import Explores from "../Explores/ExploresInfo"
import ProductReview from '../Reviews/ProductReview';

const Singleproduct = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState(null);
  const [quantity, setQuantity] = useState();

  const { user } = useSelector((state) => state.User);
  
  const { id } = useParams();

  console.log(products);
  
  useEffect(() => {
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
    
    FetchProducts();
  }, [id,]);

    const handleAddToCart = useCallback(() => {
      const newItem = {
        id: products.id,
        name: products.title,
        image: products.thumbnail,
        price: products.price,
        quantity: 1,
      };
      
      if (!user) {
        const existingCart = JSON.parse(localStorage.getItem("Cartitem")) || [];
        const updatedCart = [...existingCart, newItem];
        localStorage.setItem("Cartitem", JSON.stringify(updatedCart));
        console.log("Guest cart updated:", updatedCart);
        return;
      } else {
        // dispatch(AddToCart({ product, id, newItem.quantity }));
        console.log("User logged in, product added via backend:", products.id, user._id, quantity);
      }
    }, [products, user, quantity]);

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
          <input type="number" min="1" defaultValue={1} onChange={(e)=>{setQuantity(e.target.value)}} className='w-20 px-3 py-2 border rounded-md focus:ring focus:ring-blue-200'/>
        </div>

        <button className='bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-md shadow transition' onClick={handleAddToCart}>Add to Cart</button>

        <div className='text-gray-700'><span className='font-medium'>Standard</span></div>
        <div className='text-gray-700'><span className='font-medium'>Sent via courier</span></div>

      </div>
      </section>
      <Explores/>
      <Bestseller />
      <ProductReview Id={id} />
    </>
  );
}

export default Singleproduct