import { Document } from 'mongoose';

export type ReportType = 
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'yearly'
  | 'half-yearly'
  | 'custom';

export interface ITimePeriod {
  startDate: Date | string;
  endDate: Date | string;
}

export interface IDashboardMetrics {
  period: {
    start: Date;
    end: Date;
    type: ReportType;
  };
  totalParcels: number;
  deliveredParcels: number;
  failedParcels: number;
  totalCOD: number;
  statusDistribution: Array<{
    _id: string;
    count: number;
  }>;
  averageDeliveryTime?: number;
}

export const searchUser = [
    "name"
]