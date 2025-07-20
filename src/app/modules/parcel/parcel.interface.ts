import { Document, Types } from 'mongoose';
import { ParcelSize, ParcelStatus, ParcelType, PaymentMethod } from './parcel.constants';

export interface IParcel extends Document {
  customer: Types.ObjectId;
   trackingNumber: string;
  pickupAddress: string;
  deliveryAddress: string;
  parcelType: keyof typeof ParcelType;
  parcelSize: keyof typeof ParcelSize;
  paymentMethod: keyof typeof PaymentMethod;
  codAmount?: number;
  status: keyof typeof ParcelStatus;
  assignedAgent?: string;
  isDeleted:boolean;
  agentUser?:Types.ObjectId
}