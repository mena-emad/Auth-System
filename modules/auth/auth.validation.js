import Joi from "joi";

export const signupSchema = Joi.object({
    userName:Joi.string().min(2).max(30).required().messages({
        "string.empty":"Name is required",
        "string.min":"Name must be at least 2 characters long",
        "string.max":"Name must be at most 30 characters long",
        "any.required":"Name is required"
    }),
    email:Joi.string().email().required().messages({
        "string.empty":"Email is required",
        "string.email":"Invalid email format",
        "any.required":"Email is required"
    }),
    password:Joi.string().min(6).required().messages({
        "string.empty":"Password is required",
        "string.min":"Password must be at least 6 characters long",
        "any.required":"Password is required"
    }),
    confirmPassword:Joi.string().valid(Joi.ref("password")).required().messages({
        "string.empty":"Confirm password is required",
        "any.only":"Passwords do not match",
        "any.required":"Confirm password is required"
    }),
    role:Joi.string().valid("user","admin").required().messages({
        "string.empty":"Role is required",
        "any.only":"Invalid role",
        "any.required":"Role is required"
    })
})

export const loginSchema = Joi.object({
    email:Joi.string().email().required().messages({
        "string.empty":"Email is required",
        "string.email":"Invalid email format",
        "any.required":"Email is required"
    }),
    password:Joi.string().min(6).required().messages({
        "string.empty":"Password is required",
        "string.min":"Password must be at least 6 characters long",
        "any.required":"Password is required"
    })
})