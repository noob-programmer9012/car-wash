// External libraries
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import adminRoutes from "./routes/admin.js";

// Internal imports
import { errorHandler } from "./middlewares/errorHandler.js";
import { ErrorResponse } from "./util/errorRespone.js";
import isAdmin from "./middlewares/isAdmin.js";

// starting setup
const app = express();
dotenv.config({ path: "./config/.env" });
const port = process.env.PORT || 8000;

// middlewares
app.use(express.json());
app.use((req, res, next) => {
  // CORS doesn't let transfer data between two different server, so it causes CORS errors
  // For CORS error use this middleware, to limit client server to set headers
  //   every response we send will set these headers
  res.setHeader("Access-Control-Allow-Origin", "*"); // or you can use website such as the-erp.in instead of *
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// routes
app.use("/admin", isAdmin, adminRoutes);

app.use("*", (req, res, next) => {
  return next(new ErrorResponse("Invalid path", 404));
});

app.use(errorHandler);

mongoose
  .connect(process.env.MONGO_CONN_STRING)
  .then((data) => {
    app.listen(port, () => {
      console.log("Successfully connected to Mongodb Server!");
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((err) => next(err._message, 500));
