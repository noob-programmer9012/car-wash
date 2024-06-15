import { ErrorResponse } from "../util/errorRespone.js";

export default function isAdmin(req, res, next) {
  const authorization = req.headers.Authorization;
  if (!authorization) {
    next(new ErrorResponse("You are not authenticated", 401));
  }
  return next();
}
