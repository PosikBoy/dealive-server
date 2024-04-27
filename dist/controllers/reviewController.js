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
const reviewModel = require("../models/review.model.js");
exports.sendReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { rating, advantages, disadvantages, description } = req.body;
    const bearerHeader = req.headers.authorization;
    try {
        const [, token] = bearerHeader.split(" ");
        const review = yield reviewModel.sendReview(token, rating, advantages, disadvantages, description);
        return res.status(201).json({ message: "query was successful", review });
    }
    catch (error) {
        console.log(error);
    }
});
