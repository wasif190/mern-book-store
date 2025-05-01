const router = require('express').Router();
const User = require('../models/user.model');

// Sign In
router.post('/sign-up', async(req, res) => {
    try {
        const {username, email, password, address } = req.body;

        if (username.length < 4) {
            return res.status(400).json({message: "Username length should be greater than 3"});
        }

        const existingUserName = await User.findOne({ username: username });

        if (existingUserName) {
            return res
                .status(400)
                .json({message: "Username already exist"});
        }

        const existingEmail = await User.findOne({ email: email });

        if (existingEmail) {
            return res
                .status(400)
                .json({message: "email already exist"});
        }

        if (password.length <= 5) {
            return res
                .status(400)
                .json({message: "password length should be greater than 5"});
        }

        const newUser = new User ({
            username,
            email,
            password,
            address
        });

        await newUser.save();
        return res.status(200).json({ message: "signup successfuly" })
    } catch (error) {
        res.status(500).json({message: "Internal server error"});
    }
})


module.exports = router