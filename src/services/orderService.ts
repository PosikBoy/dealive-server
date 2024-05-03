import orderModel from "../models/order.model";
import { IAddress, IOrderDataClient } from "../types/order.interface";
import TelegramBot from "node-telegram-bot-api";
require("dotenv").config();
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN || "");
class OrderService {
  async getOrders(userId: number) {
    try {
      if (userId) {
        const orders = await orderModel.getOrders(userId);
        return orders;
      } else {
        throw new Error("UserId required");
      }
    } catch (error) {
      throw new Error("Error occured");
    }
  }
  async sendOrder(
    userId = 0,
    orderData: IOrderDataClient,
    addresses: IAddress[]
  ) {
    try {
      const order = await orderModel.sendOrder(userId, orderData, addresses);

      bot.sendMessage(
        process.env.TELEGRAM_CHAT_ID || "-4267420551",
        `🚚 Новый заказ №${order.id} 🚚

        📆 Дата: ${new Date(order.date).toLocaleString()}
        ${order.phone ? "📞 Телефон: " + order.phone : ""}
       ${order.phoneName ? "📝 Имя: " + order.phoneName : ""}
       📦 Тип отправления: ${order.parcelType}
        ⚖️ Вес: ${order.weight}

       ℹ️ Дополнительная информация: ${
         order.info ? order.info : "❌ Не указана"
       }

      💰 Цена: ${order.price} руб.

      🏠 Адреса:
      ${order.addresses
        .map(
          (address, index) =>
            `\n\n${index + 1}. 🏠 ${address.address}${
              address.floor ? `\n    🏢 Этаж: ${address.floor}` : ""
            }${
              address.apartment ? `\n    🚪 Квартира: ${address.apartment}` : ""
            }${address.phone ? `\n    📞 Телефон: ${address.phone}` : ""}${
              address.phoneName ? `\n    📝 Имя: ${address.phoneName}` : ""
            }${
              address.info
                ? `\n    ℹ️ Дополнительная информация: ${address.info}`
                : ""
            }`
        )
        .join("")}`,
        { parse_mode: "HTML" }
      );
      return order;
    } catch (error) {}
  }
}

const orderService = new OrderService();
export default orderService;
