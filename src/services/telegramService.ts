import TelegramBot from "node-telegram-bot-api";
import { IOrderResponse } from "../types/order.interface";

require("dotenv").config();

class TelegramService {
  bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN || "", {
    polling: false,
  });

  async sendOrder(order: IOrderResponse) {
    try {
      this.bot.sendMessage(
        process.env.TELEGRAM_CHAT_ID || "-4267420551",
        `🚚 Новый заказ №${order.info.id} 🚚
        ${order.info.phone ? "📞 Телефон: " + order.info.phone : ""}
       ${order.info.phoneName ? "📝 Имя: " + order.info.phoneName : ""}
       📦 Тип отправления: ${order.info.parcelType}
        ⚖️ Вес: ${order.info.weight}
       ℹ️
      💰 Цена: ${order.info.price} руб.
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

const telegramService = new TelegramService();
export default telegramService;
