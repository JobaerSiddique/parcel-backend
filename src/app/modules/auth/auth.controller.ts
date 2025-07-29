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
  secure: true,
  sameSite: 'none',
  path: '/',
  domain: '.vercel.app', // Only if backend is also *.vercel.app
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