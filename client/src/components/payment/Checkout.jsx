import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from "react-redux";

const Checkout = () => {

    const { user } = useSelector((state) => state.User);

    const address = user?.addresses?.[0];

    return (
      <div className="bg-gray-100 min-h-screen p-4 flex flex-col gap-4">
        <div className=" bg-white p-4 shadow">
          <button className=" w-full h-9 text-center bg-yellow-100 border-1 border-yellow-300 rounded-3xl">
            Use this payment method
          </button>
          <ul className="p-2 mt-2 space-y-2 text-sm">
            <li className=" flex justify-between items-center">
              <span>Items :</span> <span>---</span>
            </li>
            <li className=" flex justify-between items-center">
              <span>Delivery :</span> <span>---</span>
            </li>
            <li className=" flex justify-between items-center">
              <span>savings :</span> <span>---</span>
            </li>
            <li className=" flex justify-between items-center">
              <span>free delivery :</span> <span>---</span>
            </li>
            <li className=" flex justify-between items-center">
              <span>Free Delivery :</span> <span>---</span>
            </li>
            <li className=" flex justify-between items-center">
              <span>Order Total :</span> <span>$ total amount</span>
            </li>
          </ul>
        </div>

        <div className="bg-white p-4 shadow">
          <h2 className="font-semibold text-lg mb-1">
            Delivering to {user?.Firstname} {user?.Lastname}
          </h2>
          <p className="text-gray-600">
            {address.House}, {address.Street}, {address.City}, {address.State},
            {address.Country} - {address.Zip}
          </p>
        </div>

        <div className="bg-white p-4 shadow">
            <h2 className=" font-semibold text-lg">Payment Method</h2>
            
            <div className=' border-2 border-gray-300 rounded-lg p-2 mx-2'>
            <div>
                <input type="radio" name="payment" id="card" className='mr-2'/>
                <label htmlFor="card">Credit Card</label>
                
                <input type="radio" name="payment" id="card" className='mr-2'/>
                <label htmlFor="card">Debit / ATM Card</label>
            </div>
                
            <div>                        
                <input type="radio" name="payment" id="cod" className='mr-2'/>
                <label htmlFor="cod">Net banking</label>
                <input type="radio" name="payment" id="cod" className='mr-2'/>
                <label htmlFor="cod">Cash on Delivery</label>
                <input type="radio" name="payment" id="cod" className='mr-2'/>
                <label htmlFor="cod">Cash on Delivery</label>
                <input type="radio" name="payment" id="cod" className='mr-2'/>
                <label htmlFor="cod">Cash on Delivery</label>
                <input type="radio" name="payment" id="cod" className='mr-2'/>
                <label htmlFor="cod">Cash on Delivery</label>
            </div>
            </div>
        </div>

        <div className="bg-white p-4 shadow">
          <h3 className="font-semibold text-lg">Review items and shipping</h3>
        </div>

        <div className="bg-white p-4 shadow">
          <h3 className="font-semibold text-lg mb-2">Place Order</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis vitae
            nobis ut necessitatibus illo debitis sit, itaque eaque commodi
            aspernatur atque molestiae, placeat, quaerat id excepturi iste
            voluptatibus vel. Quis doloremque inventore eaque facere, commodi
            delectus doloribus fugit reiciendis non sint autem dicta assumenda
            dolorum distinctio molestiae nesciunt harum quas dolores sit dolorem
            laboriosam. Minus sunt consequuntur laboriosam incidunt. Tenetur hic
            officiis veritatis, sed velit dolor. Maiores, sed! Nemo neque nisi
            quibusdam reiciendis eum voluptates exercitationem, repudiandae
            provident animi officia!
          </p>
          <Link to="" className='inline-block mt-4 text-blue-600 hover:underline text-sm'>Back to Cart</Link>
        </div>
      </div>
    );
}

export default Checkout