const express = require("express");
const {
  getGoals,
  setGoals,
  updateGoal,
  deleteGoal,
} = require("../controllers/goals");
const router = express.Router();

const protect = require("../middlewares/authMiddleware");

// You can see everyone's goal. But when you add protect middleware you see the ones associated by your id

router.get("/", protect, getGoals);

router.post("/", protect, setGoals);

router.put("/:id", protect, updateGoal);

router.delete("/:id", protect, deleteGoal);

module.exports = router;
