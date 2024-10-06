import express from "express";

import * as userController from "../controllers/user.js";

const router = express.Router();

router.get("/getUser", userController.getUser);
router.get("/getCategories", userController.getCategories);
router.get("/getServices/:id", userController.getServices);
router.get("/getAllServices", userController.getAllServices);
router.get("/service/:id", userController.getServiceById);
router.get("/getCart", userController.getCart);
router.get("/getOrders", userController.getOrders);

// post routes
router.post("/addToCart/:serviceId", userController.postAddToCart);
router.post("/checkout", userController.postCheckout);
router.post("/verify-payment", userController.verifyPayment);
router.post("/addAddress", userController.addAddress);

// delete routes
router.delete("/deletCartItem/:serviceId", userController.deleteCartItem);

export default router;
