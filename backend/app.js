const express = require('express');
const app = express();
const cors = require("cors");

app.use(cors());

require('dotenv').config();
const PORT = process.env.PORT;

require('./connections/conn');

app.use(express.json());

// routes
const User = require('./routes/user.route');
app.use("/api/v1", User)

const Books = require('./routes/book.route');
app.use("/api/v1", Books)

const Favourite = require('./routes/favourite.route');
app.use("/api/v1", Favourite);

const Cart = require('./routes/cart.route');
app.use("/api/v1", Cart);

const Order = require('./routes/order.route');
app.use("/api/v1", Order);

app.get('/', (req, res) => {
    res.send("HOME");
});

app.listen(PORT, () => {
    console.log("Server running! at", PORT)
})