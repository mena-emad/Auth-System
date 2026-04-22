import jwt from "jsonwebtoken";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";
import User from "../data/models/User.js";
const protect = catchAsync(async(req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1];
    }else if(req.cookies && req.cookies.accessToken){
        token = req.cookies.accessToken;
    }
    if(!token)
        return next(new AppError("Unauthorized",401));
    let decoded;
    try{
        decoded = jwt.verify(token,process.env.JWT_AT_SECRET);
    }catch(err){
        return next(new AppError("Unauthorized",401));
    }
    const currentUser = await User.findById(decoded.id);
    if(!currentUser)
        return next(new AppError("Unauthorized",401));
    req.user = currentUser;
    next();


})

export default protect;