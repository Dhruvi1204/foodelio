import express from "express";
import multer from "multer";
import {
  getRestaurants,
  getSingleRestaurant,
  addRestaurant
} from "../controllers/restaurantController.js";

const router = express.Router();

// ✅ MULTER SETUP
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// ✅ ROUTES
router.get("/list", getRestaurants);

// 🔥 IMPORTANT ROUTE (NEW)
router.get("/:id", getSingleRestaurant);

router.post("/add", upload.single("image"), addRestaurant);

export default router;