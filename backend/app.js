const express = require('express');
const app = express();

require('dotenv').config();
const PORT = process.env.PORT;

require('./connections/conn');

const user = require('./routes/user.route');
app.use(express.json());

// routes
app.use("/api/v1", user)

app.get('/', (req, res) => {
    res.send("HOME");
});

app.listen(PORT, () => {
    console.log("Server running! at", PORT)
})