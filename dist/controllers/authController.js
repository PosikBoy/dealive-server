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
const authService_1 = __importDefault(require("../services/authService"));
const tokenService_1 = __importDefault(require("../services/tokenService"));
class AuthController {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            // Проверка, что все необходимые поля заполнен
            if (!email || !password) {
                return res.status(400).json({ message: "Заполните все поля" });
            }
            try {
                const user = yield authService_1.default.registerUser(email, password);
                if (!user) {
                    return res
                        .status(400)
                        .json({ message: "Пользователь с такой почтой уже существует" });
                }
                const tokens = tokenService_1.default.generateTokens(user.id);
                const today = new Date();
                res.cookie("refreshToken", tokens.refreshToken, {
                    httpOnly: true,
                    maxAge: 1000 * 60 * 60 * 24 * 30,
                });
                return res.status(201).json({
                    user,
                    accessToken: tokens.accessToken,
                });
            }
            catch (error) {
                return res.status(500).json({ message: error });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            // Проверка, что все необходимые поля заполнены
            if (!email || !password) {
                return res.status(400).json({ message: "Заполните все поля" });
            }
            try {
                const user = yield authService_1.default.login(email, password);
                if (!user) {
                    return res
                        .status(401)
                        .json({ message: "Логин или пароль неправильные" });
                }
                const tokens = tokenService_1.default.generateTokens(user.id);
                res.cookie("refreshToken", tokens.refreshToken, {
                    httpOnly: true,
                    maxAge: 1000 * 60 * 60 * 24 * 30,
                });
                return res.status(201).json({
                    user,
                    accessToken: tokens.accessToken,
                });
            }
            catch (error) {
                return res.status(500).json({ message: error.message });
            }
        });
    }
    refresh(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { refreshToken } = req.cookies;
            try {
                const userData = yield authService_1.default.refresh(refreshToken);
                res.cookie("refreshToken", userData.refreshToken, {
                    httpOnly: true,
                });
                return res.status(201).json({
                    user: userData.user,
                    accessToken: userData.accessToken,
                });
            }
            catch (error) {
                return res.status(400).json({ message: error.message });
            }
        });
    }
    logOut(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.cookies);
            try {
                const refreshToken = req.cookies.refreshToken;
                console.log(refreshToken);
                authService_1.default.logOut(refreshToken);
                res.clearCookie("refreshToken");
                return res.status(200).json({ message: "logout was successfull" });
            }
            catch (error) {
                return res.status(500).json({ message: error });
            }
        });
    }
}
// Аутентификация пользователя
const authController = new AuthController();
exports.default = authController;
