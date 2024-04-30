"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const authRoute_1 = __importDefault(require("./routes/authRoute"));
const profileRoute_1 = __importDefault(require("./routes/profileRoute"));
const orderRoute_1 = __importDefault(require("./routes/orderRoute"));
const app = (0, express_1.default)();
const PORT = process.env.port || 5000;
const corsOptions = {
    origin: /^(https?:\/\/)?(www\.)?localhost:3000(\/.*)?$/,
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
// Подключение роутов
app.use(authRoute_1.default);
app.use(profileRoute_1.default);
app.use(orderRoute_1.default);
app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
});
