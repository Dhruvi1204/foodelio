import React, { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const PlaceOrder = () => {

  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);

  const location = useLocation();
  const directFood = location.state?.food;
  const directQuantity = location.state?.quantity || 1;

  const navigate = useNavigate();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  };

  const placeOrder = async (event) => {

    event.preventDefault();

    try {

      let orderItems = [];

      if (directFood) {

        orderItems.push({
          ...directFood,
          quantity: directQuantity
        });

      } else {

        food_list.forEach((item) => {

          if (cartItems[item._id] > 0) {

            let itemInfo = {
              ...item,
              quantity: cartItems[item._id]
            };

            orderItems.push(itemInfo);

          }

        });

      }

      const subtotal = directFood
        ? directFood.price * directQuantity
        : getTotalCartAmount();

      const totalAmount = subtotal + 40;

      let orderData = {
        address: data,
        items: orderItems,
        amount: totalAmount
      };

      const response = await axios.post(
        url + "/api/order/place",
        orderData,
        { headers: { token } }
      );

      if (response.data.success) {

        const { session_url } = response.data;
        window.location.replace(session_url);

      } else {

        alert("Order Failed");

      }

    } catch (error) {

      console.log(error);
      alert("Server Error");

    }

  };

  useEffect(() => {

    if (!token) {
      navigate("/cart");
    }

  }, [token]);

  const subtotal = directFood
    ? directFood.price * directQuantity
    : getTotalCartAmount();

  const total = subtotal + 40;

  return (

    <form onSubmit={placeOrder} className="place-order">

      {/* LEFT */}

      <div className="place-order-left">

        <p className="title">Delivery Information</p>

        <div className="multi-fields">
          <input required name="firstName" onChange={onChangeHandler} value={data.firstName} type="text" placeholder="First Name"/>
          <input required name="lastName" onChange={onChangeHandler} value={data.lastName} type="text" placeholder="Last Name"/>
        </div>

        <input required name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder="Email"/>

        <input required name="street" onChange={onChangeHandler} value={data.street} type="text" placeholder="Street"/>

        <div className="multi-fields">
          <input required name="city" onChange={onChangeHandler} value={data.city} type="text" placeholder="City"/>
          <input required name="state" onChange={onChangeHandler} value={data.state} type="text" placeholder="State"/>
        </div>

        <div className="multi-fields">
          <input required name="zipcode" onChange={onChangeHandler} value={data.zipcode} type="text" placeholder="Zipcode"/>
          <input required name="country" onChange={onChangeHandler} value={data.country} type="text" placeholder="Country"/>
        </div>

        <input required name="phone" onChange={onChangeHandler} value={data.phone} type="text" placeholder="Phone"/>

      </div>


      {/* RIGHT */}

      <div className="place-order-right">

        {directFood && (

          <div className="direct-order">

            <h3>Selected Item</h3>

            <img src={url + "/images/" + directFood.image} width="80" alt=""/>

            <p>{directFood.name}</p>

            <p>Qty : {directQuantity}</p>

            <p>₹{directFood.price} × {directQuantity}</p>

          </div>

        )}

        <div className="cart-total">

          <h2>Order Summary</h2>

          <div>

            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{subtotal}</p>
            </div>

            <hr/>

            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹40</p>
            </div>

            <hr/>

            <div className="cart-total-details">
              <b>Total</b>
              <b>₹{total}</b>
            </div>

          </div>

          <button type="submit">
            PROCEED TO PAYMENT
          </button>

        </div>

      </div>

    </form>

  );

};

export default PlaceOrder;