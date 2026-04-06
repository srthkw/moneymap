import React, {useContext} from 'react'
import SummaryCards from '../components/SummaryCards'
import TransactionList from '../components/TransactionList'
import {AppContext} from '../context/AppContext'
import Navbar from '../components/Navbar'

const Dashboard = () => {

  const { theme } = useContext(AppContext);

  return (
    <div className={`${theme == "light" ? "" : "bg-gray-900"} min-h-screen`}>
      <Navbar />
    <div className='flex justify-center'>
      <SummaryCards />
    </div>

      <div className='mt-8 flex justify-center'>
      <TransactionList />
      </div>
    </div>
  )
}

export default Dashboard
