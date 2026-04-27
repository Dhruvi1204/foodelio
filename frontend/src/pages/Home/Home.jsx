import React, { useState } from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import AppDownload from '../../components/AppDownload/AppDownload'
import Offers from "../../components/offers/Offers.jsx";

// ✅ ADD THIS
import RestaurantList from '../../components/RestaurantList/RestaurantList'

const Home = () => {

  const [category, setCategory] = useState("All");

  return (
    <div>

      <Header />

      {/* ✅ NEW SECTION (Swiggy style) */}
      <RestaurantList />

      <ExploreMenu category={category} setCategory={setCategory} />

      <FoodDisplay category={category} />

      <Offers />   {/* 👈 ADD HERE */}

      <AppDownload />

    </div>
  )
}

export default Home