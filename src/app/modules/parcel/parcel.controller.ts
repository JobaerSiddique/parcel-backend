import  httpStatus  from 'http-status';
import { Request, Response } from 'express';
import { ParcelService } from './parcel.service';
import { ParcelStatus } from './parcel.constants';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { signedCookie } from 'cookie-parser';

const createParcel = catchAsync(async (req: Request, res: Response) => {
  console.log(req.body);
    const parcelData = {
    ...req.body,
    customer: req.user?.userId,
    status: ParcelStatus.PENDING
  };

  const result = await ParcelService.createParcel(parcelData);
  
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Parcel created successfully',
    data: result
  });
});


const getAllParcel = catchAsync(async(req,res)=>{
    const result = await ParcelService.getAllParcelDB(req.query)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"All Parcel Retrived",
        data:result

    })
})

const getUserParcel = catchAsync(async(req,res)=>{
    const customerId = req.user.userId;
    console.log(customerId)
    const result = await ParcelService.getCustomerParcelDB(customerId)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Customer Parcel Retrived",
        data:result
    })
})

const trackingParcel = catchAsync(async(req,res)=>{
    const {trackingNumber} = req.query
    const result = await ParcelService.trackParcelDB(trackingNumber)
     sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Customer Parcel Retrived",
        data:result
    })
})

const updateParcelStatus = catchAsync(async(req,res)=>{
    const {parcelId} = req.params;
    const agentUser = req.user.userId
    console.log(agentUser);
    const updateData = req.body;
    const result = await ParcelService.updateParcelStatusDB(parcelId,updateData,agentUser)
    sendResponse(res,{
             statusCode:httpStatus.OK,
        success:true,
        message:" Parcel status Update successfully",
        data:result
    })
})
const deleteParcel = catchAsync(async(req,res)=>{
    const {id} = req.params;
    const user = req.user.userId
    const result = await ParcelService.deleteParcelDB(id);
     sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:" Parcel deleted successfully",
        data:result
    })
})
export const ParcelController = {
  createParcel,
  getAllParcel,
  getUserParcel,
  trackingParcel,
  updateParcelStatus,
  deleteParcel
};