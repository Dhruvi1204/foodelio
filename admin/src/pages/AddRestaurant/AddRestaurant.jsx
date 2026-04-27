import React, { useState } from "react";
import "./AddRestaurant.css";
import axios from "axios";

const AddRestaurant = () => {

  const url = "http://localhost:4000";

  const [data, setData] = useState({
    name: "",
    rating: "",
    deliveryTime: "",
    cuisine: "",
    address: ""   // 🔥 ADDED
  });

  const [image, setImage] = useState(null);

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("rating", data.rating);
      formData.append("deliveryTime", data.deliveryTime);
      formData.append("cuisine", data.cuisine);
      formData.append("address", data.address); // 🔥 ADDED
      formData.append("image", image);

      const res = await axios.post(
        `${url}/api/restaurant/add`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.success) {
        alert("Restaurant Added ✅");

        setData({
          name: "",
          rating: "",
          deliveryTime: "",
          cuisine: "",
          address: "" // 🔥 reset
        });

        setImage(null);
      } else {
        alert(res.data.message);
      }

    } catch (error) {
      console.log(error);
      alert("Error adding restaurant ❌");
    }
  };

  return (
    <div className="add-restaurant">
      <div className="form-container">
        <h2>Add Restaurant</h2>

        <form onSubmit={onSubmitHandler}>

          <input
            type="text"
            name="name"
            placeholder="Restaurant Name"
            value={data.name}
            onChange={onChangeHandler}
            required
          />

          <input
            type="text"
            name="rating"
            placeholder="Rating (4.5)"
            value={data.rating}
            onChange={onChangeHandler}
            required
          />

          <input
            type="text"
            name="deliveryTime"
            placeholder="Delivery Time (25-30 mins)"
            value={data.deliveryTime}
            onChange={onChangeHandler}
            required
          />

          <input
            type="text"
            name="cuisine"
            placeholder="Cuisine (Italian)"
            value={data.cuisine}
            onChange={onChangeHandler}
            required
          />

          {/* 🔥 NEW FIELD */}
          <input
            type="text"
            name="address"
            placeholder="Address (e.g. MG Road, Ahmedabad)"
            value={data.address}
            onChange={onChangeHandler}
            required
          />

          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />

          <button type="submit">Add Restaurant</button>

        </form>
      </div>
    </div>
  );
};

export default AddRestaurant;