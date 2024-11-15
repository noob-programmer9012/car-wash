import express from "express";

import * as authController from "../controllers/auth.js";

const router = express.Router();

router.post("/login", authController.postLogin);
router.post("/signup", authController.postSignUp);

// password reset
router.post("/resetPassword", authController.resetPassword);
router.get("/resetPassword/:resetToken", authController.getResetPassoword);
router.post("/resetPasswordComplete", authController.postResetPassoword);

export default router;
