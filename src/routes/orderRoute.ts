import express from "express";
import ordersController from "../controllers/ordersController";
import authMiddleware from "../middlewares/auth.middleware";

const router = express.Router();

router.get("/api/orders", authMiddleware.authCheck, ordersController.getOrders);
router.post("/api/order", ordersController.sendOrder);

export default router;
