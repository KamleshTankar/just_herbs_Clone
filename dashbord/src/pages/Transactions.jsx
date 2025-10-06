import React from 'react'
import Banner from '../components/Banner'
import Transactioninfo from '../components/Transactioninfo'

const Transactions = () => {
  return (
    <div>
      <Banner page={'Transactions'} />
      <Transactioninfo/>
    </div>
  )
}

export default Transactions