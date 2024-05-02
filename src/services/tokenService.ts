import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// Загружаем переменные окружения из файла .env
dotenv.config();

import { ITokens } from "../types/token.interface";

import tokenModel from "../models/refreshToken.model";

interface JwtPayload {
  userId: number;
}
console.log(process.env);
class TokenService {
  generateTokens(userId: number): ITokens {
    const accessToken = jwt.sign({ userId }, process.env.JWT_ACCESS_SECRET!, {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET!, {
      expiresIn: "30d",
    });
    this.addRefreshToken(refreshToken, userId);
    return { accessToken, refreshToken };
  }
  validateAccessToken(accessToken: string): JwtPayload {
    const userData = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET!);
    return userData as JwtPayload;
  }
  validateRefreshToken(refreshToken: string): JwtPayload {
    const userData = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET!
    ) as JwtPayload;
    return userData;
  }
  async getRefreshToken(refreshToken: string) {
    const tokenData = await tokenModel.getRefreshToken(refreshToken);
    return tokenData || null;
  }
  async saveRefreshToken(previousRefreshToken: string, refreshToken: string) {
    const result = await tokenModel.saveRefreshToken(
      previousRefreshToken,
      refreshToken
    );
    return result;
  }
  async addRefreshToken(refreshToken: string, userId: number) {
    const result = await tokenModel.addRefreshToken(refreshToken, userId);
    return result;
  }
  async removeRefreshToken(refreshToken: string) {
    const token = await tokenModel.removeRefreshToken(refreshToken);
    return token;
  }
}

const tokenService = new TokenService();

export default tokenService;
