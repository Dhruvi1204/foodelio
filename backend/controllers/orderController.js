import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// placing user order
const placeOrder = async (req, res) => {

    const frontend_url = "http://localhost:5173";

    try {

        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        });

        await newOrder.save();

        // clear cart
        await userModel.findByIdAndUpdate(
            req.body.userId,
            { cartData: {} }
        );

        // Stripe line items
        let line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name
                },
                unit_amount: Math.round(item.price * 100)
            },
            quantity: item.quantity
        }));

        // delivery charges
        line_items.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: 200   // ₹2 delivery
            },
            quantity: 1
        });

        // Calculate total order amount
        let totalAmount = req.body.amount + 2;

        // Stripe minimum charge fix (₹50 minimum)
        if (totalAmount < 50) {
            line_items.push({
                price_data: {
                    currency: "inr",
                    product_data: {
                        name: "Minimum Order Adjustment"
                    },
                    unit_amount: (50 - totalAmount) * 100
                },
                quantity: 1
            });
        }

        // ✅ Stripe checkout session (FIXED)
        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: "payment",

            // 🔥 ENABLE UPI + CARD
            payment_method_types: ["card", "upi"],

            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        });

        res.json({
            success: true,
            session_url: session.url
        });

    }
    catch (error) {

        console.log("Stripe Error:", error.message);

        res.json({
            success: false,
            message: "Order Failed"
        });

    }
};


// verify payment
const verifyOrder = async (req, res) => {

    const { orderId, success } = req.body;

    try {

        if (success) {

            await orderModel.findByIdAndUpdate(orderId, { payment: true });

            res.json({
                success: true,
                message: "Paid"
            });

        } else {

            await orderModel.findByIdAndDelete(orderId);

            res.json({
                success: false,
                message: "Not Paid"
            });

        }

    }
    catch (error) {

        console.log(error);

        res.json({
            success: false,
            message: "error"
        });

    }
};


// user orders
const usersOrder = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.userId })
        res.json({ success: true, data: orders })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}


// admin orders
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, data: orders })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}


// update status
const updateStatus = async (req, res) => {
    try {

        const updatedOrder = await orderModel.findByIdAndUpdate(
            req.body.orderId,
            { status: req.body.status },
            { new: true }
        )

        res.json({
            success: true,
            message: "Status updated",
            order: updatedOrder
        })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

export { placeOrder, verifyOrder, usersOrder, listOrders, updateStatus };