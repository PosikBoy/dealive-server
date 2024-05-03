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
class ProfileModel {
    getProfileById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const getProfileByIdQuery = "SELECT id, name, email, phone_number FROM clients WHERE id = ?";
                const [result] = yield db_1.default.execute(getProfileByIdQuery, [
                    userId,
                ]);
                if (result.length === 0) {
                    throw new Error("Profile not found in the database");
                }
                const profile = {
                    id: result[0].id,
                    name: result[0].name,
                    email: result[0].email,
                    phoneNumber: result[0].phone_number,
                };
                return profile;
            }
            catch (error) {
                throw new Error("Error occurred while fetching profile by id from the database");
            }
        });
    }
    getProfileByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const getProfileByEmailQuery = "SELECT id, name, email, phone_number FROM clients WHERE email = ?";
            try {
                const [result] = yield db_1.default.execute(getProfileByEmailQuery, [email]);
                if (result.length === 0) {
                    return null;
                }
                const profile = {
                    id: result[0].id,
                    name: result[0].name,
                    email: result[0].email,
                    phoneNumber: result[0].phone_number,
                };
                return profile;
            }
            catch (error) {
                throw new Error("Error occurred while fetching profile by email from the database" +
                    error);
            }
        });
    }
    updateProfileInfo(userId, name, email, phoneNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            if (!phoneNumber) {
                throw Error("Введите номер телефона!");
            }
            const findUserByPhoneNumberQuery = "SELECT * FROM clients WHERE phone_number = ?";
            try {
                const [result] = yield db_1.default.execute(findUserByPhoneNumberQuery, [phoneNumber]);
                if (((_a = result[0]) === null || _a === void 0 ? void 0 : _a.id) !== userId && result.length > 0) {
                    throw new Error("Пользователь с таким номером уже существует");
                }
            }
            catch (error) {
                console.log(error);
                throw error;
            }
            if (!email) {
                throw Error("Введите электронную почту!");
            }
            const findUserByEmailQuery = "SELECT * FROM clients WHERE email = ?";
            try {
                const [result] = yield db_1.default.execute(findUserByEmailQuery, [
                    email,
                ]);
                if (((_b = result[0]) === null || _b === void 0 ? void 0 : _b.id) !== userId && result.length > 0) {
                    throw new Error("Пользователь с таким email уже существует");
                }
            }
            catch (error) {
                console.log(error);
                throw error;
            }
            const updateProfileInfoQuery = "UPDATE clients SET name = ?, email = ?, phone_number = ? WHERE id = ?";
            try {
                yield db_1.default.execute(updateProfileInfoQuery, [
                    name,
                    email,
                    phoneNumber,
                    userId,
                ]);
                const profile = {
                    id: userId,
                    name: name,
                    email: email,
                    phoneNumber: phoneNumber,
                };
                return profile;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
const profileModel = new ProfileModel();
exports.default = profileModel;
