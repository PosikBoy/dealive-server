// authController.js
import { Request, Response } from "express";
import authService from "../services/authService";
import tokenService from "../services/tokenService";

class AuthController {
  async register(req: Request, res: Response) {
    const { email, password } = req.body;
    // Проверка, что все необходимые поля заполнен
    if (!email || !password) {
      return res.status(400).json({ message: "Заполните все поля" });
    }
    try {
      const user = await authService.registerUser(email, password);
      if (!user) {
        return res
          .status(400)
          .json({ message: "Пользователь с такой почтой уже существует" });
      }
      const tokens = tokenService.generateTokens(user.id);
      res.cookie("refreshToken", tokens.refreshToken, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 30,
      });
      return res.status(201).json({
        user,
        accessToken: tokens.accessToken,
      });
    } catch (error: any) {
      return res.status(500).json({ message: error });
    }
  }
  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    // Проверка, что все необходимые поля заполнены
    if (!email || !password) {
      return res.status(400).json({ message: "Заполните все поля" });
    }
    try {
      const user = await authService.login(email, password);
      if (!user) {
        return res
          .status(401)
          .json({ message: "Логин или пароль неправильные" });
      }
      const tokens = tokenService.generateTokens(user.id);
      res.cookie("refreshToken", tokens.refreshToken, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 30,
      });

      return res.status(201).json({
        user,
        accessToken: tokens.accessToken,
      });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
  async refresh(req: Request, res: Response) {
    const { refreshToken } = req.cookies;
    try {
      const userData = await authService.refresh(refreshToken);
      res.cookie("refreshToken", userData.refreshToken, {
        httpOnly: true,
      });

      return res.status(201).json({
        user: userData.user,
        accessToken: userData.accessToken,
      });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
  async logOut(req: Request, res: Response) {
    console.log(req.cookies);
    try {
      const refreshToken = req.cookies.refreshToken;
      console.log(refreshToken);
      authService.logOut(refreshToken);
      res.clearCookie("refreshToken");
      return res.status(200).json({ message: "logout was successfull" });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }
}

// Аутентификация пользователя

const authController = new AuthController();
export default authController;
