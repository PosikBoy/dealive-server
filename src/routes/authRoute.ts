// authRoutes.js
import express from "express";
const router = express.Router();
import authController from "../controllers/authController";
// Регистрация пользователя
router.post("/api/register", authController.register);

// Аутентификация пользователя
router.post("/api/login", authController.login);
router.get("/api/refresh", authController.refresh);
router.post("/api/logout", authController.logOut);

export default router;
