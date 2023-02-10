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

// Check if JWT token exists and verifies it if it does
app.use((req, res, next) => {
    // Get token from header
    const token = req.header("x-auth-token");

    // check if not token
    if (!token) {
        return res.status(401).json({ msg: "No token, access denied!"});
    }

    // Verify token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({msg: "Token is not valid"});
    }
});

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