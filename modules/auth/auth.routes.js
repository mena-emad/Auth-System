import {Router} from "express"
import { generateNewAccessToken, generateOtp, getMe, login, logout, signUp, verifyEmail } from "./auth.controller.js";
import validation from "../../middleware/validation.js";
import { loginSchema, signupSchema } from "./auth.validation.js";
import protect from "../../middleware/auth.js";

const router = Router();
router.post("/signup",validation(signupSchema),signUp);
router.post("/login",validation(loginSchema),login);
router.post("/generate-otp",generateOtp);
router.post("/verify-email",verifyEmail);
router.post("/generatenewaccesstoken",generateNewAccessToken);
router.use(protect);
router.post("/logout",logout);
router.get("/me",getMe);

export default router