const asyncHandler = require("express-async-handler");
const Goal = require("../models/goalModel");

// @DESC    ->  Get goals
// METHOD   ->  GET /api/goals
// ACCESS   ->  Private
const getGoals = asyncHandler(async (req, res) => {
  try {
    const result = await Goal.find();
    res.status(200).json(result);
  } catch (error) {
    res.send(error);
  }
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

  try {
    const result = await Goal.create({
      text: req.body.text,
    });

    res.status(201).json(result);
  } catch (error) {
    res.send(error);
  }
});

// @DESC    ->  update goal
// METHOD   ->  PUT /api/goals/:id
// ACCESS   ->  Private
const updateGoal = asyncHandler(async (req, res) => {
  if (!req.params.id) {
    res.status(400);
    throw new Error("No goal id passed");
    return;
  }

  const result = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(result);
});

// @DESC    ->  delete goal
// METHOD   ->  DELETE /api/goals/:id
// ACCESS   ->  Private
const deleteGoal = asyncHandler(async (req, res) => {
  if (!req.params.id) {
    res.status(400);
    throw new Error("No goal id passed");
    return;
  }

  const result = await Goal.findByIdAndDelete(req.params.id);

  // Made modification here. req.params.id
  res.status(200).json(result._id);
});

module.exports = {
  getGoals,
  setGoals,
  updateGoal,
  deleteGoal,
};
