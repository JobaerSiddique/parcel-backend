import  httpStatus  from 'http-status';
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthService } from "./auth.service";
import config from '../../../config';


const login = catchAsync(async(req,res)=>{
    const {email,password} = req.body;
    console.log(req.body);
    const result = await AuthService.LoginUser(email,password)
    const {accessToken,refreshToken}=result
     res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: config.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
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