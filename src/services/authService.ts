import bcrypt from "bcrypt";
import tokenService from "./tokenService";
import profileModel from "../models/profile.model";
import authModel from "../models/auth.model";
import profileService from "./profileService";
import { IProfile } from "../types/profile.interface";

class AuthService {
  async registerUser(email: string, password: string): Promise<IProfile> {
    const candidate: any = await profileModel.getProfileByEmail(email);
    if (candidate) {
      throw new Error("Пользователь с такой почтой уже существует");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = await authModel.createUser(email, hashedPassword);
    const user = await profileModel.getProfileById(userId);
    return user;
  }
  async login(email: string, password: string): Promise<IProfile> {
    const user = await profileModel.getProfileByEmail(email);
    if (!user) {
      throw new Error("Почта или пароль неправильные");
    }
    const hashedPassword = await authModel.getHashedPassword(email);
    const isPasswordValid = await bcrypt.compare(password, hashedPassword);
    console.log("isPasswordValid", isPasswordValid);
    if (!isPasswordValid) {
      throw new Error("Почта или пароль неправильные");
    }
    return user;
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw new Error("Auth required");
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    if (!userData) {
      throw new Error("jwt expired");
    }

    const user = await profileService.getProfileById(userData.userId);
    const tokens = tokenService.generateTokens(userData.userId);
    return {
      ...tokens,
      user,
    };
  }
}

const authService = new AuthService();
export default authService;
