import orderModel from "../models/order.model";
import { IAddress, IOrderDataClient } from "../types/order.interface";

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
      const orderId = await orderModel.sendOrder(userId, orderData, addresses);
      return orderId;
    } catch (error) {}
  }
}

const orderService = new OrderService();
export default orderService;
