"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tokenService_1 = __importDefault(require("../services/tokenService"));
class AuthMiddleware {
    authCheck(req, res, next) {
        const bearerHeader = req.headers.authorization;
        if (!bearerHeader) {
            return res.status(401).json({ message: "Auth required" });
        }
        const accessToken = bearerHeader.split(" ")[1];
        if (!accessToken) {
            return res.status(401).json({ message: "Auth required" });
        }
        try {
            const userData = tokenService_1.default.validateAccessToken(accessToken);
            if (!userData) {
                return res.status(401).json({ message: "jwt expired" });
            }
        }
        catch (_a) {
            return res.status(401).json({ message: "jwt expired" });
        }
        next();
    }
}
const authMiddleware = new AuthMiddleware();
exports.default = authMiddleware;
