const expressAsyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// @DESC    ->  create user
// METHOD   ->  POST /api/users
// ACCESS   ->  Public
const registerUser = expressAsyncHandler(async (req, res) => {
  // To register we need the name email and password from the request
  const { name, email, password } = req.body;

  // We validate that they are actually there b4 we proceed
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // Next we check if user already exists. No point in creating a user who exists. Email is unique

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // If it is a new user and they have all the data, we can start by hashing the password.
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Now we can store user in the DB
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  // We can return response to user
  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(500);
    throw new Error("Something went wrong");
  }
});

// @DESC    ->  login user
// METHOD   ->  POST /api/users/login
// ACCESS   ->  Public
const loginUser = expressAsyncHandler(async (req, res) => {
  // Remember we need the email and password to login
  const { email, password } = req.body;

  // Check for user email
  const user = await User.findOne({ email });

  // Check password now. remember its hashed. We compare req.body.password with the password we fetched from the user above

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(500);
    throw new Error("Invalid credentials");
  }
});

// @DESC    ->  Get user data user
// METHOD   ->  GET /api/users/me
// ACCESS   ->  Private
const getMe = expressAsyncHandler(async (req, res) => {
  res.send("user data");
});

// Okay now we need a jwt token when the user registers and logs in. We give it the user id who logs in
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = { registerUser, getMe, loginUser };
