const express = require('express');
const app = express();

require('dotenv').config();
const PORT = process.env.PORT;

require('./connections/conn');

app.get('/', (req, res) => {
    res.send("HOME");
});

app.get('/about', (req, res) => {
    res.send("ABOUT")
})

app.listen(PORT, () => {
    console.log("Server running! at", PORT)
})