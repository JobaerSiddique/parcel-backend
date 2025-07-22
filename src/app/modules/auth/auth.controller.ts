import  httpStatus  from 'http-status';
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthService } from "./auth.service";
import config from '../../../config';


const login = catchAsync(async(req,res)=>{
    const {email,password} = req.body;
    console.log(req.body);
    const result = await AuthService.LoginUser(email,password)
    // const {accessToken,refreshToken}=result
  
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"User Login Successfully",
        data:result
    })
  
})



export const AuthController={
    login
}