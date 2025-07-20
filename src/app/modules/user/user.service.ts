import httpStatus  from 'http-status';
import AppError from "../../error/AppError";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import bcrypt from 'bcrypt'
import config from '../../../config';
import { USER_ROLE } from './user.constant';


const createUserIntoDB = async(payload:IUser)=>{
    const user = await User.findOne({
        email:payload.email
    })

    if(user){
        throw new AppError(httpStatus.CONFLICT,`User Already created in this email ${payload.email}`)
    }

    const hashPassword = await bcrypt.hash(payload.password,Number(config.salt_Rounds))

    const newUser = await User.create({
        ...payload,
        password:hashPassword,
        role:USER_ROLE.customer
    })

    return newUser
}
const createAgentUserDB = async(payload:IUser)=>{
    const user = await User.findOne({
        email:payload.email
    })

    if(user){
        throw new AppError(httpStatus.CONFLICT,`User Already created in this email ${payload.email}`)
    }

    const hashPassword = await bcrypt.hash(payload.password,Number(config.salt_Rounds))

    const newUser = await User.create({
        ...payload,
        password:hashPassword,
        role:USER_ROLE.deliveryAgent
    })

    return newUser
}

export const UserService = {
    createUserIntoDB,
    createAgentUserDB
}