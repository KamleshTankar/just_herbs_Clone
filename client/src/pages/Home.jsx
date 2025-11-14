import React from 'react'

import Hero from '../components/hero/Hero'
import Arrivals from '../components/newarrivals/NewArrivals'
import Edition from '../components/limitededition/LimitedEdition'
import Seller from '../components/bestseller/BestSeller'
import Month from '../components/productofmonth/ProductOfMonth'
import Range from '../components/exploretherange/Exploretherange'
import Featured from '../components/featured/Featured'
import Hanpers from '../components/gifthampers/GiftHampers'
import Suvarna from '../components/suvarnaseries/SuvarnaSeries'


const Home = () => {
  return (
      <>
      <Hero/>
      <Arrivals/>
      <Edition/>
      <Seller/>
      <Month/>
      <Range/>
      <Featured/>
      <Hanpers/>
      <Suvarna />
      </>
  )
}

export default Home