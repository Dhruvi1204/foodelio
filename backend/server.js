import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import "dotenv/config";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import restaurantRouter from "./routes/restaurantRoute.js";
import adminRouter from "./routes/adminRoute.js";
import chatRouter from "./routes/chatRoute.js"



// app config
const app = express();
const port = 4000;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


// ✅ FIXED: serve images correctly
app.use("/uploads", express.static("uploads"));

// DB connection
connectDB();

// API endpoints
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/restaurant", restaurantRouter);
app.use("/api/admin", adminRouter);
app.use("/api/chat", chatRouter);

// test route
app.get("/", (req, res) => {
  res.send("API Working");
});

// server start
app.listen(port, () => {
  console.log(`Server Started on http://localhost:${port}`);
});