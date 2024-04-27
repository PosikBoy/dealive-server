"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const orderService_1 = __importDefault(require("./../services/orderService"));
const tokenService_1 = __importDefault(require("../services/tokenService"));
class OrderConroller {
    getOrders(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const bearerHeader = req.headers.authorization;
            if (!bearerHeader) {
                return res.status(401).json({ message: "Auth required" });
            }
            try {
                const [, token] = bearerHeader.split(" ");
                const { userId } = tokenService_1.default.validateAccessToken(token);
                const orders = yield orderService_1.default.getOrders(userId);
                res.status(200).json({ orders });
            }
            catch (error) {
                res.status(400).json({ message: "Error occured in orderController" });
            }
        });
    }
    sendOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const bearerHeader = req.headers.authorization;
            let clientId = 0;
            if (bearerHeader) {
                const [, token] = bearerHeader.split(" ");
                const { userId } = tokenService_1.default.validateAccessToken(token);
                clientId = userId;
            }
            const { orderData, addresses } = req.body;
            try {
                const orderId = yield orderService_1.default.sendOrder(clientId, orderData, addresses);
                res.status(200).json({ orderId });
            }
            catch (error) {
                res.status(400).json({ message: "Error occured" });
            }
        });
    }
}
const orderConroller = new OrderConroller();
exports.default = orderConroller;
