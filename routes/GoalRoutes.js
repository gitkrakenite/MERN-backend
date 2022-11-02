const express = require("express");
const {
  getGoals,
  setGoals,
  updateGoal,
  deleteGoal,
} = require("../controllers/goals");
const router = express.Router();

router.get("/", getGoals);

router.post("/", setGoals);

router.put("/:id", updateGoal);

router.delete("/:id", deleteGoal);

module.exports = router;
