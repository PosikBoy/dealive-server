import { ResultSetHeader, RowDataPacket } from "mysql2";
import db from "../config/db";
import { AddressDTO } from "../dtos/address.dto";
import { OrderInfoDTO } from "../dtos/order.dto";
import {
  IAddressDB,
  IOrderResponse,
  IOrderInfoDB,
  IOrderInfoRequest,
  IAddressRequest,
} from "../types/order.interface";
class OrderModel {
  async getOrdersByUserId(userId: number): Promise<IOrderResponse[]> {
    const getOrderInfoByIdQuery = "SELECT * FROM orders_data WHERE user_id= ?";
    const getAddressesByOrderIdQuery =
      "SELECT * FROM order_addresses WHERE order_id = ?";
    let ordersInfo = [];
    let orders = [];
    try {
      const [orderInfoRows] = await db.execute<RowDataPacket[]>(
        getOrderInfoByIdQuery,
        [userId]
      );
      ordersInfo = orderInfoRows.map((orderInfo: RowDataPacket) => {
        const orderInfoDTO = new OrderInfoDTO(orderInfo as IOrderInfoDB);
        return { ...orderInfoDTO };
      });
    } catch (error) {
      throw new Error("No orders found");
    }
    try {
      orders = ordersInfo.map(async (orderInfo) => {
        const id = orderInfo.id;
        const [addressesData] = await db.execute<RowDataPacket[]>(
          getAddressesByOrderIdQuery,
          [id]
        );

        const addresses = addressesData.map((address: RowDataPacket) => {
          const addressDTO = new AddressDTO(address as IAddressDB);
          return { ...addressDTO };
        });
        const order = {
          info: {
            ...orderInfo,
          },
          addresses: addresses,
        };
        return order;
      });
      return Promise.all(orders);
    } catch (error) {
      throw new Error("No addresses found");
    }
  }
  async getOrderById(orderId: number): Promise<IOrderResponse | null> {
    const getOrderInfoQuery = "SELECT * FROM orders_data WHERE id = ?";
    const getAddressesQuery =
      "SELECT * FROM order_addresses WHERE order_id = ?";
    let orderAddresses;
    let orderInfo;
    try {
      const [orderDataRows] = await db.execute<RowDataPacket[]>(
        getOrderInfoQuery,
        [orderId]
      );
      console.log(orderDataRows);
      orderInfo = new OrderInfoDTO(orderDataRows[0] as IOrderInfoDB);
    } catch (error) {
      throw new Error("No order found");
    }

    try {
      const [orderAddressesRows] = await db.execute<RowDataPacket[]>(
        getAddressesQuery,
        [orderId]
      );
      orderAddresses = orderAddressesRows;
    } catch (error) {
      throw error;
    }

    const addresses = orderAddresses.map((address: RowDataPacket) => {
      const addressDTO = new AddressDTO(address as IAddressDB);
      return { ...addressDTO };
    });
    const order = {
      info: {
        ...orderInfo,
      },
      addresses,
    };
    return order;
  }
  async sendOrder(orderInfo: IOrderInfoRequest, addresses: IAddressRequest[]) {
    const addOrderDataQuery =
      "INSERT INTO orders_data (user_id, phone, phone_name, parcel_type, weight, price) VALUES (?, ?, ?, ?, ?, ?)";

    try {
      const [result] = await db.execute<ResultSetHeader>(addOrderDataQuery, [
        orderInfo.userId || 1,
        orderInfo.phone || null,
        orderInfo.phoneName || null,
        orderInfo.parcelType,
        orderInfo.weight || null,
        orderInfo.price,
      ]);

      const orderId = result.insertId;

      addresses.forEach(async (address) => {
        const addAddressQuery =
          "INSERT INTO order_addresses (order_id, address, floor, apartment, phone, phone_name, info) VALUES (?, ?, ?, ?, ?, ?, ?)";
        await db.execute(addAddressQuery, [
          orderId,
          address.address || null,
          address.floor || null,
          address.apartment || null,
          address.phone || null,
          address.phoneName || null,
          address.info || null,
        ]);
      });
      const order = {
        info: {
          id: orderId,
          status: "В обработке",
          date: new Date(),
          ...orderInfo,
        },
        addresses: addresses,
      };
      return order;
    } catch (error) {
      console.log(error);
      throw new Error("Error occurred while sending order to the database");
    }
  }
}

const orderModel = new OrderModel();
export default orderModel;
