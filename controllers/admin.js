import Service from "../models/service.js";
import titleCase from "../util/titleCase.js";
import { ErrorResponse } from "../util/errorRespone.js";

export const postService = async (req, res, next) => {
  const { title, serviceTypes, priceStructure } = req.body;

  const exists = await Service.findOne({ title: titleCase(title) });
  if (exists) {
    return next(new ErrorResponse("Service already added to server", 400));
  }

  try {
    const service = new Service({
      title: titleCase(title),
      serviceTypes,
      priceStructure,
    });

    await service.save();
    return res.status(200).json({
      success: true,
      path: "New Service added",
      id: service._id,
    });
  } catch (error) {
    console.log(error.message);
    return next(new ErrorResponse(error, 400));
  }
};
