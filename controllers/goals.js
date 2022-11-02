const asyncHandler = require("express-async-handler");
const Goal = require("../models/goalModel");
const User = require("../models/userModel");

// @DESC    ->  Get goals
// METHOD   ->  GET /api/goals
// ACCESS   ->  Private
const getGoals = asyncHandler(async (req, res) => {
  try {
    // const result = await Goal.find(); //This will fetch all goals

    // We can access the user because in our model we have ref to the user. So here we find a goal where the user matches the req.user.id(logged in user). We have access to req.user.id or the logged in user because of the protect middleware
    const result = await Goal.find({ user: req.user.id });

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
    // We are creating a goal and setting the author of the goal as the logged in user which comes from protect middleware
    const result = await Goal.create({
      text: req.body.text,
      user: req.user.id,
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
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("No goal id passed");
  }

  // B4 we update we verify that the logged in user owns this goal
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  // remember that the goal model has the user objectId field. We check to see if it is equal to the logged in user id using the user variable above
  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
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
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  // B4 we update we verify that the logged in user owns this goal
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  // remember that the goal model has the user objectId field. We check to see if it is equal to the logged in user id using the user variable above
  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await goal.remove();

  // Made modification here. req.params.id
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getGoals,
  setGoals,
  updateGoal,
  deleteGoal,
};
