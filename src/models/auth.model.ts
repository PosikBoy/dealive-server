import { ResultSetHeader, RowDataPacket } from "mysql2";
import db from "../config/db";

class AuthModel {
  async createClient(email: string, hashedPassword: string): Promise<number> {
    try {
      const createUserQuery =
        "INSERT INTO clients (email, hash_pass) VALUES (?, ?)";
      const result = await db.execute<ResultSetHeader>(createUserQuery, [
        email,
        hashedPassword,
      ]);
      return result[0].insertId;
    } catch (error) {
      throw new Error("Error occured during creating client");
    }
  }

  async getHashedPassword(email: string): Promise<string> {
    try {
      const getHashedPasswordQuery =
        "SELECT hash_pass FROM clients WHERE email = ?";
      const [result] = await db.execute<RowDataPacket[]>(
        getHashedPasswordQuery,
        [email]
      );
      const hashedPassword = result[0].hash_pass;
      return hashedPassword;
    } catch (error) {
      throw new Error("Error occured during fetching hashed password from db");
    }
  }
}

const authModel = new AuthModel();
export default authModel;
