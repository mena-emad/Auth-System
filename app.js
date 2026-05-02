import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./data/data.js";
import gerror from "./utils/gerror.js";
import * as swaggeUi from "swagger-ui-express";
import router from "./modules/auth/auth.routes.js";
import YAML from "yamljs";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)
const swaggerDoc = YAML.load(__dirname + "/swagger.yaml");
dotenv.config();
const app = express();
app.use(cors({
  origin:["http://localhost:5173","https://auth-ment-system.netlify.app"],
  credentials:true,
  methods:["GET","POST","PUT","DELETE"],
  allowedHeaders:["Content-Type","Authorization"]
}));
const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";
const JS_URLS = [
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui-bundle.js",
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui-standalone-preset.js"
];
app.use("/api-docs",swaggeUi.serve,swaggeUi.setup(swaggerDoc,{
  customCss:'.swagger-ui .opblock .opblock-summary-path-description-wrapper { align-items: center; display: flex; flex-wrap: wrap; gap: 0 10px; padding: 0 10px; width: 100%; }',
  customCssUrl: CSS_URL,
  customJs: JS_URLS
}));
app.use(express.json());
app.use(cookieParser());
//routes
app.use("/",router);
//gerror
app.use(gerror)


export default app;