// External libraries
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import cors from "cors";

// Internal imports
import { Admin } from "./models/admin.js";

// Route imports
import adminRoutes from "./routes/admin.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import reviewRoutes from "./routes/reviews.js";

// middleware routes
import isAuth from "./middlewares/isAuth.js";
import isAdmin from "./middlewares/isAuth.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { ErrorResponse } from "./util/errorRespone.js";

// starting setup
const app = express();
dotenv.config({ path: "./config/.env" });
const port = process.env.PORT || 8000;

// middlewares
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/assets", express.static(path.join(path.resolve(), "assets")));

// routes
app.use("/admin", isAuth, isAdmin, adminRoutes);
app.use("/auth", authRoutes);
app.use("/", isAuth, userRoutes);
app.use("/reviews", isAuth, reviewRoutes);
app.use("*", (req, res, next) => {
  return next(new ErrorResponse("Invalid path", 404));
});

app.use(errorHandler);

async function main() {
  try {
    await mongoose.connect(process.env.MONGO_CONN_STRING);
    app.listen(port, async () => {
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
