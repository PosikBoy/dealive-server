"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// authRoutes.js
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const authController_1 = __importDefault(require("../controllers/authController"));
// Регистрация пользователя
router.post("/api/register", authController_1.default.register);
// Аутентификация пользователя
router.post("/api/login", authController_1.default.login);
router.get("/api/refresh", authController_1.default.refresh);
router.post("/api/logout", authController_1.default.logOut);
exports.default = router;
