const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/mvc-app", {
    useNewUrlParser: true,
    useUnifiedTopology: true   
});

// Parse incoming request body in a middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Require the controllers
const ItemController = require("./controllers/itemController");

// Define the routes
app.get("items", ItemController.index);
app.post("/items", ItemController.create);
app.get("/items/:id", ItemController.show);
app.put("/items/:id", ItemController.update);
app.delete("/items/:id", ItemController.delete);

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});