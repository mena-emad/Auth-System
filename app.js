import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./data/data.js";
import gerror from "./utils/gerror.js";
import router from "./modules/auth/auth.routes.js";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
//routes
app.use("/",router);
//gerror
app.use(gerror)


export default app;