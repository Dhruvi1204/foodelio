import mongoose from "mongoose";

export const connectDB = async ()=>{
    await mongoose.connect('mongodb+srv://dhruvimehta1212_db:dhruvi1212mehta@cluster0.ydjamqy.mongodb.net/Foodelio').then(()=> console.log("DB connected"));
    

}