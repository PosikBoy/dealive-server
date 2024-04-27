"use strict";
// authRoute.js
const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");
// добавление отзыва
router.post("/api/sendreview", reviewController.sendReview);
module.exports = router;
