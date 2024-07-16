import mongoose from "mongoose";

import Category from "../models/category.js";
import Service from "../models/service.js";
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
    next(new ErrorResponse(error, 500));
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
