// External Libraries
import jwt from "jsonwebtoken";

// Internal Imports
import { ErrorResponse } from "../util/errorRespone.js";

export default function isAdmin(req, res, next) {
  const authorization = req.headers.authorization;

  if (!authorization || !authorization.startsWith("Bearer")) {
    return next(new ErrorResponse("You are not authenticated", 401));
  }

  const token = authorization.split(" ")[1];
  const verified = jwt.verify(token, process.env.JWT_ADMIN);
  if (!verified) {
    return next(new ErrorResponse("Bearer token is invalid", 401));
  }
  req.user = verified.data.userId;
  req.isAdmin = true;
  return next();
}
