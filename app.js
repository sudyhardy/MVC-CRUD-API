const express = require("express");
const itemRoutes = require("./routes/itemRoutes");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const sanitizer = require("express-sanitizer");
const { connectDB } = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to the database
connectDB();

// Use middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(sanitizer());

// Use routes
app.use("/items", itemRoutes);

// Error handling middleware
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});