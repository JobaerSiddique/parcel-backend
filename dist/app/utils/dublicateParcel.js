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
exports.checkForDuplicateParcel = void 0;
const parcel_model_1 = require("../modules/parcel/parcel.model");
const parcel_constants_1 = require("../modules/parcel/parcel.constants");
const AppError_1 = __importDefault(require("../error/AppError"));
const checkForDuplicateParcel = (parcelData) => __awaiter(void 0, void 0, void 0, function* () {
    const existingParcel = yield parcel_model_1.Parcel.findOne({
        customer: parcelData.customer,
        pickupAddress: parcelData.pickupAddress,
        deliveryAddress: parcelData.deliveryAddress,
        status: {
            $in: [
                parcel_constants_1.ParcelStatus.PENDING,
                parcel_constants_1.ParcelStatus.ASSIGNED,
                parcel_constants_1.ParcelStatus.PICKED_UP
            ]
        }
    });
    if (existingParcel) {
        throw new AppError_1.default(400, `Duplicate parcel found (Status: ${existingParcel.status}). ID: ${existingParcel._id}`);
    }
});
exports.checkForDuplicateParcel = checkForDuplicateParcel;
