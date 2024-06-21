import express from "express";

import * as adminController from "../controllers/admin.js";
import isAuth from "../middlewares/isAuth.js";
import isAdmin from "../middlewares/isAdmin.js";

const router = express.Router();

router.post("/category", isAuth, isAdmin, adminController.postCategory);
router.post("/service", isAuth, isAdmin, adminController.postService);

export default router;
