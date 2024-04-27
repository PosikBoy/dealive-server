"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ordersController_1 = __importDefault(require("../controllers/ordersController"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const router = express_1.default.Router();
router.get("/api/orders", auth_middleware_1.default.authCheck, ordersController_1.default.getOrders);
router.post("/api/order", ordersController_1.default.sendOrder);
exports.default = router;
