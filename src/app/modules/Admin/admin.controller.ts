import  httpStatus  from 'http-status';
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AdminService } from "./admin.service";
import { IDashboardMetrics, ReportType } from './admin.constants';


const assignAgentInParcel = catchAsync(async(req,res)=>{
    const {id}  =req.params
    
    const {agentUser} = req.body;
    
    const result = await AdminService.assignAgentUser(id,agentUser)
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Agent Assign Successfully",
        data:result
    })
})

const getParcelReport = catchAsync(async (req, res) => {
  const { period } = req.query;
  let customRange;

  if (period === 'custom') {
    customRange = {
      startDate: new Date(req.query.startDate as string),
      endDate: new Date(req.query.endDate as string)
    };
  }

  const metrics = await AdminService.getParcelMetrics(
    period as ReportType || 'weekly',
    customRange
  );

  sendResponse<IDashboardMetrics>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Parcel report for ${period} period`,
    data: metrics
  });
});


const getAllUser = catchAsync(async(req,res)=>{
  console.log("hit");
    const result =await AdminService.getAllUserDB(req.query);
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"All User Retrived Successfully",
        data:result
    })
})
export const AdminController = {
    assignAgentInParcel,
    getParcelReport,
    getAllUser
    
}