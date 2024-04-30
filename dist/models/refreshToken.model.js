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
class TokenModel {
    getRefreshToken(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const getRefreshTokenQuery = "SELECT * FROM refresh_tokens WHERE refresh_token = ?";
                const [result] = yield db_1.default.execute(getRefreshTokenQuery, [
                    refreshToken,
                ]);
                if (result && result.length > 0) {
                    const tokenData = {
                        id: result[0].id,
                        refreshToken: result[0].refresh_token,
                        userId: result[0].user_id,
                    };
                    return tokenData;
                }
                else {
                    return null;
                }
            }
            catch (error) {
                throw new Error("Error occurred while fetching the refresh token");
            }
        });
    }
    addRefreshToken(refreshToken, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const addRefreshTokenQuery = "INSERT INTO refresh_tokens (refresh_token, user_id) VALUES (?, ?)";
                const [result] = yield db_1.default.execute(addRefreshTokenQuery, [
                    refreshToken,
                    userId,
                ]);
                return result.insertId;
            }
            catch (error) {
                throw new Error("Error adding refresh token to db");
            }
        });
    }
    saveRefreshToken(previousRefreshToken, refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const saveRefreshTokenQuery = "UPDATE refresh_tokens SET refresh_token = ? WHERE refresh_token = ?";
                const [result] = yield db_1.default.execute(saveRefreshTokenQuery, [
                    refreshToken,
                    previousRefreshToken,
                ]);
                return result;
            }
            catch (error) {
                throw new Error("Error occurred while saving token to db");
            }
        });
    }
    removeRefreshToken(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const removeRefreshTokenQuery = "DELETE FROM refresh_tokens WHERE refresh_token = ?";
                yield db_1.default.execute(removeRefreshTokenQuery, [refreshToken]);
                return refreshToken;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
const tokenModel = new TokenModel();
exports.default = tokenModel;
