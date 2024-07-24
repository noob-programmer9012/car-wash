// import path from "node:path";
import mongoose from "mongoose";
import { unlink } from "fs/promises";
import path from "path";

import Category from "../models/category.js";
import Service from "../models/service.js";
import titleCase from "../util/titleCase.js";
import { ErrorResponse } from "../util/errorRespone.js";
import addFiles from "../util/addFiles.js";
import User from "../models/user.js";

export const postCategory = async (req, res, next) => {
  const { title } = req.body;

  const exists = await Category.findOne({ title: titleCase(title) });
  if (exists) {
    return next(new ErrorResponse("Service already added to server", 400));
  }

  try {
    const category = new Category({ ...req.body });
    addFiles(req, res, next, category);
    category.title = titleCase(category.title);
    await category.save();
    return res.status(200).json({
      success: true,
      message: "New Category added",
      id: category._id,
    });
  } catch (error) {
    return next(new ErrorResponse(error, 400));
  }
};

export const getCategoryById = async (req, res, next) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id))
    return next(new ErrorResponse("Not a valid path", 404));

  try {
    const data = await Category.findById(id);
    if (!data)
      return res.status(404).json({
        success: false,
        message: "No category available for this id.",
      });
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return next(new ErrorResponse(error, 500));
  }
};

export const putCategory = async (req, res, next) => {
  const category_id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(category_id))
    return next(new ErrorResponse("Not a valid path", 404));

  const category = await Category.findById(category_id);
  if (!category) return next(new ErrorResponse("Not a valid path", 404));

  const imageUrl = category.imageUrl;
  const videoUrl = category.videoUrl;

  if (req.files) {
    for (let i = 0; i < req.files.length; i++) {
      if (req.files[i].mimetype === "image/svg+xml" && imageUrl) {
        const url = path.join(path.resolve(), imageUrl);
        try {
          await unlink(url);
        } catch (error) {
          await unlink(req.files.path);
        }
      } else if (req.files[i].mimetype === "video/webm" && videoUrl) {
        const url = path.join(path.resolve(), videoUrl);
        try {
          await unlink(url);
        } catch (error) {
          await unlink(req.files.path);
        }
      }
    }
  }
  addFiles(req, res, next, category);
  category.title = req.body.title;
  try {
    await category.save();
    return res.status(201).json({ success: true, category });
  } catch (error) {
    return next(new ErrorResponse(error, 500));
  }
};

export const postService = async (req, res, next) => {
  const { serviceName } = req.body;
  console.log(req.body);

  const exists = await Service.findOne({
    serviceName: titleCase(serviceName),
  });
  if (exists) {
    return next(new ErrorResponse("Service already added to server", 400));
  }

  try {
    const service = new Service({ ...req.body });
    addFiles(req, res, next, service);

    service.serviceName = titleCase(service.serviceName);
    // const newFacilities = [];
    // service.plan.facilities.forEach((facility) => {
    //   newFacilities.push(titleCase(facility));
    // });
    // service.plan.facilities = newFacilities;

    const result = await service.save();
    console.log(result);

    return res.status(200).json({
      success: true,
      message: "New service created!",
      id: service._id,
    });
  } catch (error) {
    return next(new ErrorResponse(error, 400));
  }
};

export const adminGetServices = async (req, res, next) => {
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

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    if (!users)
      return res
        .status(200)
        .json({ success: true, message: "There are no active users!" });
    return res.status(200).json({ success: true, users });
  } catch (error) {
    next(new ErrorResponse(error, 500));
  }
};
