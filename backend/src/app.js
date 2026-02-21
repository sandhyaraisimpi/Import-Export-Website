import express from "express";
import cookieParser from "cookie-parser";
import customerAuthRouter from "./routers/customer/auth.route.js";
import dotenv from "dotenv"


dotenv.config({
    path:"./.env"
});

const app = express();

app.use(express.json())

app.use("/api/v1/customer/auth", customerAuthRouter)

export default app;