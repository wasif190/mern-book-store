const router = require('express').Router();
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {authenticateToken} = require("./userAuth");

// Sign up
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

        const hashPass = await bcrypt.hash(password, 10);

        const newUser = new User ({
            username,
            email,
            password: hashPass,
            address
        });

        await newUser.save();
        return res.status(200).json({ message: "signup successfuly" })
    } catch (error) {
        res.status(500).json({message: "Internal server error"});
    }
});

// sign In
router.post('/sign-in', async(req, res) => {
    try {
        const {username, password} = req.body;

        const existingUser = await User.findOne({username});
        
        if (!existingUser) {
            res.status(400).json({message: "Invalid crediantials"})
        }

        await bcrypt.compare(password, existingUser.password, (err, data) => {
            if (data) {
                const authClaims = [
                    {name: existingUser.username},
                    {role: existingUser.role}
                ];

                const token = jwt.sign({authClaims}, "bookStore123", {expiresIn: "30d"});

                res.status(200).json({id: existingUser._id, role: existingUser.role, token: token})
            } else {
                res.status(400).json({message: "Invalid crediantials!"})
            }
        })
    } catch (error) {
        res.status(500).json("Internal server error")
    }
})

// get user info : router.get("/route", token, next())
router.get("/get-user-info", authenticateToken, async(req, res) => {
    try {
        const {id} = req.headers;
        const data = await User.findById(id).select('-password');
        return res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: "Internal server error "})
    }
})

// update address
router.put("/update-address", authenticateToken, async(req, res) => {
    try {
        const {id} = req.headers;
        const {address} = req.body;

        await User.findByIdAndUpdate(id, {address: address});

        return res.status(200).json({message: "address updated successfuly"})
    } catch (error) {
        res.status(500).json({ message: "Internal server error "})
    }
})


module.exports = router