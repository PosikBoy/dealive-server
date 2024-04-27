"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderDataDTO = void 0;
class OrderDataDTO {
    constructor(orderData) {
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
exports.OrderDataDTO = OrderDataDTO;
