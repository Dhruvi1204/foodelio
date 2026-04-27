import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./FoodDetails.css";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";

const FoodDetails = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, url } = useContext(StoreContext);

  const [food, setFood] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState("");

  const [addons, setAddons] = useState({
    cheese: false,
    spicy: "normal"
  });

  const [reviews, setReviews] = useState([
    { name: "Rahul", rating: 4, comment: "Very tasty food!" },
    { name: "Priya", rating: 5, comment: "Loved the cheese option 😍" },
    { name: "Arjun", rating: 4, comment: "Fast delivery and good taste." }
  ]);

  const [newReview, setNewReview] = useState({
    name: "",
    rating: "5",
    comment: ""
  });

  // 🔥 FETCH FOOD
  const fetchFood = async () => {
    try {
      const res = await axios.get(`${url}/api/food/${id}`);
      setFood(res.data.food);
      setMainImage(res.data.food.image); // ✅ set default image
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFood();
  }, [id]);

  // 🔥 ADDONS HANDLER
  const handleAddonChange = (e) => {
    const { name, value, type, checked } = e.target;

    setAddons((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  // 🔥 ORDER NOW
  const orderNow = () => {
    navigate("/order", {
      state: { food, quantity, addons }
    });
  };

  // 🔥 REVIEW SUBMIT
  const submitReview = () => {
    if (!newReview.name || !newReview.comment) return;

    setReviews((prev) => [...prev, newReview]);

    setNewReview({
      name: "",
      rating: "5",
      comment: ""
    });
  };

  return (
    <div className="food-details">

      {food ? (

        <>
          <div className="food-details-container">

            {/* 🔥 LEFT - IMAGE */}
            <div className="food-gallery">

              <img
                className="main-img"
                src={mainImage ? url + "/uploads/" + mainImage : ""}
                alt="food"
              />

              <div className="thumbnail-row">
                {[1, 2, 3].map((_, index) => (
                  <img
                    key={index}
                    src={url + "/uploads/" + food.image}
                    onClick={() => setMainImage(food.image)}
                    alt="thumb"
                  />
                ))}
              </div>

            </div>

            {/* 🔥 RIGHT - INFO */}
            <div className="food-info">

              <h2>{food.name}</h2>

              <p className="rating">⭐ 4.4 (120 reviews)</p>

              <p className="price">₹{food.price}</p>

              <p className="delivery">🚚 Delivery in 25-30 mins</p>

              {food.type === "veg" ? (
                <span className="veg">🟢 Veg</span>
              ) : (
                <span className="nonveg">🔴 Non-Veg</span>
              )}

              <p className="description">{food.description}</p>

              {/* INGREDIENTS */}
              <div className="ingredients">
                <h4>Ingredients</h4>
                <p>
                  {food.ingredients?.length > 0
                    ? food.ingredients.map((item, index) => (
                        <span key={index}>{item}, </span>
                      ))
                    : "No ingredients info"}
                </p>
              </div>

              {/* ADDONS */}
              <div className="addons">

                <h4>Customize Your Dish</h4>

                <label>
                  <input
                    type="checkbox"
                    name="cheese"
                    checked={addons.cheese}
                    onChange={handleAddonChange}
                  />
                  Add Extra Cheese (+₹30)
                </label>

                <div className="spice-level">
                  <p>Spice Level</p>

                  {["mild", "normal", "extra"].map((level) => (
                    <label key={level}>
                      <input
                        type="radio"
                        name="spicy"
                        value={level}
                        checked={addons.spicy === level}
                        onChange={handleAddonChange}
                      />
                      {level}
                    </label>
                  ))}

                </div>

              </div>

              {/* QUANTITY */}
              <div className="quantity">
                <button onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}>-</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>

              {/* BUTTONS */}
              <div className="buttons">
                <button
                  className="cart-btn"
                  onClick={() => addToCart(food._id, quantity)}
                >
                  Add To Cart
                </button>

                <button className="order-btn" onClick={orderNow}>
                  Order Now
                </button>
              </div>

            </div>

          </div>

          {/* 🔥 REVIEWS */}
          <div className="reviews-section">

            <h3>Customer Reviews</h3>

            {reviews.map((rev, index) => (
              <div key={index} className="review">
                <p><strong>{rev.name}</strong> ⭐{rev.rating}</p>
                <p>{rev.comment}</p>
              </div>
            ))}

            <div className="add-review">

              <h4>Leave a Review</h4>

              <input
                type="text"
                placeholder="Your name"
                value={newReview.name}
                onChange={(e) =>
                  setNewReview({ ...newReview, name: e.target.value })
                }
              />

              <select
                value={newReview.rating}
                onChange={(e) =>
                  setNewReview({ ...newReview, rating: e.target.value })
                }
              >
                {[1,2,3,4,5].map((r) => (
                  <option key={r} value={r}>
                    {"⭐".repeat(r)}
                  </option>
                ))}
              </select>

              <textarea
                placeholder="Write your review"
                value={newReview.comment}
                onChange={(e) =>
                  setNewReview({ ...newReview, comment: e.target.value })
                }
              />

              <button className="review-btn" onClick={submitReview}>
                Submit Review
              </button>

            </div>

          </div>
        </>
      ) : (
        <p style={{ textAlign: "center" }}>Loading...</p>
      )}

    </div>
  );
};

export default FoodDetails;