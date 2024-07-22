import express from "express";

import * as userController from "../controllers/user.js";

const router = express.Router();

router.get("/getUser", userController.getUser);
router.get("/getCategories", userController.getCategories);
router.get("/getServices/:id", userController.getServices);
router.get("/getAllServices", userController.getAllServices);
router.get("/service/:id", userController.getServiceById);

export default router;
