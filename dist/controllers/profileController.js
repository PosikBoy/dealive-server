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
const profileService_1 = __importDefault(require("../services/profileService"));
class ProfileController {
    getProfileInfo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const bearerHeader = req.headers.authorization;
            if (!bearerHeader) {
                return res.status(401).json({ message: "Auth required" });
            }
            try {
                const [, token] = bearerHeader.split(" ");
                const profile = yield profileService_1.default.getProfileByToken(token);
                res.status(200).json(Object.assign({}, profile));
            }
            catch (error) {
                res.status(400).json({ message: "Error occured" });
            }
        });
    }
    updateProfileInfo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, phoneNumber } = req.body;
            const bearerHeader = req.headers.authorization;
            if (!bearerHeader) {
                return res.status(401).json({ message: "Auth required" });
            }
            try {
                const [, token] = bearerHeader.split(" ");
                const profile = yield profileService_1.default.updateProfileInfo(token, name, email, phoneNumber);
                return res.status(201).json(Object.assign({}, profile));
            }
            catch (error) {
                console.log(error);
                res.status(400).json({ message: error.message });
            }
        });
    }
}
const profileController = new ProfileController();
exports.default = profileController;
