import { ResultSetHeader, RowDataPacket } from "mysql2";
import db from "../config/db";

import { IProfile } from "../types/profile.interface";
import { error } from "console";

class ProfileModel {
  async getProfileById(userId: number): Promise<IProfile> {
    try {
      const getProfileByIdQuery =
        "SELECT id, name, email, phone_number FROM clients WHERE id = ?";
      const [result] = await db.execute<RowDataPacket[]>(getProfileByIdQuery, [
        userId,
      ]);

      if (result.length === 0) {
        throw new Error("Profile not found in the database");
      }

      const profile = {
        id: result[0].id,
        name: result[0].name,
        email: result[0].email,
        phoneNumber: result[0].phone_number,
      };
      return profile;
    } catch (error) {
      throw new Error(
        "Error occurred while fetching profile by id from the database"
      );
    }
  }

  async getProfileByEmail(email: string): Promise<IProfile | null> {
    const getProfileByEmailQuery =
      "SELECT id, name, email, phone_number FROM clients WHERE email = ?";
    try {
      const [result] = await db.execute<RowDataPacket[]>(
        getProfileByEmailQuery,
        [email]
      );
      if (result.length === 0) {
        return null;
      }
      const profile = {
        id: result[0].id,
        name: result[0].name,
        email: result[0].email,
        phoneNumber: result[0].phone_number,
      };
      return profile;
    } catch (error) {
      throw new Error(
        "Error occurred while fetching profile by email from the database" +
          error
      );
    }
  }
  async updateProfileInfo(
    userId: number,
    name: string,
    email: string,
    phoneNumber: string
  ): Promise<IProfile> {
    if (!phoneNumber) {
      throw Error("Введите номер телефона!");
    }
    const findUserByPhoneNumberQuery =
      "SELECT * FROM clients WHERE phone_number = ?";
    try {
      const [result] = await db.execute<RowDataPacket[]>(
        findUserByPhoneNumberQuery,
        [phoneNumber]
      );
      if (result[0]?.id !== userId && result.length > 0) {
        throw new Error("Пользователь с таким номером уже существует");
      }
    } catch (error) {
      console.log(error);

      throw error;
    }
    if (!email) {
      throw Error("Введите электронную почту!");
    }
    const findUserByEmailQuery = "SELECT * FROM clients WHERE email = ?";
    try {
      const [result] = await db.execute<RowDataPacket[]>(findUserByEmailQuery, [
        email,
      ]);
      if (result[0]?.id !== userId && result.length > 0) {
        throw new Error("Пользователь с таким email уже существует");
      }
    } catch (error) {
      console.log(error);

      throw error;
    }

    const updateProfileInfoQuery =
      "UPDATE clients SET name = ?, email = ?, phone_number = ? WHERE id = ?";

    try {
      await db.execute<ResultSetHeader>(updateProfileInfoQuery, [
        name,
        email,
        phoneNumber,
        userId,
      ]);
      const profile = {
        id: userId,
        name: name,
        email: email,
        phoneNumber: phoneNumber,
      };
      return profile;
    } catch (error) {
      throw error;
    }
  }
}

const profileModel = new ProfileModel();
export default profileModel;
