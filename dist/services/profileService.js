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
const tokenService_1 = __importDefault(require("./tokenService"));
const profile_model_1 = __importDefault(require("../models/profile.model"));
class ProfileService {
    getProfileById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (userId) {
                    const profile = yield profile_model_1.default.getProfileById(userId);
                    return profile;
                }
                else {
                    throw new Error("UserId required");
                }
            }
            catch (error) {
                throw new Error("Error occured");
            }
        });
    }
    getProfileByToken(accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const userData = tokenService_1.default.validateAccessToken(accessToken);
            if (userData) {
                const profile = yield profile_model_1.default.getProfileById(userData.userId);
                return profile;
            }
            else {
                throw new Error("UserId required");
            }
        });
    }
    updateProfileInfo(accessToken, name, email, phoneNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            const userData = tokenService_1.default.validateAccessToken(accessToken);
            const profile = yield profile_model_1.default.updateProfileInfo(userData.userId, name, email, phoneNumber);
            return profile;
        });
    }
}
const profileService = new ProfileService();
exports.default = profileService;
