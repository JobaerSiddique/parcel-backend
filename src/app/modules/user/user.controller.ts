import  httpStatus  from 'http-status';
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserService } from "./user.service";


const createUser = catchAsync(async(req,res)=>{
    const data = req.body;
    const result = await UserService.createUserIntoDB(data)
    sendResponse(res,{
        statusCode:httpStatus.CREATED,
        success:true,
        message:"User Created Successfully",
        data:result
    })

})

const createAgent = catchAsync(async(req,res)=>{
    const data = req.body;
    const result = await UserService.createAgentUserDB(data)
    sendResponse(res,{
        statusCode:httpStatus.CREATED,
        success:true,
        message:"Agent Created Successfully",
        data:result
    })
})

export const UserController = {
    createUser,
    createAgent
}