import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import { FaTachometerAlt, FaPlus, FaList, FaBox, FaStore } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="sidebar">

      <h3 className="sidebar-title">Admin Panel</h3>

      <NavLink to="/" className="sidebar-item">
        <FaTachometerAlt /> Dashboard
      </NavLink>

      <NavLink to="/add" className="sidebar-item">
        <FaPlus /> Add Items
      </NavLink>

      <NavLink to="/list" className="sidebar-item">
        <FaList /> List Items
      </NavLink>

      <NavLink to="/orders" className="sidebar-item">
        <FaBox /> Orders
      </NavLink>

      <NavLink to="/add-restaurant" className="sidebar-item">
        <FaStore /> Add Restaurant
      </NavLink>

    </div>
  );
};

export default Sidebar;