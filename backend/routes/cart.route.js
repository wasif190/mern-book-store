const router = require("express").Router();
const User = require("../models/user.model");
const {authenticateToken} = require("./userAuth");

// put book to cart
// add to cart
router.put("/add-to-cart", authenticateToken, async (req, res) => {
    try {
        const { bookid, id } = req.headers;
        const userData = await User.findById(id);
        const isBookinCart = userData.cart.includes(bookid);

        if (isBookinCart) {
            return res.json({
                status: "Success",
                message: "Book is already in cart"
            })
        }

        await User.findByIdAndUpdate(id, {
            $push: { cart: bookid }
        });

        return  res.json({
            status: "Success",
            message: "Book added to cart"
        });
    } catch (error) {
        console.log("Getting error while add to cart", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
})

// remove from cart
router.put("/remove-from-cart/:bookid", authenticateToken, async(req, res) => {
    try {
        const { bookid } = req.params;
        const {id} = req.headers;

        await User.findByIdAndUpdate(id, {
            $pull: {cart: bookid}
        })

        return res.json({
            status: "Sucess",
            message: "Book removed from cart"
        });
    } catch (error) {
        console.log("Getting error while removing from cart", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

// get cart of a particular user
router.get("/get-user-cart", authenticateToken, async (req, res) => {
    try {
        const {id} = req.headers;
        const userData = await User.findById(id).populate("cart");
        const cart = userData.cart.reverse();

        return res.json({
            status: "Success",
            data: cart
        })
    } catch (error) {
        console.log("Getting error while removing from cart", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
})




module.exports = router;