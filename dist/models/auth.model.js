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
class AuthModel {
    createClient(email, hashedPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createUserQuery = "INSERT INTO clients (email, hash_pass) VALUES (?, ?)";
                const result = yield db_1.default.execute(createUserQuery, [
                    email,
                    hashedPassword,
                ]);
                return result[0].insertId;
            }
            catch (error) {
                throw new Error("Error occured during creating client");
            }
        });
    }
    getHashedPassword(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const getHashedPasswordQuery = "SELECT hash_pass FROM clients WHERE email = ?";
                const [result] = yield db_1.default.execute(getHashedPasswordQuery, [email]);
                const hashedPassword = result[0].hash_pass;
                return hashedPassword;
            }
            catch (error) {
                throw new Error("Error occured during fetching hashed password from db");
            }
        });
    }
}
const authModel = new AuthModel();
exports.default = authModel;
