const asyncHandler = require("express-async-handler");

// @DESC    ->  Get goals
// METHOD   ->  GET /api/goals
// ACCESS   ->  Private
const getGoals = asyncHandler(async (req, res) => {
  res.json({ message: "Get goals" });
});

// @DESC    ->  set goal
// METHOD   ->  POST /api/goals
// ACCESS   ->  Private
const setGoals = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add Text field");
    return;
  }

  console.log(req.body);

  res.json({ message: "Create goals" });
});

// @DESC    ->  update goal
// METHOD   ->  PUT /api/goals/:id
// ACCESS   ->  Private
const updateGoal = asyncHandler(async (req, res) => {
  res.json({ message: `Update goal ${req.params.id}` });
});

// @DESC    ->  delete goal
// METHOD   ->  DELETE /api/goals/:id
// ACCESS   ->  Private
const deleteGoal = asyncHandler(async (req, res) => {
  res.json({ message: `Delete goal ${req.params.id}` });
});

module.exports = {
  getGoals,
  setGoals,
  updateGoal,
  deleteGoal,
};
