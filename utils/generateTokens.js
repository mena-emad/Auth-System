import jwt from "jsonwebtoken";
export const generateRefreshToken = (user)=>{
    return jwt.sign({id:user._id , role:user.role , version:crypto.randomUUID()},process.env.JWT_RT_SECRET,{expiresIn:"7d"});
}

export const generateAccessToken = (user)=>{
    return jwt.sign({id:user._id , role:user.role},process.env.JWT_AT_SECRET,{expiresIn:"10m"});
}