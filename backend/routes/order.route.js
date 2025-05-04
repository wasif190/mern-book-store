const router = require("express").Router();
const {authenticateToken} = require("./userAuth");
const Book = require("../models/book.model");
const Order = require("../models/order.model");

// place order
router.post("/place-order", authenticateToken, async(req, res) => {
    try {
        const {id} = req.headers;
        const {order} = req.body;

        for(const orderData of order) {
            const newOrder = new Order({user: id, book: orderData._id});
            const orderDataFromDB = await newOrder.save();

            // saving order in user model
            await User.findByIdAndUpdate(id, {
                $push: {orders: orderDataFromDB._id}
            })
        }

        return res.json({
            status: "Success",
            message: "Order placed successfully"
        });
    } catch (error) {
        console.log(error);
        res.json({message: "Getting error while placing order"})
    }
});

// get order history of particular user
router.get("/get-order-history", authenticateToken, async(req, res) => {
    try {
        const {id} = req.headers;
        const userData = await User.findById(id).populate({
            path: "orders",
            populate: {path: "book"}
        });

        const ordersData = userData.orders.reverse();

        return res.json({
            status: "Success",
            data: ordersData
        });
    } catch (error) {
        return res.json({message: "Error while geting order history"})
    }
});

// get all orders --admin
router.get("/get-all-orders", authenticateToken, async(req, res) => {
    try {
        const userData = await Order.find()
            .populate({
                path: "book"
            })
            .populate({
                path: "user"
            })
            .sort({ createdAt: -1 });

        return res.json({
            status: "Success",
            data: userData
        });
    } catch (error) {
        console.log(error);
        res.json({message: "Error while getting all order"})
    }
})

// update order --admin
router.get("/update-status/:id", authenticateToken, async(req, res) => {
    try {
        const {id} = req.params;
        await Order.findByIdAndUpdate(id, { status: req.body.status });

        return res.json({
            status: "Success",
            message: "Status updated successfully"
        });
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;