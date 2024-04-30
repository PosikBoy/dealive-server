import { Request, Response } from "express";

import orderService from "./../services/orderService";
import tokenService from "../services/tokenService";

class OrderConroller {
  async getOrders(req: Request, res: Response) {
    const bearerHeader = req.headers.authorization;
    if (!bearerHeader) {
      return res.status(401).json({ message: "Auth required" });
    }
    try {
      const [, token] = bearerHeader.split(" ");
      const { userId } = tokenService.validateAccessToken(token);
      const orders = await orderService.getOrders(userId);

      res.status(200).json({ orders });
    } catch (error) {
      res.status(400).json({ message: "Error occured in orderController" });
    }
  }
  async sendOrder(req: Request, res: Response) {
    const { userId, orderData, addresses } = req.body;
    try {
      const orderId = await orderService.sendOrder(
        userId,
        orderData,
        addresses
      );

      res.status(200).json({ orderId });
    } catch (error) {
      res.status(400).json({ message: "Error occured" });
    }
  }
}

const orderConroller = new OrderConroller();
export default orderConroller;
