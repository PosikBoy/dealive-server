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
const bcrypt_1 = __importDefault(require("bcrypt"));
const tokenService_1 = __importDefault(require("./tokenService"));
const profile_model_1 = __importDefault(require("../models/profile.model"));
const auth_model_1 = __importDefault(require("../models/auth.model"));
const profileService_1 = __importDefault(require("./profileService"));
class AuthService {
    registerUser(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const candidate = yield profile_model_1.default.getProfileByEmail(email);
            if (candidate) {
                return null;
            }
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            const userId = yield auth_model_1.default.createClient(email, hashedPassword);
            const user = yield profile_model_1.default.getProfileById(userId);
            return user;
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield profile_model_1.default.getProfileByEmail(email);
            if (!user) {
                return null;
            }
            const hashedPassword = yield auth_model_1.default.getHashedPassword(email);
            const isPasswordValid = yield bcrypt_1.default.compare(password, hashedPassword);
            if (!isPasswordValid) {
                return null;
            }
            return user;
        });
    }
    refresh(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!refreshToken) {
                throw new Error("Auth required");
            }
            const userData = tokenService_1.default.validateRefreshToken(refreshToken);
            if (!userData) {
                throw new Error("jwt expired");
            }
            const tokenFromDB = yield tokenService_1.default.getRefreshToken(refreshToken);
            if (!tokenFromDB) {
                throw new Error("no jwt in db");
            }
            const user = yield profileService_1.default.getProfileById(userData.userId);
            const tokens = tokenService_1.default.generateTokens(userData.userId);
            yield tokenService_1.default.saveRefreshToken(refreshToken, tokens.refreshToken);
            return Object.assign(Object.assign({}, tokens), { user });
        });
    }
    logOut(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield tokenService_1.default.removeRefreshToken(refreshToken);
            return token;
        });
    }
}
const authService = new AuthService();
exports.default = authService;
