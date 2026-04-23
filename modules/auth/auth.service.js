import User from "../../data/models/User.js";
import catchAsync from "../../utils/catchAsync.js";
import AppError from "../../utils/AppError.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import sendEmail from "../../utils/sendEmail.js";
import { generateAccessToken, generateRefreshToken } from "../../utils/generateTokens.js";

export const generateOTPandSend = async(email)=>{
    const user = await User.findOne({email}).select("+lastOTPreq");
    const coolDown = 1000 *30;
    if(user.lastOTPreq && (Date.now() - user.lastOTPreq) < coolDown)
        throw new AppError("Please wait for 30 seconds before requesting another OTP",429);
    if(!user)
        throw new AppError("User not found",404);
    if(user.isVerifed)
        throw new AppError("User already verified",400);
    const otp = crypto.randomInt(100000,999999).toString();
    const expiryOTP = Date.now() + 1000 * 60 * 10;
    const hashOTP = await bcrypt.hash(otp,10);
    user.OTP = hashOTP;
    user.OTPExpiresAt = new Date(expiryOTP);
    user.lastOTPreq = Date.now();
    await user.save({validateBeforeSave:false});
    await sendEmail({email,OTP:otp});
    return {success:true , message:"OTP sent successfully check your email"};
}

export const signUpService = async(email,password,userName,role)=>{
    let user = await User.findOne({email});
    if(user)
        throw new AppError("User already exists",400);
    if(role==="admin") throw new AppError("Only user can register",401);
    user = await User.create({email,password,userName,role});
    await generateOTPandSend(email);
    return user;
}

export const loginService = async(email,password)=>{
    const user = await User.findOne({email}).select("+password +refreshTokens +OTP +OTPExpiresAt");
    if(!user)
        throw new AppError("User not found",404);
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch)
        throw new AppError("Email or password is incorrect",401);
    if(!user.isVerifed){
        if(user.OTP && user.OTPExpiresAt > Date.now())
            throw new AppError("please check your email and verify your account you have otp arleady",401);
        if(user.refreshTokens.length >= 5)
            user.refreshTokens.shift();
        await generateOTPandSend(email);
        return {isVerifed:false};
    }
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    const hashRefreshToken = await crypto.createHash("sha256").update(refreshToken).digest("hex");
    user.refreshTokens.push(hashRefreshToken);
    await user.save({validateBeforeSave:false});
    user.password = undefined;
    user.refreshTokens = [];
    user.OTP = undefined;
    user.OTPExpiresAt = undefined;
    return {isVerifed:true,user,accessToken,refreshToken};
}


export const logoutService = async(userId,incomingRefreshToken)=>{
    const hashRefreshToken = await crypto.createHash("sha256").update(incomingRefreshToken).digest("hex");
    const user = await User.findById(userId).select("+refreshTokens");
    if(!user)
        throw new AppError("User not found",404);
    user.refreshTokens = user.refreshTokens.filter(rt=>rt!==hashRefreshToken);
    await user.save({validateBeforeSave:false});
    user.refreshTokens = [];
    return {success:true,message:"Logged out successfully"};
    
}

export const verifyEmailService = async(email,otp)=>{
    const user = await User.findOne({email}).select("+OTP +OTPExpiresAt +refreshTokens" );
    if(!user)
        throw new AppError("User not found",404);
    if(user.OTPExpiresAt < Date.now())
        throw new AppError("OTP expired",400);
    const isMatch = await bcrypt.compare(otp,user.OTP);
    if(!isMatch)
        throw new AppError("Invalid OTP",400);
    user.isVerifed = true;
    user.OTP = undefined;
    user.OTPExpiresAt = undefined;
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    const hashRefreshToken = await crypto.createHash("sha256").update(refreshToken).digest("hex");
    user.refreshTokens.push(hashRefreshToken);
    await user.save({validateBeforeSave:false});
    return {success:true,user,accessToken,refreshToken};
}

export const generateNewAccessTokenService = async(incomingRefreshToken)=>{
    console.log(incomingRefreshToken);
    if(!incomingRefreshToken)
        throw new AppError("please login again",401);
    let decoded;
    try{
        decoded = jwt.verify(incomingRefreshToken,process.env.JWT_RT_SECRET);
        console.log(decoded)
    }catch(err){
        console.log(decoded);
        throw new AppError("Refresh token is invalid or expired",401);
    }
    const hashIncomingRefreshToken = await crypto.createHash("sha256").update(incomingRefreshToken).digest("hex");
    const user = await User.findOne({_id:decoded.id,refreshTokens:hashIncomingRefreshToken}).select("+refreshTokens");
    if(!user)
        throw new AppError("User not found",404);    
    if(!user.isVerifed)
        throw new AppError("Please verify your email",401);
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    const hashRefreshToken = await crypto.createHash("sha256").update(refreshToken).digest("hex");
    user.refreshTokens = user.refreshTokens.filter(rt=>rt!== hashIncomingRefreshToken);
    user.refreshTokens.push(hashRefreshToken);
    await user.save({validateBeforeSave:false});
    user.refreshTokens = [];
    return {success:true,accessToken,refreshToken,message:"New access token generated successfully"};
}

export const getMeService = async(userId)=>{
    const user = await User.findById(userId);
    if(!user)
        throw new AppError("User not found",404);
    return {
        _id:user._id,
        email:user.email,
        userName:user.userName,
        role:user.role
    };
    
}