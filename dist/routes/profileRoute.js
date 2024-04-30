"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const profileController_1 = __importDefault(require("../controllers/profileController"));
// Регистрация пользователя
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
router.get("/api/profile", auth_middleware_1.default.authCheck, profileController_1.default.getProfileInfo);
router.put("/api/profile", auth_middleware_1.default.authCheck, profileController_1.default.updateProfileInfo);
exports.default = router;
