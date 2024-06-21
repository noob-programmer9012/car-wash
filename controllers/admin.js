import Category from "../models/category.js";
import Service from "../models/service.js";
import titleCase from "../util/titleCase.js";
import { ErrorResponse } from "../util/errorRespone.js";
import errorMessages from "../util/errorMessages.js";

export const postCategory = async (req, res, next) => {
  const { title, imageUrl } = req.body;

  const exists = await Category.findOne({ title: titleCase(title) });
  if (exists) {
    return next(new ErrorResponse("Service already added to server", 400));
  }

  try {
    const category = new Category({
      title: titleCase(title),
      imageUrl,
    });

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

  const exists = await Service.findOne({
    serviceName: titleCase(serviceName),
  });
  if (exists) {
    return next(new ErrorResponse("Service already added to server", 400));
  }

  try {
    const service = new Service({ ...req.body });
    service.serviceName = titleCase(service.serviceName);
    const newFacilities = [];
    service.plan.facilities.forEach((facility) => {
      newFacilities.push(titleCase(facility));
    });
    service.plan.facilities = newFacilities;

    await service.save();

    return res.status(200).json({
      success: true,
      message: "New service created!",
      id: service._id,
    });
  } catch (error) {
    return next(new ErrorResponse(error, 400));
  }
};
