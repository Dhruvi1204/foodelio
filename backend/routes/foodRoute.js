import express from 'express'
import { 
  addFood, 
  listFood, 
  removeFood, 
  getSingleFood,
  getFoodsByRestaurant 
} from '../controllers/foodController.js'

import multer from 'multer'

const foodRouter = express.Router();

// image storage engine
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`)
    }
})

const upload = multer({ storage: storage })

// ✅ ROUTES

foodRouter.post("/add", upload.single("image"), addFood)
foodRouter.get("/list", listFood)
foodRouter.post("/remove", removeFood)

// ✅ ADD THIS HERE (BEFORE :id)
foodRouter.get("/by-restaurant/:id", getFoodsByRestaurant)

// ❗ ALWAYS KEEP THIS LAST
foodRouter.get("/:id", getSingleFood)

export default foodRouter