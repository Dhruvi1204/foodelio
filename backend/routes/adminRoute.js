import express from "express";
import { getDashboardStats, getRecentOrders } from "../controllers/adminController.js";

const adminRouter = express.Router();

adminRouter.get("/stats", getDashboardStats);
adminRouter.get("/recent-orders", getRecentOrders);

export default adminRouter;



