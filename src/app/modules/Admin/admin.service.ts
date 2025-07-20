import  httpStatus  from 'http-status';
import AppError from "../../error/AppError"
import { Parcel } from "../parcel/parcel.model"
import { User } from '../user/user.model';
import { IDashboardMetrics, ITimePeriod, ReportType, searchUser } from './admin.constants';
import { getDateRange } from '../../utils/getDate';
import QueryBuilder from '../../builder/QueryBuilder';


const assignAgentUser = async(id:string,agentUser:string)=>{
    const parcel = await Parcel.findById(id)
    console.log(agentUser);
    if(!parcel){
        throw new AppError(httpStatus.NOT_FOUND,"Parcel Not Found")
    }
    if(parcel.isDeleted){
        throw new AppError(httpStatus.CONFLICT,"Parcel Already Deleted")
    }

    if(parcel.agentUser?.toString() === agentUser){
        throw new AppError(httpStatus.CONFLICT,"This Agent Already Assign")
    }

     const user = await User.findOne({_id:agentUser});
     console.log(user);
    if(user.role !=='deliveryAgent'){
        throw new AppError(httpStatus.FORBIDDEN,"This is not Agent User")
    }
    if(user?.isDeleted){
        throw new AppError(httpStatus.CONFLICT,"User Already deleted")
    }
    parcel.agentUser=agentUser
    await parcel.save()
    return parcel
}

const getParcelMetrics = async (
  period: ReportType = 'daily', // Default to daily report
  customRange?: ITimePeriod
): Promise<IDashboardMetrics> => {
//   let { start, end } = getDateRange(period);

//   // Override for custom date range
//   if (period === 'custom' && customRange) {
//     start = new Date(customRange.startDate);
//     end = new Date(customRange.endDate);
//   }

//   const matchStage = {
//     createdAt: { $gte: start, $lte: end },
//     isDeleted: false
//   };

//   const [totalParcels, delivered, failed, codSummary, statusDistribution] = 
//     await Promise.all([
//       // Total parcels in period
//       Parcel.countDocuments(matchStage),

//       // Successful deliveries
//       Parcel.countDocuments({ ...matchStage, status: 'delivered' }),

//       // Failed deliveries
//       Parcel.countDocuments({ ...matchStage, status: 'failed' }),

//       // COD amounts (aggregation)
//       Parcel.aggregate([
//         { $match: { ...matchStage, status: 'delivered' } },
//         { $group: { _id: null, totalCOD: { $sum: '$codAmount' } } }
//       ]),

//       // Status breakdown
//       Parcel.aggregate([
//         { $match: matchStage },
//         { $group: { _id: '$status', count: { $sum: 1 } } }
//       ])
//     ]);

//   return {
//     period: {
//       start,
//       end,
//       type: period
//     },
//     totalParcels,
//     deliveredParcels: delivered,
//     failedParcels: failed,
//     totalCOD: codSummary[0]?.totalCOD || 0,
//     statusDistribution,
//     // Additional metrics can be added here
//     averageDeliveryTime: 0 // Would require tracking delivery timestamps
//   };
try {
    // Validate custom date range if provided
    if (period === 'custom' && customRange) {
      const startDate = new Date(customRange.startDate);
      const endDate = new Date(customRange.endDate);
      
      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        throw new Error('Invalid custom date range');
      }
      
      if (startDate > endDate) {
        throw new Error('Start date cannot be after end date');
      }
    }

    // Get date range (defaults to daily)
    let { start, end } = getDateRange(period);
    
    // Override for valid custom range
    if (period === 'custom' && customRange) {
      start = new Date(customRange.startDate);
      end = new Date(customRange.endDate);
    }

    const matchStage = {
      createdAt: { $gte: start, $lte: end },
      isDeleted: false
    };

    const [
      totalParcels, 
      delivered, 
      failed, 
      codSummary, 
      statusDistribution
    ] = await Promise.all([
      Parcel.countDocuments(matchStage),
      Parcel.countDocuments({ ...matchStage, status: 'delivered' }),
      Parcel.countDocuments({ ...matchStage, status: 'failed' }),
      Parcel.aggregate([
        { 
          $match: { 
            ...matchStage, 
            status: 'delivered',
            codAmount: { $exists: true, $gt: 0 }
          } 
        },
        { $group: { _id: null, totalCOD: { $sum: '$codAmount' } } }
      ]),
      Parcel.aggregate([
        { $match: matchStage },
        { $group: { _id: '$status', count: { $sum: 1 } } }
      ])
    ]);

    return {
      period: {
        start,
        end,
        type: period
      },
      totalParcels,
      deliveredParcels: delivered,
      failedParcels: failed,
      totalCOD: codSummary[0]?.totalCOD || 0,
      statusDistribution,
      averageDeliveryTime: 0 // Placeholder for future implementation
    };

  } catch (error) {
    // Fallback to today's date if error occurs
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    return {
      period: {
        start: todayStart,
        end: todayEnd,
        type: 'daily'
      },
      totalParcels: 0,
      deliveredParcels: 0,
      failedParcels: 0,
      totalCOD: 0,
      statusDistribution: [],
      averageDeliveryTime: 0
    };
  }
};

const getAllUserDB = async(query: Record<string, unknown>)=>{
    const userQuery = new QueryBuilder(
        User.find({isDeleted:false}),query
    )
    .search(searchUser)
    .sort()
    .paginate()
    .fields()

    const result = await userQuery.modelQuery;
    const meta = await userQuery.countTotal();

    return {
        meta,
        result
        
    }
    
}
export const AdminService = {
    assignAgentUser,
    getParcelMetrics,
    getAllUserDB
}