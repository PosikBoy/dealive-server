import mysql, { PoolOptions } from "mysql2";
require("dotenv").config();

const access: PoolOptions = {
  host: "localhost",
  user: "admin",
  database: "dealive",
  password: 'BeHcUk05042005!',
  connectionLimit: 10, // Количество одновременных соединений в пуле
};

const pool = mysql.createPool(access);

const promisePool = pool.promise();

export default promisePool;
