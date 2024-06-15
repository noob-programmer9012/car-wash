// External libraries
import express from "express";
import dotenv from "dotenv";

// Internal imports
import { errorHandler } from "./middlewares/errorHandler.js";
// import isAdmin from "./middlewares/isAdmin.js";

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
app.use("/admin", (req, res, next) => {
  res.status(200).json({
    success: true,
    path: "ADMIN PATH",
  });
});

app.use("*", (req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Not a valid path.",
  });
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
