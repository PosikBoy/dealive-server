import { ResultSetHeader, RowDataPacket } from "mysql2";
import db from "../config/db";
import { AddressDTO } from "../dtos/address.dto";
import { OrderDataDTO } from "../dtos/order.dto";
import {
  IAddress,
  IAddressDB,
  IOrderData,
  IOrderDataClient,
  IOrderDataDB,
} from "../types/order.interface";

class OrderModel {
  async getOrders(userId: number): Promise<IOrderData[]> {
    try {
      const getOrdersIdQuery = "SELECT id FROM orders_data WHERE client_id = ?";
      const [ordersId] = await db.execute<RowDataPacket[]>(getOrdersIdQuery, [
        userId,
      ]);

      const orderPromises = ordersId.map(async ({ id }: RowDataPacket) => {
        const getOrderByIdQuery = "SELECT * FROM orders_data WHERE id= ?";
        const [orderDataRows] = await db.execute<RowDataPacket[]>(
          getOrderByIdQuery,
          [id]
        );
        const orderData = new OrderDataDTO(orderDataRows[0] as IOrderDataDB);
        const getAddressesQuery =
          "SELECT * FROM order_addresses WHERE order_id = ?";
        const [addressesData] = await db.execute<RowDataPacket[]>(
          getAddressesQuery,
          [id]
        );

        const addresses = addressesData.map((address: RowDataPacket) => {
          const addressDTO = new AddressDTO(address as IAddressDB);
          return { ...addressDTO };
        });

        const order = {
          ...orderData,
          addresses,
        };
        return order;
      });

      const orders = await Promise.all(orderPromises);
      return orders;
    } catch {
      throw new Error("Error occurred while fetching orders from the database");
    }
  }
  async getOrder(orderId: number) {
    const getOrderDataQuery = "SELECT * FROM orders_data WHERE id = ?";
    let orderData;
    try {
      const [orderDataRows] = await db.execute<RowDataPacket[]>(
        getOrderDataQuery,
        [orderId]
      );
      orderData = new OrderDataDTO(orderDataRows[0] as IOrderDataDB);
    } catch (error) {
      throw error;
    }

    const getAddressesQuery =
      "SELECT * FROM order_addresses WHERE order_id = ?";
    let orderAddresses;
    try {
      const [orderAdressesRows] = await db.execute<RowDataPacket[]>(
        getAddressesQuery,
        [orderId]
      );
      orderAddresses = orderAdressesRows;
    } catch (error) {
      throw error;
    }

    const addresses = orderAddresses.map((address: RowDataPacket) => {
      const addressDTO = new AddressDTO(address as IAddressDB);
      return { ...addressDTO };
    });
    const order = {
      ...orderData,
      addresses,
    };
    return order;
  }
  async sendOrder(
    userId: number,
    orderData: IOrderDataClient,
    addresses: IAddress[]
  ) {
    try {
      const addOrderDataQuery =
        "INSERT INTO orders_data (client_id, phone, phone_name, parcel_type, weight, info, price) VALUES (?, ?, ?, ?, ?, ?, ?)";
      const [result] = await db.execute<ResultSetHeader>(addOrderDataQuery, [
        userId,
        orderData.phone || null,
        orderData.phoneName || null,
        orderData.parcelType,
        orderData.weight,
        orderData.info || null,
        orderData.price,
      ]);
      const orderId = result.insertId;
      addresses.forEach(async (address) => {
        const addAddressQuery =
          "INSERT INTO order_addresses (order_id, address, floor, apartment, phone, phone_name, info) VALUES (?, ?, ?, ?, ?, ?, ?)";
        const [result] = await db.execute(addAddressQuery, [
          orderId,
          address.address || null,
          address.floor || null,
          address.apartment || null,
          address.phone || null,
          address.phoneName || null,
          address.info || null,
        ]);
      });
      return {
        userId: userId,
        ...orderData,
        addresses: addresses,
      };
    } catch (error) {
      console.log(error);
      throw new Error("Error occurred while sending order to the database");
    }
  }
}

const orderModel = new OrderModel();
export default orderModel;
