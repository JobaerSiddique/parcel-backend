import { Parcel } from '../modules/parcel/parcel.model';
import { ParcelStatus } from '../modules/parcel/parcel.constants';
import AppError from '../error/AppError';

export const checkForDuplicateParcel = async (parcelData: {
  customer: string;
  pickupAddress: string;
  deliveryAddress: string;
}) => {
  const existingParcel = await Parcel.findOne({
    customer: parcelData.customer,
    pickupAddress: parcelData.pickupAddress,
    deliveryAddress: parcelData.deliveryAddress,
    status: { 
      $in: [
        ParcelStatus.PENDING,
        ParcelStatus.ASSIGNED,
        ParcelStatus.PICKED_UP
      ] 
    }
  });

  if (existingParcel) {
    throw new AppError(
      400,
      `Duplicate parcel found (Status: ${existingParcel.status}). ID: ${existingParcel._id}`
    );
  }
};