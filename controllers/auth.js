// External Libraries
import jwt from "jsonwebtoken";

// Internal Imports
import { ErrorResponse } from "../util/errorRespone.js";
import { Admin } from "../models/admin.js";
import User from "../models/user.js";
import errorMessages from "../util/errorMessages.js";

// Auth-related logic
export const postLogin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse("Please enter email and password", 400));
  }

  //   if logged in user is Admin
  const isAdmin = await Admin.findOne({ email }).select("+password");
  if (isAdmin) {
    const match = await isAdmin.comparePassword(password);
    if (!match) {
      return next(
        new ErrorResponse("Please enter correct email and password", 401)
      );
    }
    const token = jwt.sign(
      { data: { userId: isAdmin._id, email: isAdmin.email, isAdmin: true } },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRY }
    );
    return res.status(200).json({ success: true, token });
  } else {
    const isUser = await User.findOne({ email }).select("+password");
    if (!isUser) {
      return next(
        new ErrorResponse("This email address is not associated with any user!")
      );
    }
    const match = await isUser.comparePassword(password);
    if (!match) {
      return next(
        new ErrorResponse("Please enter correct email and password", 401)
      );
    }
    const token = jwt.sign(
      { data: { userId: isUser._id, email: isUser.email, isUser: true } },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRY }
    );
    return res.status(200).json({ success: true, token });
  }
};

export const postSignUp = async (req, res, next) => {
  try {
    const user = new User({ ...req.body });
    await user.save();
    res.status(201).json({
      success: true,
      message: "user creation successfull.",
      userId: user._id,
    });
  } catch (error) {
    const messages = errorMessages(error);
    next(new ErrorResponse(messages, 500));
  }
};
