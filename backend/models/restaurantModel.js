import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: true,
  },

  rating: {
    type: Number,
    required: true,
  },

  deliveryTime: {
    type: String,
    required: true,
  },

  cuisine: {
    type: String,
    required: true,
  },

  // 🔥 ADD THIS (IMPORTANT)
  address: {
    type: String,
    required: true,
  },

}, {
  timestamps: true
});

const restaurantModel =
  mongoose.models.restaurant ||
  mongoose.model("restaurant", restaurantSchema);

export default restaurantModel;