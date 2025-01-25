import express from "express";

import * as reviewsController from "../controllers/reviews.js";

const router = express.Router();

router.get("/getReviewsByService/:id", reviewsController.getReviewsByService);
router.get("/getReviewsByUser", reviewsController.getReviewsByUser);

router.post("/postReview/:id", reviewsController.postReviews);
router.put("/editReview/:id", (req, res) => { });

export default router;
