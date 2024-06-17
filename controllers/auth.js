// External Libraries
import jwt from "jsonwebtoken";

// Internal Imports
import { ErrorResponse } from "../util/errorRespone.js";
import { Admin } from "../models/admin.js";

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
      { data: { userId: isAdmin._id, email: isAdmin.email } },
      process.env.JWT_ADMIN,
      { expiresIn: process.env.JWT_EXPIRY }
    );
    return res.status(200).json({ success: true, token });
  }

  //   if logged in user is customer
};
