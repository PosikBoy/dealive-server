import express from "express";
import ordersController from "../controllers/orderController";
import authMiddleware from "../middlewares/auth.middleware";

const router = express.Router();

router.get("/api/orders", authMiddleware.authCheck, ordersController.getOrders);
router.post("/api/order", ordersController.sendOrder);
router.get(
  "/api/order/:id",
  authMiddleware.authCheck,
  ordersController.getOrderById
);
export default router;
