import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({

    name: { type: String, required: true },

    description: { type: String, required: true },

    price: { type: Number, required: true },

    category: { type: String, required: true },

    image: { type: String, required: true },

    type: { type: String, enum: ["veg","nonveg"], default: "veg" },

    ingredients: { type: [String], default: [] },

    // ✅ NEW FIELD (IMPORTANT)
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "restaurant",
        required: false   // keep false for now (safe)
    }

})

const foodModel = mongoose.models.food || mongoose.model("food",foodSchema)

export default foodModel