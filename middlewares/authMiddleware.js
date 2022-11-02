const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

// So what are we doing here. First of all this is a middleware. That means it will be exectued first b4 any endpoint where specified

// The goal is to protect our routes such as /getMe  create update delete routes. Only logged in user can do this.

const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Now authorization are normally passed in the headers of the request. So we need to check if there is authorization and that it starts with Bearer

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header. The format is Bearer <token>. Se we need to split it to form an array and select the token
      token = req.headers.authorization.split(" ")[1];

      // Now after getting the token we verify its valid
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      //remember that the token has the user id as payload. That means we can get the user who has the token. -password coz we don't want it back
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = protect;
