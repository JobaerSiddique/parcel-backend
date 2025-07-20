import JwtPayload  from 'jsonwebtoken';
import  httpStatus  from 'http-status';
import AppError from "../../error/AppError"
import { User } from "../user/user.model"
import bcrypt from 'bcrypt'
import { createToken } from '../../middleware/jwt';
import config from '../../../config';

const LoginUser = async(email:string,password:string)=>{

    const user = await User.findOne({
        email:email
    }).select('+password');
    console.log(user);
    if(!user){
        throw new AppError(httpStatus.FORBIDDEN,"Invaild crenditial")
    }
    if(user.isDeleted){
         throw new AppError(httpStatus.FORBIDDEN,"User Already Deleted")
    }

    const comparePassword = await bcrypt.compare(password,user.password)
    if(!comparePassword){
           throw new AppError(httpStatus.FORBIDDEN,"Invaild crenditial")
    }

    const JwtPayload ={
        userId:user._id,
        role:user.role
    }

    const accessToken = createToken(JwtPayload,config.accessToken as string, config.accessTokenExpires)
    const refreshToken = createToken(JwtPayload,config.RefreshToken as string, config.refreshTokenExpires)
  return {
    accessToken,refreshToken
  }
}


export const  AuthService = {
    LoginUser
}