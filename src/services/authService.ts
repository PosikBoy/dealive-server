import bcrypt from "bcrypt";
import tokenService from "./tokenService";
import profileModel from "../models/profile.model";
import authModel from "../models/auth.model";
import profileService from "./profileService";
import { IProfile } from "../types/profile.interface";

class AuthService {
  async registerUser(
    email: string,
    password: string
  ): Promise<IProfile | null> {
    const candidate: any = await profileModel.getProfileByEmail(email);
    if (candidate) {
      return null;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = await authModel.createClient(email, hashedPassword);
    const user = await profileModel.getProfileById(userId);
    return user;
  }
  async login(email: string, password: string): Promise<IProfile | null> {
    const user = await profileModel.getProfileByEmail(email);
    if (!user) {
      return null;
    }
    const hashedPassword = await authModel.getHashedPassword(email);
    const isPasswordValid = await bcrypt.compare(password, hashedPassword);
    if (!isPasswordValid) {
      return null;
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

    const tokenFromDB = await tokenService.getRefreshToken(refreshToken);
    if (!tokenFromDB) {
      throw new Error("no jwt in db");
    }
 
    const user = await profileService.getProfileById(userData.userId);
    const tokens = tokenService.generateTokens(userData.userId);
 
    await tokenService.saveRefreshToken(refreshToken, tokens.refreshToken);
    return {
      ...tokens,
      user,
    };
  }
  async logOut(refreshToken: string) {
    const token = await tokenService.removeRefreshToken(refreshToken);
    return token;
  }
}

const authService = new AuthService();
export default authService;
