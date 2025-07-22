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
exports.ParcelService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const parcel_model_1 = require("./parcel.model");
const parcel_constants_1 = require("./parcel.constants");
const dublicateParcel_1 = require("../../utils/dublicateParcel");
const geocoder_1 = require("../../utils/geocoder");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const AppError_1 = __importDefault(require("../../error/AppError"));
const createParcel = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (payload.paymentMethod === parcel_constants_1.PaymentMethod.COD && (!payload.codAmount || payload.codAmount <= 0)) {
        throw new Error('COD amount must be greater than 0');
    }
    yield (0, dublicateParcel_1.checkForDuplicateParcel)({
        customer: payload.customer,
        pickupAddress: payload.pickupAddress,
        deliveryAddress: payload.deliveryAddress
    });
    const [pickupLocation, deliveryLocation] = yield Promise.all([
        (0, geocoder_1.geocodeWithOSM)(payload.pickupAddress),
        (0, geocoder_1.geocodeWithOSM)(payload.deliveryAddress)
    ]);
    return yield parcel_model_1.Parcel.create(Object.assign(Object.assign({}, payload), { pickupLocation,
        deliveryLocation }));
});
const getAllParcelDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const parcelQuery = new QueryBuilder_1.default(parcel_model_1.Parcel.find(), query)
        .search(parcel_constants_1.ParcelSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield parcelQuery.modelQuery;
    const meta = yield parcelQuery.countTotal();
    return {
        meta,
        result,
    };
});
const getCustomerParcelDB = (customerId) => __awaiter(void 0, void 0, void 0, function* () {
    const parcels = yield parcel_model_1.Parcel.find({ customer: customerId }).populate('customer'); // optional populate if needed
    return parcels;
});
const trackParcelDB = (track) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(track);
    const trackingParcel = yield parcel_model_1.Parcel.findOne({
        trackingNumber: track,
        isDeleted: false
    });
    if (!trackingParcel) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Parcel is Not Found");
    }
    return trackingParcel;
});
const updateParcelStatusDB = (parcelId, updateData, agentUser) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const parcel = yield parcel_model_1.Parcel.findById({
        _id: parcelId,
    });
    if (!parcel) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Parcel Not Found");
    }
    if (((_a = parcel.agentUser) === null || _a === void 0 ? void 0 : _a.toString()) !== agentUser) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "Unautzorized Agent");
    }
    if (parcel.isDeleted) {
        throw new AppError_1.default(http_status_1.default.CONFLICT, "Parcel already Deleted");
    }
    if (!Object.values(parcel_constants_1.ParcelStatus).includes(updateData.status)) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Invalid status value');
    }
    // Check if status is being changed
    if (parcel.status === updateData.status) {
        throw new AppError_1.default(http_status_1.default.CONFLICT, 'Parcel already has this status');
    }
    parcel.status = updateData.status;
    yield parcel.save();
    return parcel;
});
const deleteParcelDB = (id, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const parcel = yield parcel_model_1.Parcel.findById(id);
    if (parcel === null || parcel === void 0 ? void 0 : parcel.isDeleted) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "Parcel is Already Deleted");
    }
    if (parcel.status !== parcel_constants_1.ParcelStatus.PENDING) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "Only pending parcels can be marked as deleted");
    }
    if ((parcel === null || parcel === void 0 ? void 0 : parcel.customer.toString()) !== userId) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "You are Not Autzorized User");
    }
    parcel === null || parcel === void 0 ? void 0 : parcel.isDeleted = true;
    yield (parcel === null || parcel === void 0 ? void 0 : parcel.save());
    return parcel;
});
exports.ParcelService = {
    createParcel,
    getAllParcelDB,
    getCustomerParcelDB,
    trackParcelDB,
    updateParcelStatusDB,
    deleteParcelDB
};
