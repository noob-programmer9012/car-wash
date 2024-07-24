import express from "express";
import multer from "multer";
import path from "path";

import * as adminController from "../controllers/admin.js";
import * as userController from "../controllers/user.js";
import isAdmin from "../middlewares/isAdmin.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(file);
    if (file.mimetype === "image/svg+xml") {
      cb(null, path.join(path.resolve(), ".", "assets", "svg"));
    } else if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/png"
    ) {
      cb(null, path.join(path.resolve(), ".", "assets", "images"));
    } else if (
      file.mimetype === "video/mp4" ||
      file.mimetype === "video/webm" ||
      file.mimetype === "video/quicktime"
    ) {
      cb(null, path.join(path.resolve(), ".", "assets", "videos"));
    }
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  },
});

const upload = multer({ storage });

// POST routes
router.post(
  "/category",
  isAdmin,
  upload.array("file", 2),
  adminController.postCategory
);
router.post(
  "/service",
  isAdmin,
  upload.single("file"),
  adminController.postService
);

// PUT routes
router.put(
  "/category/:id",
  isAdmin,
  upload.array("file", 2),
  adminController.putCategory
);

// GET routes
router.get("/getCategories", userController.getCategories);
router.get("/getCategory/:id", adminController.getCategoryById);
router.get("/getServices", adminController.adminGetServices);
router.get("/getService/:id", adminController.getServiceById);
router.get("/getUsers", adminController.getUsers);

export default router;
