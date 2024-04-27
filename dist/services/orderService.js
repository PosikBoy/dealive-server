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
const order_model_1 = __importDefault(require("../models/order.model"));
class OrderService {
    getOrders(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (userId) {
                    const orders = yield order_model_1.default.getOrders(userId);
                    return orders;
                }
                else {
                    throw new Error("UserId required");
                }
            }
            catch (error) {
                throw new Error("Error occured");
            }
        });
    }
    sendOrder() {
        return __awaiter(this, arguments, void 0, function* (userId = 0, orderData, addresses) {
            try {
                const orderId = yield order_model_1.default.sendOrder(userId, orderData, addresses);
                return orderId;
            }
            catch (error) { }
        });
    }
}
const orderService = new OrderService();
exports.default = orderService;
