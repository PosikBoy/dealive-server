"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressDTO = void 0;
class AddressDTO {
    constructor(addressData) {
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
exports.AddressDTO = AddressDTO;
