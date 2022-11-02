const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const colors = require("colors");
const PORT = process.env.PORT || 5000;

// Local imports
const GoalRoutes = require("./routes/GoalRoutes");
const userRoutes = require("./routes/userRoutes");
const { errorHandler } = require("./middlewares/errorMiddleware");
const connectDB = require("./config/db");

// Initialize app
const app = express();
connectDB();

// Connect to Mongo DB

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(errorHandler);

// Routes
app.use("/api/goals", GoalRoutes);
app.use("/api/users", userRoutes);

// Listening
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
