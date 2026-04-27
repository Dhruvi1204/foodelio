import restaurantModel from "../models/restaurantModel.js";

// ✅ GET ALL RESTAURANTS
const getRestaurants = async (req, res) => {
  try {
    const data = await restaurantModel.find({});
    res.json({ success: true, data });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// ✅ GET SINGLE RESTAURANT (🔥 IMPORTANT)
const getSingleRestaurant = async (req, res) => {
  try {
    const { id } = req.params;

    const restaurant = await restaurantModel.findById(id);

    if (!restaurant) {
      return res.json({
        success: false,
        message: "Restaurant not found",
      });
    }

    res.json({
      success: true,
      data: restaurant,
    });

  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// ✅ ADD RESTAURANT
const addRestaurant = async (req, res) => {
  try {

    if (!req.file) {
      return res.json({
        success: false,
        message: "Image is required",
      });
    }

    const image_filename = req.file.filename;

    const restaurant = new restaurantModel({
      name: req.body.name,
      image: image_filename,
      rating: req.body.rating,
      deliveryTime: req.body.deliveryTime,
      cuisine: req.body.cuisine,
      address: req.body.address, // 🔥 added
    });

    await restaurant.save();

    res.json({
      success: true,
      message: "Restaurant Added Successfully ✅",
    });

  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export { getRestaurants, getSingleRestaurant, addRestaurant };