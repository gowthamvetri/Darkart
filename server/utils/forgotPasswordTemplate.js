const forgotPasswordTemplate = ({ name, otp }) => {
    return `
<div style="background-color: #121212; color: #ffffff; padding: 20px; font-family: Arial, sans-serif; border-radius: 10px;">
    <p style="font-size: 18px;">Dear, <strong>${name}</strong></p>
    <p>You've requested a password reset. Please use the following OTP code to reset your password.</p>
    <div style="background: #007BFF; color: #ffffff; font-size: 24px; padding: 15px; text-align: center; font-weight: bold; border-radius: 5px;">
        ${otp}
    </div>
    <p style="margin-top: 15px;">This OTP is valid for <strong>1 hour</strong> only. Enter this OTP on the <strong>DarkCart</strong> website to proceed with resetting your password.</p>
    <br/>
    <p>Thanks,</p>
    <p style="font-weight: bold;">DarkCart Team</p>
</div>
    `;
};

export default forgotPasswordTemplate;
