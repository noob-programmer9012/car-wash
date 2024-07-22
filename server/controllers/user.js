import mongoose from "mongoose";

import Category from "../models/category.js";
import Service from "../models/service.js";
import User from "../models/user.js";
import { ErrorResponse } from "../util/errorRespone.js";

export const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    const totalCategories = await Category.countDocuments();
    return res.status(200).json({
      success: true,
      totalCategories,
      data: totalCategories > 0 ? categories : "No categories added yet!",
    });
  } catch (error) {
    return next(new ErrorResponse(error, 500));
  }
};

export const getServices = async (req, res, next) => {
  const categoryId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(categoryId))
    return next(new ErrorResponse("Not a valid path", 404));

  try {
    const services = await Service.find({
      category: categoryId,
    });

    const totalServices = await Service.countDocuments();
    return res.status(200).json({
      success: true,
      totalServices,
      data: totalServices > 0 ? services : "No services added yet.",
    });
  } catch (error) {
    return next(new ErrorResponse(error, 500));
  }
};

export const getServiceById = async (req, res, next) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id))
    return next(new ErrorResponse("Not a valid path", 404));

  try {
    const data = await Service.findById(id);
    if (!data)
      return res
        .status(404)
        .json({ success: false, message: "No service available for this id." });
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return next(new ErrorResponse(error, 500));
  }
};

export const getAllServices = async (req, res, next) => {
  try {
    const services = await Service.find();

    const totalServices = await Service.countDocuments();
    return res.status(200).json({
      success: true,
      totalServices,
      data: totalServices > 0 ? services : "No services added yet.",
    });
  } catch (error) {
    return next(new ErrorResponse(error, 500));
  }
};

export const getUser = async (req, res, next) => {
  const email = req.email;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res
        .statas(404)
        .json({ success: false, message: "User doen not exist" });
    return res.status(200).json({ success: true, user });
  } catch (error) {
    return next(new ErrorResponse(error, 500));
  }
};
