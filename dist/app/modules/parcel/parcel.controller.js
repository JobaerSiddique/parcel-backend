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
exports.ParcelController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const parcel_service_1 = require("./parcel.service");
const parcel_constants_1 = require("./parcel.constants");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const createParcel = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    console.log(req.body);
    console.log((_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.userId);
    const parcelData = Object.assign(Object.assign({}, req.body), { customer: (_b = req.user) === null || _b === void 0 ? void 0 : _b.userId, status: parcel_constants_1.ParcelStatus.PENDING });
    const result = yield parcel_service_1.ParcelService.createParcel(parcelData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: 'Parcel created successfully',
        data: result
    });
}));
const getAllParcel = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield parcel_service_1.ParcelService.getAllParcelDB(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "All Parcel Retrived",
        data: result
    });
}));
const getUserParcel = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const customerId = req.user.userId;
    console.log(customerId);
    const result = yield parcel_service_1.ParcelService.getCustomerParcelDB(customerId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Customer Parcel Retrived",
        data: result
    });
}));
const trackingParcel = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { trackingNumber } = req.query;
    const result = yield parcel_service_1.ParcelService.trackParcelDB(trackingNumber);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Customer Parcel Retrived",
        data: result
    });
}));
const updateParcelStatus = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { parcelId } = req.params;
    const agentUser = req.user.userId;
    console.log(agentUser);
    const updateData = req.body;
    const result = yield parcel_service_1.ParcelService.updateParcelStatusDB(parcelId, updateData, agentUser);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: " Parcel status Update successfully",
        data: result
    });
}));
const deleteParcel = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = req.user.userId;
    const result = yield parcel_service_1.ParcelService.deleteParcelDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: " Parcel deleted successfully",
        data: result
    });
}));
exports.ParcelController = {
    createParcel,
    getAllParcel,
    getUserParcel,
    trackingParcel,
    updateParcelStatus,
    deleteParcel
};
