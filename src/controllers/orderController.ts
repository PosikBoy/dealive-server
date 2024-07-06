import { Request, Response } from "express";

import orderService from "../services/orderService";
import tokenService from "../services/tokenService";

class OrderController {
  async getOrders(req: Request, res: Response) {
    const bearerHeader = req.headers.authorization;
    if (!bearerHeader) {
      return res.status(401).json({ message: "Auth required" });
    }
    try {
      const [, token] = bearerHeader.split(" ");
      const { userId } = tokenService.validateAccessToken(token);
      const orders = await orderService.getOrders(userId);

      res.status(200).json(orders);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async getOrderById(req: Request, res: Response) {
    const { id } = req.params;
    const bearerHeader = req.headers.authorization;
    if (!bearerHeader) {
      return res.status(401).json({ message: "Access denied" });
    }
    try {
      const [, token] = bearerHeader.split(" ");
      const { userId } = tokenService.validateAccessToken(token);
      const order = await orderService.getOrderByUserIdWithValidation(
        userId,
        Number(id)
      );
      res.status(200).json(order);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
  async sendOrder(req: Request, res: Response) {
    const { info, addresses } = req.body;
    try {
      const order = await orderService.sendOrder(info, addresses);
      res.status(200).json(order);
    } catch (error: any) {
      console.log(error);
      res.status(400).json({ message: error.message });
    }
  }
}

const orderController = new OrderController();
export default orderController;
