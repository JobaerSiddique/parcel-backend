import  httpStatus  from 'http-status';
import { Parcel } from './parcel.model';
import { IParcel } from './parcel.interface';

import { ParcelSearchableFields, ParcelStatus, PaymentMethod } from './parcel.constants';
import { checkForDuplicateParcel } from '../../utils/dublicateParcel';
import { geocodeWithOSM } from '../../utils/geocoder';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../error/AppError';


const createParcel = async (payload: IParcel) => {
  if (payload.paymentMethod === PaymentMethod.COD && (!payload.codAmount || payload.codAmount <= 0)) {
      throw new Error('COD amount must be greater than 0');
    }
     await checkForDuplicateParcel({
      customer: payload.customer,
      pickupAddress: payload.pickupAddress,
      deliveryAddress: payload.deliveryAddress
    });

    const [pickupLocation, deliveryLocation] = await Promise.all([
      geocodeWithOSM(payload.pickupAddress),
      geocodeWithOSM(payload.deliveryAddress)
    ]);

    return await Parcel.create({
      ...payload,
      pickupLocation,
      deliveryLocation
    });
};


 const getAllParcelDB = async(query: Record<string, unknown>)=>{
    const parcelQuery =  new QueryBuilder(Parcel.find(),query)
    .search(ParcelSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()
const result = await parcelQuery.modelQuery;
  const meta = await parcelQuery.countTotal();

  return {
    meta,
    result,
  };
    
 }

 const getCustomerParcelDB = async(customerId:string)=>{
   
    const parcels = await Parcel.find({ customer: customerId }).populate('customer'); // optional populate if needed
    return parcels;
    
 }


 const trackParcelDB = async(track:string)=>{
    console.log(track);
    const trackingParcel = await Parcel.findOne({
        trackingNumber:track,
        isDeleted:false
    })

    if(!trackingParcel){
        throw new AppError(httpStatus.NOT_FOUND,"Parcel is Not Found")
    }

    return trackingParcel
 }

 const updateParcelStatusDB = async(parcelId:string,updateData:IParcel,agentUser:string)=>{
    const parcel = await Parcel.findById({
        _id:parcelId,
        
    })
    
    if(!parcel){
        throw new AppError(httpStatus.NOT_FOUND,"Parcel Not Found")
    }
    if(parcel.agentUser?.toString() !== agentUser){
        throw new AppError(httpStatus.FORBIDDEN,"Unautzorized Agent")
    }
    if(parcel.isDeleted){
        throw new AppError(httpStatus.CONFLICT,"Parcel already Deleted")
    }

     if (!Object.values(ParcelStatus).includes(updateData.status)) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Invalid status value');
    }

    // Check if status is being changed
    if (parcel.status === updateData.status) {
      throw new AppError(httpStatus.CONFLICT, 'Parcel already has this status');
    }

    
    parcel.status = updateData.status;
    await parcel.save();

    return parcel
    
 }

 const deleteParcelDB = async(id:string,userId:string)=>{
    const parcel = await Parcel.findById(id)

    if(parcel?.isDeleted){
        throw new AppError(httpStatus.FORBIDDEN,"Parcel is Already Deleted")
    }

      if (parcel.status !== ParcelStatus.PENDING) {
        throw new AppError(
            httpStatus.FORBIDDEN, 
            "Only pending parcels can be marked as deleted"
        );
    }
    if(parcel?.customer.toString() !== userId){
         throw new AppError(
            httpStatus.FORBIDDEN, 
            "You are Not Autzorized User"
        );
    }
    parcel?.isDeleted = true;
    await parcel?.save()
    return parcel;
 }
export const ParcelService = {
  createParcel,
  getAllParcelDB,
  getCustomerParcelDB,
  trackParcelDB,
  updateParcelStatusDB,
  deleteParcelDB
};