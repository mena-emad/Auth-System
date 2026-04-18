import mongoose from "mongoose";
import hashPassword from "../../utils/hashPass.js";

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:[true,"User name is required"]
    },
    email:{
        type:String,
        required:[true,"Email is required"]
    },
    password:{
        type:String,
        select:false,
        required:[true,"Password is required"]
    },
    refreshTokens:{
        type:[String],
        default:[],
        select:false,
        validate:{
            validator(value){
                return value.length <= 5
            },
            message:"Refresh token limit exceeded"
        },
        select:false
    },
    OTP:{
        type:String,
        select:false,
    },

    lastOTPreq:{
        type:Date,
        select:false
    },

    OTPExpiresAt:{
        type:Date,
        select:false,
    },
    isVerifed:{
        type:Boolean,
        default:false
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    }
},{timestamps:true,versionKey:false});
hashPassword(userSchema);
const User = mongoose.model("User",userSchema);
export default User;