import express from "express";

import * as adminController from "../controllers/admin.js";
import isAdmin from "../middlewares/isAdmin.js";

const router = express.Router();

router.post("/postService", isAdmin, adminController.postService);

export default router;
