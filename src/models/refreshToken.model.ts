import { ResultSetHeader, RowDataPacket } from "mysql2";
import db from "../config/db";
import { IRefreshToken } from "../types/token.interface";

class TokenModel {
  async getRefreshToken(refreshToken: string): Promise<IRefreshToken | null> {
    try {
      const getRefreshTokenQuery =
        "SELECT * FROM refresh_tokens WHERE refresh_token = ?";

      const [result] = await db.execute<RowDataPacket[]>(getRefreshTokenQuery, [
        refreshToken,
      ]);

      if (result && result.length > 0) {
        const tokenData = {
          id: result[0].id,
          refreshToken: result[0].refresh_token,
          userId: result[0].user_id,
        };
        return tokenData;
      } else {
        return null;
      }
    } catch (error) {
      throw new Error("Error occurred while fetching the refresh token");
    }
  }

  async addRefreshToken(refreshToken: string, userId: number): Promise<number> {
    try {
      const addRefreshTokenQuery =
        "INSERT INTO refresh_tokens (refresh_token, user_id) VALUES (?, ?)";
      const [result] = await db.execute<ResultSetHeader>(addRefreshTokenQuery, [
        refreshToken,
        userId,
      ]);
      return result.insertId;
    } catch (error) {
      throw new Error("Error adding refresh token to db");
    }
  }
  async saveRefreshToken(previousRefreshToken: string, refreshToken: string) {
    try {
      const saveRefreshTokenQuery =
        "UPDATE refresh_tokens SET refresh_token = ? WHERE refresh_token = ?";
      const [result] = await db.execute(saveRefreshTokenQuery, [
        refreshToken,
        previousRefreshToken,
      ]);
      return result;
    } catch (error) {
      console.log(error);

      throw new Error("Error occurred while saving token to db");
    }
  }
  async removeRefreshToken(refreshToken: string) {
    try {
      const removeRefreshTokenQuery =
        "DELETE FROM refresh_tokens WHERE refresh_token = ?";
      await db.execute(removeRefreshTokenQuery, [refreshToken]);
      return refreshToken;
    } catch (error) {
      console.log(error);
    }
  }
}

const tokenModel = new TokenModel();
export default tokenModel;
