// External libraries
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import multer from "multer";
import * as fs from "node:fs";

// Internal imports
import { errorHandler } from "./middlewares/errorHandler.js";
import { ErrorResponse } from "./util/errorRespone.js";
import { Admin } from "./models/admin.js";
import adminRoutes from "./routes/admin.js";
import authRoutes from "./routes/auth.js";
import isAuth from "./middlewares/isAuth.js";

// starting setup
const app = express();
dotenv.config({ path: "./config/.env" });
const port = process.env.PORT || 8000;

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/assets", express.static(path.join(path.resolve(), "assets")));
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

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(req.file);
    if (file.mimetype === "image/svg+xml") {
      cb(null, path.join(path.resolve(), "assets", "svg"));
    } else if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/png"
    ) {
      cb(null, path.join(path.resolve(), "assets", "images"));
    } else if (
      file.mimetype === "video/mp4" ||
      file.mimetype === "video/webm" ||
      file.mimetype === "video/quicktime"
    ) {
      cb(null, path.join(path.resolve(), "assets", "images"));
    }
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  },
});

const upload = multer({ storage });

// routes
// app.post("/upload", upload.single("file"), (req, res, next) => {
//   // const { buffer, originalname } = req.file;
//   // const writeStream = fs.createWriteStream(originalname, { flags: "a" });
//   // writeStream.write(buffer);
//   // writeStream.end();
//   // writeStream.on("finish", () => {
//   //   res.status(200).send("File received successfully.");
//   // });
//   // // Event listener for any errors during the write operation
//   // writeStream.on("error", (err) => {
//   //   console.error(err);
//   //   res.status(500).send("Internal Server Error");
//   // });
// });
app.use("/admin", upload.single("file"), adminRoutes);
app.use("/auth", authRoutes);
app.use("/dashboard", isAuth, (req, res, next) => {
  if (req.isUser) {
    return res.status(200).json({ user: "customer" });
  } else if (req.isAdmin) {
    return res.status(200).json({ user: "admin" });
  }
  return res.json({ nothing: "no data" });
});
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
