import orderModel from "../models/orderModel.js";
import foodModel from "../models/foodModel.js";
import restaurantModel from "../models/restaurantModel.js";
import userModel from "../models/userModel.js";

export const getDashboardStats = async (req, res) => {
  try {
    const totalOrders = await orderModel.countDocuments();
    const totalUsers = await userModel.countDocuments();
    const totalFoods = await foodModel.countDocuments();
    const totalRestaurants = await restaurantModel.countDocuments();

    const orders = await orderModel.find();

    const totalRevenue = orders.reduce((sum, order) => {
      return sum + order.amount;
    }, 0);

    res.json({
      success: true,
      data: {
        totalOrders,
        totalUsers,
        totalFoods,
        totalRestaurants,
        totalRevenue
      }
    });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error fetching stats" });
  }

  
};

export const getRecentOrders = async (req, res) => {
  try {
    const orders = await orderModel
      .find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("userId", "name");

    res.json({
      success: true,
      data: orders
    });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error fetching orders" });
  }
};