// External libraries
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

// Internal imports
import { errorHandler } from "./middlewares/errorHandler.js";
import { ErrorResponse } from "./util/errorRespone.js";
import { Admin } from "./models/admin.js";
import adminRoutes from "./routes/admin.js";
import authRoutes from "./routes/auth.js";

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
app.use("/admin", adminRoutes);
app.use("/auth", authRoutes);

app.use("*", (req, res, next) => {
  return next(new ErrorResponse("Invalid path", 404));
});

app.use(errorHandler);

async function main() {
  try {
    await mongoose.connect(process.env.MONGO_CONN_STRING);
    app.listen(port, () => {
      console.log("Successfully connected to Mongodb Server!");
      console.log(`Server is running on http://localhost:${port}`);
    });

    // Check if admin is crated, if not create one
    try {
      const admin = await Admin.findOne({
        email: process.env.ADMIN_EMAIL,
      });

      if (!admin) {
        const newAdmin = new Admin({
          username: process.env.ADMIN_USERNAME,
          email: process.env.ADMIN_EMAIL,
          password: process.env.PASSWORD,
        });
        await newAdmin.save();
        console.log("admin account created.");
      }
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
}

main().catch((err) => console.log(err));
