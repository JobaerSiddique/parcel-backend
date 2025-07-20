"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../error/AppError"));
const parcel_model_1 = require("../parcel/parcel.model");
const user_model_1 = require("../user/user.model");
const admin_constants_1 = require("./admin.constants");
const getDate_1 = require("../../utils/getDate");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const assignAgentUser = (id, agentUser) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const parcel = yield parcel_model_1.Parcel.findById(id);
    console.log(agentUser);
    if (!parcel) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Parcel Not Found");
    }
    if (parcel.isDeleted) {
        throw new AppError_1.default(http_status_1.default.CONFLICT, "Parcel Already Deleted");
    }
    if (((_a = parcel.agentUser) === null || _a === void 0 ? void 0 : _a.toString()) === agentUser) {
        throw new AppError_1.default(http_status_1.default.CONFLICT, "This Agent Already Assign");
    }
    const user = yield user_model_1.User.findOne({ _id: agentUser });
    console.log(user);
    if (user.role !== 'deliveryAgent') {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "This is not Agent User");
    }
    if (user === null || user === void 0 ? void 0 : user.isDeleted) {
        throw new AppError_1.default(http_status_1.default.CONFLICT, "User Already deleted");
    }
    parcel.agentUser = agentUser;
    yield parcel.save();
    return parcel;
});
const getParcelMetrics = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (period = 'daily', // Default to daily report
customRange) {
    //   let { start, end } = getDateRange(period);
    var _a;
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
        let { start, end } = (0, getDate_1.getDateRange)(period);
        // Override for valid custom range
        if (period === 'custom' && customRange) {
            start = new Date(customRange.startDate);
            end = new Date(customRange.endDate);
        }
        const matchStage = {
            createdAt: { $gte: start, $lte: end },
            isDeleted: false
        };
        const [totalParcels, delivered, failed, codSummary, statusDistribution] = yield Promise.all([
            parcel_model_1.Parcel.countDocuments(matchStage),
            parcel_model_1.Parcel.countDocuments(Object.assign(Object.assign({}, matchStage), { status: 'delivered' })),
            parcel_model_1.Parcel.countDocuments(Object.assign(Object.assign({}, matchStage), { status: 'failed' })),
            parcel_model_1.Parcel.aggregate([
                {
                    $match: Object.assign(Object.assign({}, matchStage), { status: 'delivered', codAmount: { $exists: true, $gt: 0 } })
                },
                { $group: { _id: null, totalCOD: { $sum: '$codAmount' } } }
            ]),
            parcel_model_1.Parcel.aggregate([
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
            totalCOD: ((_a = codSummary[0]) === null || _a === void 0 ? void 0 : _a.totalCOD) || 0,
            statusDistribution,
            averageDeliveryTime: 0 // Placeholder for future implementation
        };
    }
    catch (error) {
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
});
const getAllUserDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const userQuery = new QueryBuilder_1.default(user_model_1.User.find({ isDeleted: false }), query)
        .search(admin_constants_1.searchUser)
        .sort()
        .paginate()
        .fields();
    const result = yield userQuery.modelQuery;
    const meta = yield userQuery.countTotal();
    return {
        meta,
        result
    };
});
exports.AdminService = {
    assignAgentUser,
    getParcelMetrics,
    getAllUserDB
};
