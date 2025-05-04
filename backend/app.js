const express = require('express');
const app = express();

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

app.get('/', (req, res) => {
    res.send("HOME");
});

app.listen(PORT, () => {
    console.log("Server running! at", PORT)
})