import React, { useContext, useState, useRef, useEffect } from "react";
import "./Navbar.css";
import { assets } from "../../assets/frontend_assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const Navbar = ({ setShowLogin }) => {

  const [menu, setMenu] = useState("Home");
  const [showSearch, setShowSearch] = useState(false);

  const searchRef = useRef();

  const { getTotalCartAmount, token, setToken, search, setSearch } = useContext(StoreContext);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  // ✅ CLOSE SEARCH WHEN CLICK OUTSIDE
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="navbar">

      {/* LOGO */}
      <Link to='/'>
        <img src={assets.logo} alt="logo" className="logo" />
      </Link>

      {/* MENU */}
      <ul className="navbar-menu">
        <Link to='/'
          className={menu === "Home" ? "active" : ""}
          onClick={() => setMenu("Home")}
        >
          Home
        </Link>

        <a href="#explore-menu"
          className={menu === "Menu" ? "active" : ""}
          onClick={() => setMenu("Menu")}
        >
          Menu
        </a>

        <a href="#app-download"
          className={menu === "Mobile-app" ? "active" : ""}
          onClick={() => setMenu("Mobile-app")}
        >
          Mobile App
        </a>

        <a href="#footer"
          className={menu === "Contact-us" ? "active" : ""}
          onClick={() => setMenu("Contact-us")}
        >
          Contact Us
        </a>
      </ul>

      {/* RIGHT SIDE */}
      <div className="navbar-right">

        {/* 🔍 SEARCH */}
        <div className="navbar-search-container" ref={searchRef}>

          <img
            src={assets.search_icon}
            alt="search"
            className="search-icon"
            onClick={() => setShowSearch(!showSearch)}
          />

          <input
            type="text"
            placeholder="Search food..."
            className={`search-input ${showSearch ? "active" : ""}`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                document
                  .getElementById("food-display")
                  ?.scrollIntoView({ behavior: "smooth" });
              }
            }}
          />

        </div>

        {/* CART */}
        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="cart" />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>

        {/* LOGIN / PROFILE */}
        {!token ? (
          <button onClick={() => setShowLogin(true)}>Sign In</button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="profile" />
            <ul className="nav-profile-dropdown">
              <li onClick={() => navigate('/myorders')}>
                <img src={assets.bag_icon} alt="" />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}

      </div>
    </div>
  );
};

export default Navbar;