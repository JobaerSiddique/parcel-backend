"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parcel = void 0;
const mongoose_1 = require("mongoose");
const parcel_constants_1 = require("./parcel.constants");
const generator_1 = require("../../utils/generator");
const parcelSchema = new mongoose_1.Schema({
    customer: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "user",
        index: true
    },
    trackingNumber: {
        type: String,
        required: true,
        unique: true,
        default: generator_1.generateTrackingNumber,
        index: true
    },
    pickupAddress: {
        type: String,
        required: true,
        set: (value) => value.toLowerCase().replace(/\s+/g, ' ').replace(/[^a-z0-9\s]/g, '')
    },
    deliveryAddress: {
        type: String,
        required: true,
        set: (value) => value.toLowerCase().replace(/\s+/g, ' ').replace(/[^a-z0-9\s]/g, '')
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
        enum: Object.values(parcel_constants_1.ParcelType),
        required: true
    },
    parcelSize: {
        type: String,
        enum: Object.values(parcel_constants_1.ParcelSize),
        required: true
    },
    paymentMethod: {
        type: String,
        enum: Object.values(parcel_constants_1.PaymentMethod),
        required: true
    },
    codAmount: {
        type: Number,
        required: function () {
            return this.paymentMethod === parcel_constants_1.PaymentMethod.COD;
        },
        min: 0
    },
    status: {
        type: String,
        enum: Object.values(parcel_constants_1.ParcelStatus),
        default: parcel_constants_1.ParcelStatus.PENDING
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    agentUser: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'user'
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
parcelSchema.index({ customer: 1, pickupAddress: 1, deliveryAddress: 1, status: 1 }, {
    name: 'duplicate_prevention',
    partialFilterExpression: {
        status: { $in: [parcel_constants_1.ParcelStatus.PENDING, parcel_constants_1.ParcelStatus.ASSIGNED, parcel_constants_1.ParcelStatus.PICKED_UP] }
    }
});
parcelSchema.index({ 'pickupLocation.coordinates': '2dsphere' });
parcelSchema.index({ 'deliveryLocation.coordinates': '2dsphere' });
exports.Parcel = (0, mongoose_1.model)('Parcel', parcelSchema);
