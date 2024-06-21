import { ErrorResponse } from "../util/errorRespone.js";

export default function isAdmin(req, res, next) {
  if (!req.isAdmin) {
    return next(new ErrorResponse("You are not authorized to use this route!"));
  }
  next();
}
