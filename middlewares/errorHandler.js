export const errorHandler = function (err, req, res, next) {
  let error = { ...err };
  error.message = err.message;
  const statusCode = error.statusCode ? error.statusCode : 500;

  res.status(statusCode).json({
    success: false,
    statusCode: error.statusCode,
    message: error.message || "Server Error",
  });
};
