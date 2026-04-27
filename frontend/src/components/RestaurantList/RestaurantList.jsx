import React, { useEffect, useState, useContext } from "react";
import "./RestaurantList.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const RestaurantList = () => {

  const [data, setData] = useState([]);
  const { url } = useContext(StoreContext);
  const navigate = useNavigate();

  const fetchData = async () => {
    const res = await axios.get(`${url}/api/restaurant/list`);
    setData(res.data.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="restaurant-section">

      <h2>Top Restaurants Near You</h2>

      <div className="restaurant-list">

        {data.map((item) => (

          <div
            key={item._id}
            className="restaurant-card"
            onClick={() => navigate(`/restaurant/${item._id}`)}
          >
<div className="restaurant-card">
  <img src={`${url}/uploads/${item.image}`} alt="" />

  <div style={{ padding: "10px" }}>
    <h3>{item.name}</h3>
    <p>⭐ {item.rating} • {item.deliveryTime} mins</p>
    <p>{item.cuisine}</p>
  </div>
</div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default RestaurantList;