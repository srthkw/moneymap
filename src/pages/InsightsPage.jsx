import React from 'react'
import Navbar from '../components/Navbar'
import Insights from '../components/Insights'
import CategoryPieChart from '../components/CategoryPieChart'
import BalanceLineChart from '../components/BalanceLineChart'
import { AppContext } from "../context/AppContext";

const InsightsPage = () => {
      const { theme } = React.useContext(AppContext);
  return (
    <div className={`min-h-screen ${theme === "light" ? "" : "bg-gray-900"}`}>
      <Navbar />
        <CategoryPieChart />
        <BalanceLineChart />
        <Insights />
    </div>
  )
}

export default InsightsPage
