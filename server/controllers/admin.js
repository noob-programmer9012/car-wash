import path from "node:path";

import Category from "../models/category.js";
import Service from "../models/service.js";
import titleCase from "../util/titleCase.js";
import { ErrorResponse } from "../util/errorRespone.js";

export const postCategory = async (req, res, next) => {
  const { title } = req.body;

  const exists = await Category.findOne({ title: titleCase(title) });
  if (exists) {
    return next(new ErrorResponse("Service already added to server", 400));
  }

  try {
    const category = new Category({ ...req.body });
    for (let i = 0; i < req.files.length; i++) {
      if (req.files[i].mimetype.split("/")[0] === "video") {
        // service.videoUrl = req.files[i].path;
        category.videoUrl = path.join(
          "/",
          ".",
          "assets",
          "videos",
          req.files[i].originalname
        );
      } else if (req.files[i].mimetype.split("/")[0] === "image") {
        // service.imageUrl = req.files[i].path;
        category.imageUrl = path.join(
          "/",
          ".",
          "assets",
          "images",
          req.files[i].originalname
        );
      } else if (
        req.files[i].mimetype.split("/")[0] === "image" &&
        req.files[i].mimetype.split("/")[1] === "svg+xml"
      ) {
        category.imageUrl = path.join(
          "/",
          ".",
          "assets",
          "svg",
          req.files[i].originalname
        );
      }
    }
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
    if (req.file) {
      if (
        req.file.mimetype === "image/jpeg" ||
        req.file.mimetype === "image/jpg" ||
        req.file.mimetype === "image/png"
      ) {
        service.imageUrl = path.join(
          "/",
          ".",
          "assets",
          "images",
          req.file.originalname
        );
      }
    }

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
