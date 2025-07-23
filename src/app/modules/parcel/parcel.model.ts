import { Schema, model } from 'mongoose';
import { IParcel } from './parcel.interface';
import { ParcelSize, ParcelStatus, ParcelType, PaymentMethod } from './parcel.constants';
import { generateTrackingNumber } from '../../utils/generator';


const parcelSchema = new Schema<IParcel>({
  customer: {
    type: Schema.Types.ObjectId,
    required: true,
    ref:"User",
    index: true
  },
  trackingNumber: {
    type: String,
    required: true,
    unique: true,
    default: generateTrackingNumber,
    index: true
  },
  pickupAddress: {
    type: String,
    required: true,
    set: (value: string) => value.toLowerCase().replace(/\s+/g, ' ').replace(/[^a-z0-9\s]/g, '')
  },
  deliveryAddress: {
    type: String,
    required: true,
    set: (value: string) => value.toLowerCase().replace(/\s+/g, ' ').replace(/[^a-z0-9\s]/g, '')
  },
  pickupLocation: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      required: true
    },
    formattedAddress: String
  },
  deliveryLocation: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      required: true
    },
    formattedAddress: String
  },
  parcelType: {
    type: String,
    enum: Object.values(ParcelType),
    required: true
  },
  parcelSize: {
    type: String,
    enum: Object.values(ParcelSize),
    required: true
  },
  paymentMethod: {
    type: String,
    enum: Object.values(PaymentMethod),
    required: true
  },
  codAmount: {
    type: Number,
    required: function() {
      return this.paymentMethod === PaymentMethod.COD;
    },
    min: 0
  },
  status: {
    type: String,
    enum: Object.values(ParcelStatus),
    default: ParcelStatus.PENDING
  },
  isDeleted:
  {
    type:Boolean,
    default:false
  },
  agentUser:{
    type:Schema.Types.ObjectId,
    ref:'user'
  }
}, { 
  timestamps: true,
  toJSON: { 
    virtuals: true,
    transform: (doc, ret) => {
      delete ret.__v;
      return ret;
    }
  },
  toObject: { virtuals: true }
});

// Indexes
parcelSchema.index(
  { customer: 1, pickupAddress: 1, deliveryAddress: 1, status: 1 },
  { 
    name: 'duplicate_prevention',
    partialFilterExpression: { 
      status: { $in: [ParcelStatus.PENDING, ParcelStatus.ASSIGNED, ParcelStatus.PICKED_UP] } 
    }
  }
);

parcelSchema.index({ 'pickupLocation.coordinates': '2dsphere' });
parcelSchema.index({ 'deliveryLocation.coordinates': '2dsphere' });

export const Parcel = model<IParcel>('Parcel', parcelSchema);