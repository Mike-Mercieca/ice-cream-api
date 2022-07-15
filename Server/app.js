const express = require("express");

// Create an Express app
const app = express();

// Set up a route
app.get("/", (req, res) => {
    res.send("Welcome to the Ice Cream API!");
})

module.exports = app;