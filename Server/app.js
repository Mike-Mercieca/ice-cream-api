const express = require("express");
const data = require("./data");


// Create an Express app
const app = express();

// Set up a route
app.get("/", (req, res) => {
    res.send("Welcome to the Ice Cream API!");
})

app.get("/flavours", (req, res) => {
    let flavours = data;
    // Filter vegan only
    if (req.query.vegan) {
        flavours = flavours.filter(f =>f ["vegan"]);
    }
    
    
    res.json({
        flavours: flavours.map(f => f["flavour"])
    })
})

app.get("/flavours/:id", (req, res) => {
    //Extract the parameter from the URL
    const id = req.params.id
    
    //Filter the data for the ice cream with that ID
    const filteredData = data.filter(f => f["id"] == id);

    if (filteredData.length ==1) {

        // Send the first filtered result
            res.json({
            flavour: filteredData [0]
        }) 
    // If there is an error
    } else {
            res.status(404).json({
                error: "No such ice cream"
            })
        }

    })

module.exports = app;