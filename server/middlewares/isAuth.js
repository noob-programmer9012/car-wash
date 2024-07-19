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

  const verified = jwt.verify(token, process.env.JWT_SECRET);

  if (verified) {
    req.user = verified.data.userId;
    if (verified.data.isUser) {
      req.isUser = true;
      req.email = verified.data.email;
    } else if (verified.data.isAdmin) {
      req.isAdmin = true;
      req.email = verified.data.email;
    }
    return next();
  }

  return next(new ErrorResponse("Your are not authorized", 401));
}
