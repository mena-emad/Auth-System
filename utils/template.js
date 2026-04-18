export const template = (otp)=>{
    return `
        <div style="background-color: #0c0a09; color: #ffffff; font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; padding: 50px 20px; text-align: center;">
                <div style="max-width: 600px; margin: 0 auto; background-color: #1c1917; border: 1px solid #44403c; border-radius: 16px; padding: 40px; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.4);">
                    
                    <h1 style="color: #ffffff; font-size: 28px; font-weight: 800; margin-bottom: 10px; letter-spacing: -0.5px; border-bottom: 2px solid #3b82f6; display: inline-block; padding-bottom: 5px;">
                        AUTH SYSTEM
                    </h1>

                    <p style="font-size: 18px; color: #e7e5e4; margin-top: 30px; font-weight: 500;">
                        Verification Required
                    </p>
                    
                    <p style="font-size: 15px; color: #a8a29e; line-height: 1.6; margin-bottom: 25px;">
                        Welcome! Please enter the OTP code below to securely activate your account.
                        <br>
                        <span style="direction: rtl; display: block; margin-top: 8px; font-family: Arial, sans-serif;">
                            يرجى كتابة الـ OTP في مكانه لتفعيل حسابك.
                        </span>
                    </p>

                    <div style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); border: 1px solid #3b82f6; padding: 25px; margin: 30px 0; border-radius: 12px;">
                        <span style="font-size: 42px; font-weight: 900; color: #3b82f6; letter-spacing: 12px; text-shadow: 0 0 15px rgba(59, 130, 246, 0.3);">
                            ${otp}
                        </span>
                    </div>

                    <p style="font-size: 12px; color: #78716c; margin-top: 25px;">
                        This code is valid for a limited time. If you didn't request this, you can safely ignore this email.
                    </p>

                    <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #44403c;">
                        <p style="font-size: 14px; color: #3b82f6; font-weight: 700; letter-spacing: 1px; margin: 0;">
                            BY MENA EMAD
                        </p>
                    </div>
                </div>
    </div>
    `
}