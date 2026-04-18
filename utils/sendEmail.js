import nodemailer from "nodemailer";
import { template } from "./template.js";

const sendEmail = async (options)=>{
    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.EMAIL,
            pass:process.env.PASSWORD
        }
    });
    const mailOptions = {
        from:process.env.EMAIL,
        to:options.email,
        html:template(options.OTP)
    }
    await transporter.sendMail(mailOptions);
}

export default sendEmail