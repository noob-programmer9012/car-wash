import express from "express";
import multer from "multer";
import path from "path";
import { existsSync } from "node:fs";

import * as adminController from "../controllers/admin.js";
import * as userController from "../controllers/user.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (
      file.mimetype.split("/")[0] === "image" &&
      existsSync(`./assets/images/${file.originalname}`)
    ) {
      console.log(req.files);
    }
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

router.post("/category", upload.single("file"), adminController.postCategory);
router.post("/service", upload.array("file", 2), adminController.postService);
router.get("/getCategories", userController.getCategories);
router.get("/getServices", userController.getServices);

export default router;
