export const errorHandler = function (err, req, res, next) {
  let error = { ...err };
  error.message = err.message;
  res.status(error.StatusCode || 500).json({
    success: false,
    message: error.message || "Server Error",
  });
};
