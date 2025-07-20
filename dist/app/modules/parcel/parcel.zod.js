"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createParcelSchema = void 0;
const zod_1 = require("zod");
const parcel_constants_1 = require("./parcel.constants");
exports.createParcelSchema = zod_1.z.object({
    body: zod_1.z.object({
        pickupAddress: zod_1.z.string().min(5, 'Pickup address must be at least 5 characters'),
        deliveryAddress: zod_1.z.string().min(5, 'Delivery address must be at least 5 characters'),
        parcelType: zod_1.z.enum(Object.values(parcel_constants_1.ParcelType), {
            message: 'Invalid parcel type'
        }),
        parcelSize: zod_1.z.enum(Object.values(parcel_constants_1.ParcelSize), {
            message: 'Invalid parcel size'
        }),
        paymentMethod: zod_1.z.enum(Object.values(parcel_constants_1.PaymentMethod), {
            message: 'Invalid payment method'
        }),
        codAmount: zod_1.z.number().min(0, 'COD amount cannot be negative').optional()
    }).superRefine((data, ctx) => {
        // Custom validation for COD amount
        if (data.paymentMethod === parcel_constants_1.PaymentMethod.COD) {
            if (data.codAmount === undefined) {
                ctx.addIssue({
                    code: zod_1.z.ZodIssueCode.custom,
                    message: 'COD amount is required for COD payments',
                    path: ['codAmount']
                });
            }
            else if (data.codAmount <= 0) {
                ctx.addIssue({
                    code: zod_1.z.ZodIssueCode.custom,
                    message: 'COD amount must be greater than 0',
                    path: ['codAmount']
                });
            }
        }
        // Validate that pickup and delivery addresses are different
        const normalizedPickup = data.pickupAddress.toLowerCase().trim();
        const normalizedDelivery = data.deliveryAddress.toLowerCase().trim();
        if (normalizedPickup === normalizedDelivery) {
            ctx.addIssue({
                code: zod_1.z.ZodIssueCode.custom,
                message: 'Pickup and delivery addresses cannot be the same',
                path: ['deliveryAddress']
            });
        }
    })
});
