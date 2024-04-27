import { NextFunction, Request, Response } from "express";
import tokenService from "../services/tokenService";

class AuthMiddleware {
  authCheck(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Auth required" });
    }
    const accessToken = authHeader.split(" ")[1];
    if (!accessToken) {
      return res.status(401).json({ message: "Auth required" });
    }
    try {
      const userData = tokenService.validateAccessToken(accessToken);
      if (!userData) {
        return res.status(401).json({ message: "jwt expired" });
      }
    } catch {
      return res.status(401).json({ message: "jwt expired" });
    }
    next();
  }
}

const authMiddleware = new AuthMiddleware();
export default authMiddleware;
