import { Router } from 'express';
import { registerUserController,refreshToken, userDetails, resetpassword,updateUserDetails, verifyForgotPasswordOtp, forgotPasswordController, verifyEmailController, loginController, logoutController, uploadAvatar } from '../controllers/user.controllers.js';
import { auth } from '../middleware/auth.js';
import upload from '../middleware/multer.js'; 
const userRouter = Router();

userRouter.post('/register', registerUserController);
userRouter.post('/verify-email', verifyEmailController);
userRouter.post('/login', loginController);
userRouter.get('/logout', auth, logoutController);
userRouter.put('/upload-avatar', auth, upload.single('avatar'), uploadAvatar); 
userRouter.put('/update-user',auth,updateUserDetails)
userRouter.put('/forgot-password',forgotPasswordController)
userRouter.put('/verify-forgot-password-otp',verifyForgotPasswordOtp)
userRouter.put('/reset-password',resetpassword)
userRouter.post('/refresh-token',refreshToken)
userRouter.get('/user-details',auth,userDetails)

export default userRouter;
