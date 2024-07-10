import jwt from "jsonwebtoken";
import "dotenv/config";

import { ITokens } from "../types/token.interface";
interface JwtPayload {
  userId: number;
}
class TokenService {
  generateTokens(userId: number): ITokens {
    const accessToken = jwt.sign({ userId }, process.env.JWT_ACCESS_SECRET!, {
      expiresIn: "1s",
    });
    const refreshToken = jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET!, {
      expiresIn: "30d",
    });
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
}

const tokenService = new TokenService();

export default tokenService;
