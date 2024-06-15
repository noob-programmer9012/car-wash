import { ErrorResponse } from "../util/errorRespone.js";

export default function isAdmin(req, res, next) {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return next(new ErrorResponse("You are not authenticated", 401));
  }

  const token = authorization.split(" ")[1];
  console.log("Token: " + token);
  return next();
}
