const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const PORT = process.env.PORT || 5000;

// Local imports
const GoalRoutes = require("./routes/GoalRoutes");
const { errorHandler } = require("./middlewares/errorMiddleware");

// Initialize app
const app = express();

// Connect to Mongo DB

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(errorHandler);

// Routes
app.use("/api/goals", GoalRoutes);

// Listening
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
