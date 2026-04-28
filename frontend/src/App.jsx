import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import Verify from './pages/Verify/Verify'
import MyOrders from './pages/MyOrders/MyOrders'
import FoodDetails from "./pages/FoodDetails/FoodDetails"
import Chatbot from "./components/Chatbot/Chatbot";

// ✅ ADD THIS
import RestaurantPage from "./pages/RestaurantPage/RestaurantPage"

const App = () => {

  const [showLogin,setShowLogin] = useState(false)

  return (
    <>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin}/> : <></>}

      <div className='app'>

        <Navbar setShowLogin={setShowLogin}/>

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path='/verify' element={<Verify/>}/>
          <Route path='/myorders' element={<MyOrders/>}/>
          
          <Route path="/food/:id" element={<FoodDetails/>}/>

          {/* ✅ ADD THIS */}
          <Route path="/restaurant/:id" element={<RestaurantPage />} />
          

        </Routes>

      </div>
      <Chatbot />
      <Footer />
    </>
  )
}

export default App