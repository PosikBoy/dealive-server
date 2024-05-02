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
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
require("dotenv").config();
const bot = new node_telegram_bot_api_1.default(process.env.TELEGRAM_BOT_TOKEN || "", {
    polling: true,
});
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
                const order = yield order_model_1.default.getOrder(orderId);
                console.log("order", order);
                bot.sendMessage(process.env.TELEGRAM_CHAT_ID || "-4267420551", `🚚 Новый заказ №${order.id} 🚚
      
        📆 Дата: ${new Date(order.date).toLocaleString()}
        ${order.phone ? "📞 Телефон: " + order.phone : ""}
       ${order.phoneName ? "📝 Имя: " + order.phoneName : ""}
       📦 Тип отправления: ${order.parcelType}
        ⚖️ Вес: ${order.weight}
      
       ℹ️ Дополнительная информация: ${order.info ? order.info : "❌ Не указана"}
      
      💰 Цена: ${order.price} руб.
      
      🏠 Адреса:
      ${order.addresses
                    .map((address, index) => `\n\n${index + 1}. 🏠 ${address.address}${address.floor ? `\n    🏢 Этаж: ${address.floor}` : ""}${address.apartment ? `\n    🚪 Квартира: ${address.apartment}` : ""}${address.phone ? `\n    📞 Телефон: ${address.phone}` : ""}${address.phoneName ? `\n    📝 Имя: ${address.phoneName}` : ""}${address.info
                    ? `\n    ℹ️ Дополнительная информация: ${address.info}`
                    : ""}`)
                    .join("")}`, { parse_mode: "HTML" });
                return orderId;
            }
            catch (error) { }
        });
    }
}
const orderService = new OrderService();
exports.default = orderService;
