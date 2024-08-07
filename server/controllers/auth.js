// External Libraries
import jwt from "jsonwebtoken";
import { generateKey } from "node:crypto";

// Internal Imports
import { ErrorResponse } from "../util/errorRespone.js";
import { Admin } from "../models/admin.js";
import User from "../models/user.js";
import sendEmail from "../util/sendEmail.js";

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
    return res.status(200).json({ success: true, token, isAdmin: true });
  } else {
    const isUser = await User.findOne({ email }).select("+password");
    if (!isUser) {
      return next(
        new ErrorResponse("Please enter correct email and password!", 404)
      );
    }
    const match = await isUser.comparePassword(password);
    if (!match) {
      return next(
        new ErrorResponse("Please enter correct email and password!", 401)
      );
    }
    const token = jwt.sign(
      { data: { userId: isUser._id, email: isUser.email, isUser: true } },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRY }
    );
    return res.status(200).json({ success: true, token, isUser: true });
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
    next(new ErrorResponse(error, 500));
  }
};

export const resetPassword = async (req, res, next) => {
  const email = req.body.email;
  if (!email)
    return res
      .status(401)
      .json({ success: false, message: "Please enter your email address" });

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({
        success: false,
        message: "This email is not associated with any user.",
      });

    generateKey("aes", { length: 256 }, async (err, key) => {
      if (err)
        return res
          .status(500)
          .json({ success: false, message: "Could not generate reset path." });

      if (key) {
        user.passwordResetToken = key.export().toString("hex");
        user.passwordResetTokenExpiry = Date.now() + 60000 * 10;
        await user.save();
        // send mail to user with reset link
        await sendEmail({
          to: user.email,
          subject: "Password reset form link",
          html: `http://localhost:5173/resetPassword/${user.passwordResetToken}`,
        });
        return res.status(201).json({
          success: true,
          message: "User reset token created successfully.",
        });
      }
    });
  } catch (error) {
    return next(new ErrorResponse(error, 500));
  }
};

export const getResetPassoword = async (req, res, next) => {
  const passwordResetToken = req.params.resetToken;

  try {
    const user = await User.findOne({ passwordResetToken });
    if (!user)
      return res.status(404).json({
        success: false,
        message: "Wrong reset token or token expired",
      });

    if (!(user.passwordResetTokenExpiry > Date.now())) {
      user.passwordResetToken = undefined;
      user.passwordResetTokenExpiry = undefined;
      await user.save();
      return res.status(401).json({
        success: false,
        message: "Reset token expired",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Valid reset token",
      token: user.passwordResetToken,
    });
  } catch (error) {
    return next(new ErrorResponse(error, 500));
  }
};

export const postResetPassoword = async (req, res, next) => {
  const passwordResetToken = req.body.token;
  const newPassword = req.body.newPassword;

  try {
    const user = await User.findOne({ passwordResetToken });
    if (!user)
      return res.status(404).json({
        success: false,
        message: "Wrong reset token or token expired",
      });

    if (!(user.passwordResetTokenExpiry > Date.now())) {
      user.passwordResetToken = undefined;
      user.passwordResetTokenExpiry = undefined;
      await user.save();
      return res.status(401).json({
        success: false,
        message: "Reset token expired",
      });
    }

    user.password = newPassword;
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpiry = undefined;
    await user.save();
    return res.status(200).json({
      success: true,
      message: "Password Changed Successfully.",
    });
  } catch (error) {
    return next(new ErrorResponse(error, 500));
  }
};
