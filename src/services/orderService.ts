import orderModel from "../models/order.model";
import {
  IAddressRequest,
  IOrderInfoRequest,
  IOrderResponse,
} from "../types/order.interface";
import telegramService from "./telegramService";
require("dotenv").config();

class OrderService {
  async getOrders(userId: number) {
    try {
      if (userId) {
        const orders = await orderModel.getOrdersByUserId(userId);
        return orders;
      } else {
        throw new Error("UserId required");
      }
    } catch (error) {
      throw error;
    }
  }

  async sendOrder(
    orderInfo: IOrderInfoRequest,
    addresses: IAddressRequest[]
  ): Promise<IOrderResponse> {
    try {
      const order = await orderModel.sendOrder(orderInfo, addresses);
      telegramService.sendOrder(order);
      return order;
    } catch (error) {
      throw error;
    }
  }

  async getOrderByUserIdWithValidation(userId: number, orderId: number) {
    try {
      if (!(userId && orderId)) throw new Error("UserId and OrderId required");
      const order = await orderModel.getOrderById(orderId);
      if (!order) throw new Error("Order not found");

      if (order?.info.userId === userId) {
        return order;
      } else {
        throw new Error("Access denied");
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

const orderService = new OrderService();
export default orderService;
