"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const refreshToken_model_1 = __importDefault(
  require("../models/refreshToken.model")
);
console.log(process.env);
class TokenService {
  generateTokens(userId) {
    const accessToken = jsonwebtoken_1.default.sign(
      { userId },
      process.env.JWT_ACCESS_SECRET,
      {
        expiresIn: "1h",
      }
    );
    const refreshToken = jsonwebtoken_1.default.sign(
      { userId },
      process.env.JWT_REFRESH_SECRET,
      {
        expiresIn: "30d",
      }
    );
    this.addRefreshToken(refreshToken, userId);
    return { accessToken, refreshToken };
  }
  validateAccessToken(accessToken) {
    const userData = jsonwebtoken_1.default.verify(
      accessToken,
      process.env.JWT_ACCESS_SECRET
    );
    return userData;
  }
  validateRefreshToken(refreshToken) {
    const userData = jsonwebtoken_1.default.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET
    );
    return userData;
  }
  getRefreshToken(refreshToken) {
    return __awaiter(this, void 0, void 0, function* () {
      const tokenData = yield refreshToken_model_1.default.getRefreshToken(
        refreshToken
      );
      return tokenData || null;
    });
  }
  saveRefreshToken(previousRefreshToken, refreshToken) {
    return __awaiter(this, void 0, void 0, function* () {
      const result = yield refreshToken_model_1.default.saveRefreshToken(
        previousRefreshToken,
        refreshToken
      );
      return result;
    });
  }
  addRefreshToken(refreshToken, userId) {
    return __awaiter(this, void 0, void 0, function* () {
      const result = yield refreshToken_model_1.default.addRefreshToken(
        refreshToken,
        userId
      );
      return result;
    });
  }
  removeRefreshToken(refreshToken) {
    return __awaiter(this, void 0, void 0, function* () {
      const token = yield refreshToken_model_1.default.removeRefreshToken(
        refreshToken
      );
      return token;
    });
  }
}
const tokenService = new TokenService();
exports.default = tokenService;
