"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql2_1 = __importDefault(require("mysql2"));
require("dotenv").config();
const access = {
    host: "localhost",
    user: "admin",
    database: "dealive",
    password: 'BeHcUk05042005!',
    connectionLimit: 10, // Количество одновременных соединений в пуле
};
const pool = mysql2_1.default.createPool(access);
const promisePool = pool.promise();
exports.default = promisePool;
