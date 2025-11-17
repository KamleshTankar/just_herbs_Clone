import React from 'react'

import Hero from '../components/hero/Hero'
import Arrivals from '../components/newarrivals/NewArrivals'
import Edition from '../components/limitededition/LimitedEdition'
import Seller from '../components/bestseller/BestSeller'
import Month from '../components/productofmonth/ProductOfMonth'
import ExploresInfo from '../components/Explores/ExploresInfo'
import Featured from '../components/featured/Featured'
import Hanpers from '../components/gifthampers/GiftHampers'
import Testimonials from '../components/Testimonials/Testimonials'


const Home = () => {
  return (
      <>
      <Hero/>
      <Arrivals/>
      <Edition/>
      <Seller/>
      <Month/>
      <ExploresInfo/>
      <Featured/>
      <Hanpers/>
      <Testimonials />
      </>
  )
}

export default Home