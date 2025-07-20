import { z } from 'zod';
import { ParcelSize, ParcelType, PaymentMethod } from './parcel.constants';

export const createParcelSchema = z.object({
  body: z.object({
    pickupAddress: z.string().min(5, 'Pickup address must be at least 5 characters'),
    deliveryAddress: z.string().min(5, 'Delivery address must be at least 5 characters'),
    parcelType: z.enum(Object.values(ParcelType) as [string, ...string[]], {
      message: 'Invalid parcel type'
    }),
    parcelSize: z.enum(Object.values(ParcelSize) as [string, ...string[]], {
      message: 'Invalid parcel size'
    }),
    paymentMethod: z.enum(Object.values(PaymentMethod) as [string, ...string[]], {
      message: 'Invalid payment method'
    }),
    codAmount: z.number().min(0, 'COD amount cannot be negative').optional()
  }).superRefine((data, ctx) => {
    // Custom validation for COD amount
    if (data.paymentMethod === PaymentMethod.COD) {
      if (data.codAmount === undefined) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'COD amount is required for COD payments',
          path: ['codAmount']
        });
      } else if (data.codAmount <= 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
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
        code: z.ZodIssueCode.custom,
        message: 'Pickup and delivery addresses cannot be the same',
        path: ['deliveryAddress']
      });
    }
  })
});

export type CreateParcelInput = z.infer<typeof createParcelSchema>['body'];