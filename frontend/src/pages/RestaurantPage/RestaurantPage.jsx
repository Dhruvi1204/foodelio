import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./RestaurantPage.css";
import { StoreContext } from "../../context/StoreContext";

const RestaurantPage = () => {

  const { id } = useParams();
  const { url, addToCart } = useContext(StoreContext);

  const [foods, setFoods] = useState([]);
  const [restaurant, setRestaurant] = useState({});

  // 🔥 Fetch both restaurant + foods
  const fetchData = async () => {
    try {
      const foodRes = await axios.get(`${url}/api/food/by-restaurant/${id}`);
      setFoods(foodRes.data.data);

      const resRes = await axios.get(`${url}/api/restaurant/${id}`);
      setRestaurant(resRes.data.data);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

return (
  <div className="restaurant-page">

    <div className="container">

      {/* 🔥 HEADER */}
      <div className="restaurant-header">

        <img
          className="restaurant-banner"
          src={url + "/uploads/" + restaurant.image}
          alt=""
        />

        <div className="restaurant-info">

          <h1>{restaurant.name || "Restaurant Name"}</h1>

          <p className="cuisine">
            {restaurant.cuisine || "Multi Cuisine"}
          </p>

          <p className="address">
            📍 {restaurant.address || "Address not available"}
          </p>

          <div className="restaurant-meta">
            <span className="rating">⭐ {restaurant.rating || 4.2}</span>
            <span className="time">⏱ {restaurant.deliveryTime || "30-40 mins"}</span>
          </div>

          <button className="book-btn">Book Table</button>

        </div>
      </div>

      {/* 🍽 MENU */}
      <h2 className="menu-title">Recommended</h2>

      <div className="food-list">

        {foods.length > 0 ? (
          foods.map((item) => (
            <div className="food-card" key={item._id}>

              <div className="food-left">
                <span className="veg">🟢</span>

                <h3>{item.name}</h3>

                <p className="price">₹{item.price}</p>

                <p className="desc">
                  Tasty {item.name} with rich flavors.
                </p>
              </div>

              <div className="food-right">
                <img src={url + "/uploads/" + item.image} alt="" />

                <button onClick={() => addToCart(item._id, 1)}>
                  ADD +
                </button>
              </div>

            </div>
          ))
        ) : (
          <p className="empty">No food items available</p>
        )}

      </div>

    </div>

  </div>
);
}
export default RestaurantPage;