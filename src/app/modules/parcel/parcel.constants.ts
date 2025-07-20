export enum ParcelStatus {
  PENDING = 'pending',
  ASSIGNED = 'assigned',
  PICKED_UP = 'picked_up',
  IN_TRANSIT = 'in_transit',
  DELIVERED = 'delivered',
  FAILED = 'failed',
}

export enum ParcelType {
  DOCUMENT = 'document',
  PACKAGE = 'package',
  FRAGILE = 'fragile',
  OTHER = 'other',
}

export enum ParcelSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
  XLARGE = 'xlarge',
}

export enum PaymentMethod {
  COD = 'cod',
  PREPAID = 'prepaid',
}

export const ParcelSearchableFields = ['pickupAddress', 'deliveryAddress'];