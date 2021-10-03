"use strict";

// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Dependencies */
/* Middleware*/
const cors = require("cors");

//Here we are configuring express to use body-parser as middle-ware.
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static("public"));

// Setting up port
const port = process.env.PORT || 3000;

// Spin up the server
const listening = () => {
  console.log(`Server is running at localhost:${port}`);
};

const server = app.listen(port, listening);

// Send data (callback function)
const sendData = (req, res) => {
  res.send(projectData);
};

// Save data (callback function)
const saveData = (req, res) => {
  projectData = {
    temp: req.body.temp,
    date: req.body.date,
    userResponse: req.body.userResponse,
    weather: req.body.weather,
    city: req.body.city,
  };

  res.send({ msg: "Post Saved Successfully" });
};

// Get Route
app.get("/all", sendData);
// Post Route
app.post("/add", saveData);
