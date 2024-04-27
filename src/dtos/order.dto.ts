import { IOrderDataDB } from "../types/order.interface";

export class OrderDataDTO {
  id: number;
  clientId: number;
  date: Date;
  phone: string;
  phoneName: string;
  parcelType: string;
  weight: string;
  status: string;
  info: string;
  price: number;

  constructor(orderData: IOrderDataDB) {
    this.id = orderData.id;
    this.clientId = orderData.client_id;
    this.date = orderData.date;
    this.phone = orderData.phone;
    this.phoneName = orderData.phone_name;
    this.parcelType = orderData.parcel_type;
    this.weight = orderData.weight;
    this.status = orderData.status;
    this.info = orderData.info;
    this.price = orderData.price;
  }
}
