import express from "express";
const router = express.Router();
import profileController from "../controllers/profileController";
// Регистрация пользователя
import authMiddleware from "../middlewares/auth.middleware";

router.get(
  "/api/profile",
  authMiddleware.authCheck,
  profileController.getProfileInfo
);

router.put(
  "/api/profile",
  authMiddleware.authCheck,
  profileController.updateProfileInfo
);

export default router;
