import { Request, Response } from "express";
import profileService from "../services/profileService";

class ProfileController {
  async getProfileInfo(req: Request, res: Response) {
    const bearerHeader = req.headers.authorization;
    if (!bearerHeader) {
      return res.status(401).json({ message: "Auth required" });
    }
    try {
      const [, token] = bearerHeader.split(" ");
      const profile = await profileService.getProfileByToken(token);
      res.status(200).json({ ...profile });
    } catch (error) {
      res.status(400).json({ message: "Error occured" });
    }
  }

  async updateProfileInfo(req: Request, res: Response) {
    const { name, email, phoneNumber } = req.body;
    const bearerHeader = req.headers.authorization;
    if (!bearerHeader) {
      return res.status(401).json({ message: "Auth required" });
    }

    try {
      const [, token] = bearerHeader.split(" ");
      const profile = await profileService.updateProfileInfo(
        token,
        name,
        email,
        phoneNumber
      );

      return res.status(201).json({ ...profile });
    } catch (error: any) {
      console.log(error);
      res.status(400).json({ message: error.message });
    }
  }
}

const profileController = new ProfileController();
export default profileController;
