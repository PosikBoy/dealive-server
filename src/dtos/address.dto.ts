import { IAddressDB } from "../types/order.interface";

export class AddressDTO {
  id: number;
  orderId: number;
  address?: string;
  floor?: string;
  apartment?: string;
  phone?: string;
  phoneName?: string;
  info?: string;

  constructor(addressData: IAddressDB) {
    this.id = addressData.id;
    this.orderId = addressData.order_id;
    this.address = addressData.address;
    this.floor = addressData.floor;
    this.apartment = addressData.apartment;
    this.phone = addressData.phone;
    this.phoneName = addressData.phone_name;
    this.info = addressData.info;
  }
}