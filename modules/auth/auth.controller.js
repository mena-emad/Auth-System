import catchAsync from "../../utils/catchAsync.js";
import { generateNewAccessTokenService, generateOTPandSend, loginService, logoutService, signUpService, verifyEmailService ,getMeService} from "./auth.service.js";

export const signUp = catchAsync(async(req,res,next)=>{
    const data = {
        email:req.body.email,
        password:req.body.password,
        userName:req.body.userName,
        role:req.body.role || "user"
    }
    const user = await signUpService(data.email,data.password,data.userName,data.role);
    res.status(201).json({success:true,user,message:"User created successfully Check your email to verify your account"});
     
})

export const generateOtp = catchAsync(async(req,res,next)=>{
    const data = {
        email:req.body.email
    }
    const result = await generateOTPandSend(data.email);
    res.status(200).json(result);
})

export const verifyEmail = catchAsync(async(req,res,next)=>{
    const data = {
        email:req.body.email,
        otp:req.body.otp
    }
    const user = await verifyEmailService(data.email,data.otp);
    res.cookie("accessToken",user.accessToken,{httpOnly:true,secure:true,sameSite:"none",maxAge:1000*60*10});
    res.cookie("refreshToken",user.refreshToken,{httpOnly:true,secure:true,sameSite:"none",maxAge:1000*60*60*24*7});
    res.status(200).json({success:true,user,message:"Email verified successfully",redirectTo:"/home"});
})

export const login = catchAsync(async(req,res,next)=>{
    const data = {
        email:req.body.email,
        password:req.body.password
    }
    const result = await loginService(data.email,data.password);
    if(!result.isVerifed)
        res.status(401).json({success:false,message:"Please check your email and verify your account"});
    res.cookie("accessToken",result.accessToken,{httpOnly:true,secure:true,sameSite:"none",maxAge:1000*60*10});
    res.cookie("refreshToken",result.refreshToken,{httpOnly:true,secure:true,sameSite:"none",maxAge:1000*60*60*24*7});
    res.status(200).json(result);
})

export const logout = catchAsync(async(req,res,next)=>{
    const result = await logoutService(req.user._id,req.cookies.refreshToken);
    res.cookie("accessToken",null,{httpOnly:true,secure:true,sameSite:"none",maxAge:0});
    res.cookie("refreshToken",null,{httpOnly:true,secure:true,sameSite:"none",maxAge:0});
    res.status(200).json({success:true,message:"Logout successfully",result});
})

export const generateNewAccessToken = catchAsync(async(req,res,next)=>{
    const result = await generateNewAccessTokenService(req.cookies.refreshToken);
    res.cookie("accessToken",result.accessToken,{httpOnly:true,secure:true,sameSite:"none",maxAge:1000*60*10});
    res.cookie("refreshToken",result.refreshToken,{httpOnly:true,secure:true,sameSite:"none",maxAge:1000*60*60*24*7});
    res.status(200).json(result);
})

export const getMe = catchAsync(async(req,res,next)=>{
    const user = await getMeService(req.user._id);
    res.status(200).json({success:true,user});
})