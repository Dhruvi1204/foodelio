import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import {Route, Routes} from 'react-router-dom'
import List from './pages/List/List'
import Order from './pages/Orders/Order'
import Add from './pages/Add/Add'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddRestaurant from "./pages/AddRestaurant/AddRestaurant";
import Dashboard from "./pages/Dashboard/Dashboard";


import "./App.css";


const App = () => {

const url = "http://localhost:4000";

return (
  <div className="app">

    <ToastContainer/>

    <Navbar/>

    <div className="app-content">

      <Sidebar/>

      <div className="main">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path='/add' element={<Add url={url}/>}/>
          <Route path='/list' element={<List url={url}/>}/>
          <Route path='/orders' element={<Order url={url}/>}/>
          <Route path="/add-restaurant" element={<AddRestaurant url={url} />} />
        </Routes>
      </div>

    </div>
  </div>
);
}

export default App
