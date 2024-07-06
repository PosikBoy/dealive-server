import { IOrderInfoDB } from "../types/order.interface";

export class OrderInfoDTO {
  id: number;
  userId: number;
  date: Date;
  phone?: string;
  phoneName?: string;
  parcelType: string;
  weight: string;
  status: string;
  price: number;

  defineStatus(status: number) {
    switch (status) {
      case 1:
      case 2:
      case 3:
        return "В обработке";
      case 4:
        return "Курьер найден";
      case 5:
        return "В пути";
      case 6:
        return "Доставлен";
      case 7:
        return "Возвращен";
      case 8:
        return "Отменен";
      default:
        return "Неизвестно";
    }
  }

  constructor(orderInfo: IOrderInfoDB) {
    this.id = orderInfo.id;
    this.userId = orderInfo.user_id || 0;
    this.date = orderInfo.date;
    this.phone = orderInfo.phone || "";
    this.phoneName = orderInfo.phone_name || "";
    this.parcelType = orderInfo.parcel_type;
    this.weight = orderInfo.weight;
    this.status = this.defineStatus(orderInfo.status_id);
    this.price = orderInfo.price;
  }
}
