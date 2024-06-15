import express from "express";

import * as adminController from "../controllers/admin.js";

const router = express.Router();

router.post("/postService", adminController.postService);

export default router;
