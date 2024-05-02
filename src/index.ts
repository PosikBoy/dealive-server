require("dotenv").config();
import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";

import authRoute from "./routes/authRoute";
import profileRoute from "./routes/profileRoute";
import orderRoute from "./routes/orderRoute";

const app = express();
const PORT = 5000;

const corsOptions = {
  origin:"https://dealive.ru" ,
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Подключение роутов
app.use(authRoute);
app.use(profileRoute);
app.use(orderRoute);

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
