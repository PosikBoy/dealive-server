import mysql, { PoolOptions } from "mysql2";
require("dotenv").config();

const access: PoolOptions = {
  host: "localhost",
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  connectionLimit: 10, // Количество одновременных соединений в пуле
};

const pool = mysql.createPool(access);

const promisePool = pool.promise();

export default promisePool;
