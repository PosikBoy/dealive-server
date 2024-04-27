import tokenService from "./tokenService";
import profileModel from "../models/profile.model";

class ProfileService {
  async getProfileById(userId: number) {
    try {
      if (userId) {
        const profile = await profileModel.getProfileById(userId);
        return profile;
      } else {
        throw new Error("UserId required");
      }
    } catch (error) {
      throw new Error("Error occured");
    }
  }

  async getProfileByToken(accessToken: string) {
    const userData = tokenService.validateAccessToken(accessToken);
    if (userData) {
      const profile = await profileModel.getProfileById(userData.userId);
      return profile;
    } else {
      throw new Error("UserId required");
    }
  }
  async updateProfileInfo(
    accessToken: string,
    name: string,
    email: string,
    phoneNumber: string
  ) {
    const userData = tokenService.validateAccessToken(accessToken);
    const profile = await profileModel.updateProfileInfo(
      userData.userId,
      name,
      email,
      phoneNumber
    );
    return profile;
  }
}

const profileService = new ProfileService();
export default profileService;
