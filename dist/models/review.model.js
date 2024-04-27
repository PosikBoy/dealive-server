"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//review.module.js
const db = require("../config/db");
const jwt = require("jsonwebtoken");
exports.sendReview = (token, rating, advantages, disadvantages, description) => __awaiter(void 0, void 0, void 0, function* () {
    const decoded = jwt.verify(token, "posik");
    const userId = decoded.userId; // Получение id пользователя
    const sendReviewQuery = "INSERT INTO reviews (client_id, rating, advantages, disadvantages, description) VALUES ( ?, ?, ?, ?, ?)";
    const [result] = yield db.execute(sendReviewQuery, [
        userId,
        rating,
        advantages,
        disadvantages,
        description,
    ]);
    return result;
});
