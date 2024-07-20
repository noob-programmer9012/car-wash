import mongoose from "mongoose";

import Reviews from "../models/reviews.js";
import { ErrorResponse } from "../util/errorRespone.js";

export const getReviewsByService = async (req, res, next) => {
  const serviceId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(serviceId))
    return res
      .status(401)
      .json({ success: false, message: "Not a valid service id" });
  try {
    const reviews = await Reviews.find({ serviceId });
    if (!reviews)
      return res
        .status(200)
        .json({ success: true, message: "No reviews yet!" });
    return res.status(200).json({ success: true, reviews });
  } catch (error) {
    return next(new ErrorResponse(error, 500));
  }
};

export const getReviewsByUser = async (req, res, next) => {
  const userId = req.user;
  if (!mongoose.Types.ObjectId.isValid(userId) || !req.isUser)
    return res
      .status(401)
      .json({ success: false, message: "Not a valid userId" });

  try {
    const reviews = await Reviews.find({ userId });

    if (!reviews)
      return res.status(200).json({ success: true, message: "No reviews" });
    return res.status(200).json({ success: true, reviews });
  } catch (error) {
    return next(new ErrorResponse(error, 500));
  }
};

export const postReviews = async (req, res, next) => {
  const userId = req.user;
  const serviceId = req.params.id;

  if (
    !mongoose.Types.ObjectId.isValid(userId) ||
    !mongoose.Types.ObjectId.isValid(serviceId) ||
    !req.isUser
  )
    return res
      .status(401)
      .json({ success: false, message: "Not a valid userId or ServiceId" });

  try {
    const review = new Reviews({
      userId,
      serviceId,
      rating: req.body.rating,
      review: req.body.review,
    });
    await review.save();
    return res.status(201).json({
      success: true,
      review,
    });
  } catch (error) {
    return next(new ErrorResponse(error, 500));
  }
};
