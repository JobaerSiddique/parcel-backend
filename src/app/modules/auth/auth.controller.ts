import  httpStatus  from 'http-status';
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthService } from "./auth.service";



const login = catchAsync(async(req,res)=>{
    const {email,password} = req.body;
    console.log(req.body);
    const result = await AuthService.LoginUser(email,password)
    const {accessToken,refreshToken}=result
  res.cookie('refreshToken', refreshToken, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production', // HTTPS only in production
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days expiration
  domain: process.env.NODE_ENV === 'production' ? '.vercel.app' : undefined,
  path: '/',
});
  
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"User Login Successfully",
        data:accessToken
    })
  
})



export const AuthController={
    login
}