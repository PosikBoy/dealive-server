"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../config/db"));
const address_dto_1 = require("../dtos/address.dto");
const order_dto_1 = require("../dtos/order.dto");
class OrderModel {
    getOrders(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const getOrdersIdQuery = "SELECT id FROM orders_data WHERE client_id = ?";
                const [ordersId] = yield db_1.default.execute(getOrdersIdQuery, [
                    userId,
                ]);
                const orderPromises = ordersId.map((_b) => __awaiter(this, [_b], void 0, function* ({ id }) {
                    const getOrderByIdQuery = "SELECT * FROM orders_data WHERE id= ?";
                    const [orderDataRows] = yield db_1.default.execute(getOrderByIdQuery, [id]);
                    const orderData = new order_dto_1.OrderDataDTO(orderDataRows[0]);
                    const getAddressesQuery = "SELECT * FROM order_addresses WHERE order_id = ?";
                    const [addressesData] = yield db_1.default.execute(getAddressesQuery, [id]);
                    const addresses = addressesData.map((address) => {
                        const addressDTO = new address_dto_1.AddressDTO(address);
                        return Object.assign({}, addressDTO);
                    });
                    const order = Object.assign(Object.assign({}, orderData), { addresses });
                    return order;
                }));
                const orders = yield Promise.all(orderPromises);
                return orders;
            }
            catch (_a) {
                throw new Error("Error occurred while fetching orders from the database");
            }
        });
    }
    sendOrder(userId, orderData, addresses) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const addOrderDataQuery = "INSERT INTO orders_data (client_id, phone, phone_name, parcel_type, weight, info, price) VALUES (?, ?, ?, ?, ?, ?, ?)";
                const [result] = yield db_1.default.execute(addOrderDataQuery, [
                    userId,
                    orderData.phone || null,
                    orderData.phoneName || null,
                    orderData.parcelType,
                    orderData.weight,
                    orderData.info || null,
                    orderData.price,
                ]);
                const orderId = result.insertId;
                addresses.forEach((address) => __awaiter(this, void 0, void 0, function* () {
                    const addAddressQuery = "INSERT INTO order_addresses (order_id, address, floor, apartment, phone, phone_name, info) VALUES (?, ?, ?, ?, ?, ?, ?)";
                    const [result] = yield db_1.default.execute(addAddressQuery, [
                        orderId,
                        address.address || null,
                        address.floor || null,
                        address.apartment || null,
                        address.phone || null,
                        address.phoneName || null,
                        address.info || null,
                    ]);
                }));
                return orderId;
            }
            catch (error) {
                console.log(error);
                throw new Error("Error occurred while sending order to the database");
            }
        });
    }
}
const orderModel = new OrderModel();
exports.default = orderModel;
