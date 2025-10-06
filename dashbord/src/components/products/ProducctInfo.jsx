import React,{useEffect} from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router';

import { getallproduct } from "../../redux-toolkit/Slice/ProductSlice";

import { TiArrowBackOutline } from "react-icons/ti";
import Banner from '../Banner'

const ProducctInfo = () => {

  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.Product);

  const { _id }= useParams();;

  const singleproduct = product.filter((item) => item._id === _id);

  const {Image, Category, Description, Title, price, Quntity } = singleproduct[0];

    useEffect(() => {
          dispatch(getallproduct());
      },[dispatch]);
  
  return (
    <>
      <Banner page={"Product Info"} />
      <section className="w-[96%] h-auto flex justify-between mx-auto mt-2 p-2 bg-white rounded-md">
        <div className="w-1/2 h-auto p-2">
          <h2 className="my-2">Product Gallery</h2>
          <div className="w-full h-[50vh] my-4 border-2 border-dashed border-gray-400">
            <img src={Image} alt="product-main-img" />
          </div>
          <div className="flex gap-4 pl-6">
            <img
              src=""
              alt="product-img1"
              className="w-20 h-20 border-2 border-dashed border-gray-300"
            />
            <img
              src=""
              alt="product-img2"
              className="w-20 h-20 border-2 border-dashed border-gray-300"
            />
            <img
              src=""
              alt="product-img3"
              className="w-20 h-20 border-2 border-dashed border-gray-300"
            />
            <img
              src=""
              alt="product-img4"
              className="w-20 h-20 border-2 border-dashed border-gray-300"
            />
          </div>
        </div>
        <div className="w-1/2 p-2">
          <h2 className="my-2 \">Product Details</h2>
          <div>
            <h3 className="text-3xl font-semibold my-4"> { Title } </h3>
            <div className='my-4'>
            <span className='w-1/2 flex justify-between'>
                <h2 className='font-medium'>Rs. {price}</h2>
            <h2 className='text-gray-300 font-medium'>Rs. 1,390.00</h2>
            </span>
            <h5 className="text-sm font-light">MRP is inclusive of all taxes.</h5>
            </div>
            <div className='my-4'>
              <span>QTY :</span> <span className='font-medium'>{ Quntity }</span>
            </div>
            <div className='flex gap-2'>
              <span>Category : </span>
              <p className='font-medium'>{Category}</p>
            </div>
            <div className='flex gap-3 my-4'>
              <span>Size : </span>
              <span>50ml</span>
              <span>20ml</span>
            </div>
          </div>
        </div>
      </section>
      <div className="w-[96%] bg-white mx-auto mt-2 p-2 rounded-md">
        <div className='my-2'>
          <h3 className='text-2xl font-medium'>Product Description</h3>
          <p className='text-lg'> {Description} </p>
        </div>
        <div className='my-2'>
          <h4 className='text-xl font-medium'>Rating Analytics</h4>
          <div>
            <span>5 Star</span>1<span>22</span>
          </div>
          <div>
            <span>4 Star</span>2<span>19</span>
          </div>
          <div>
            <span>3 Star</span>3<span>10</span>
          </div>
          <div>
            <span>2 Star</span>4<span>15</span>
          </div>
          <div>
            <span>1 Star</span>5<span>2</span>
          </div>
        </div>
        <div className='my-2'>
          <h3 className='text-xl font-semibold'>Customer_Reviews</h3>
          <div className="bg-gray-200 my-2 p-2 rounded-md">
            <div className="flex justify-between px-2">
              <div className="flex">
                <div>
                  <img src="" alt="user-name" />
                </div>
                <div>
                  <h3>user name</h3>
                  <h6> minutes ago!</h6>
                </div>
              </div>
              <div>
                <button className="flex items-center gap-2 bg-blue-500 text-xl text-white font-medium p-2 rounded-xl">
                  <TiArrowBackOutline /> Reply
                </button>
              </div>
            </div>
            <div className="flex gap-2">
              <span>1</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
              <span>5</span>
            </div>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis
              fugit eaque, enim illum illo nisi iste repellendus adipisci et
              obcaecati accusamus facilis aperiam tempore est a possimus sed
              quam doloremque sequi blanditiis quos veritatis libero non sunt.
              Molestias, architecto quos.
            </p>
          </div>
          <div className="bg-gray-200 my-2 p-2 rounded-md">
            <div className="flex justify-between px-2">
              <div className="flex">
                <div>
                  <img src="" alt="user-name" />
                </div>
                <div>
                  <h3>user name</h3>
                  <h6> minutes ago!</h6>
                </div>
              </div>
              <div>
                <button className="flex items-center gap-2 bg-blue-500 text-xl text-white font-medium p-2 rounded-xl">
                  <TiArrowBackOutline /> Reply
                </button>
              </div>
            </div>
            <div className="flex gap-2">
              <span>1</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
              <span>5</span>
            </div>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis
              fugit eaque, enim illum illo nisi iste repellendus adipisci et
              obcaecati accusamus facilis aperiam tempore est a possimus sed
              quam doloremque sequi blanditiis quos veritatis libero non sunt.
              Molestias, architecto quos.
            </p>
          </div>
          <div className="bg-gray-200 my-2 p-2 rounded-md">
            <div className="flex justify-between px-2">
              <div className="flex">
                <div>
                  <img src="" alt="user-name" />
                </div>
                <div>
                  <h3>user name</h3>
                  <h6> minutes ago!</h6>
                </div>
              </div>
              <div>
                <button className="flex items-center gap-2 bg-blue-500 text-xl text-white font-medium p-2 rounded-xl">
                  <TiArrowBackOutline /> Reply
                </button>
              </div>
            </div>
            <div className="flex gap-2">
              <span>1</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
              <span>5</span>
            </div>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis
              fugit eaque, enim illum illo nisi iste repellendus adipisci et
              obcaecati accusamus facilis aperiam tempore est a possimus sed
              quam doloremque sequi blanditiis quos veritatis libero non sunt.
              Molestias, architecto quos.
            </p>
          </div>
          <div className="bg-gray-200 my-2 p-2 rounded-md">
            <div className="flex justify-between px-2">
              <div className="flex">
                <div>
                  <img src="" alt="user-name" />
                </div>
                <div>
                  <h3>user name</h3>
                  <h6> minutes ago!</h6>
                </div>
              </div>
              <div>
                <button className="flex items-center gap-2 bg-blue-500 text-xl text-white font-medium p-2 rounded-xl">
                  <TiArrowBackOutline /> Reply
                </button>
              </div>
            </div>
            <div className="flex gap-2">
              <span>1</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
              <span>5</span>
            </div>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis
              fugit eaque, enim illum illo nisi iste repellendus adipisci et
              obcaecati accusamus facilis aperiam tempore est a possimus sed
              quam doloremque sequi blanditiis quos veritatis libero non sunt.
              Molestias, architecto quos.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProducctInfo