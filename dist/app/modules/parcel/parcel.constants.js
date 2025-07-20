"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParcelSearchableFields = exports.PaymentMethod = exports.ParcelSize = exports.ParcelType = exports.ParcelStatus = void 0;
var ParcelStatus;
(function (ParcelStatus) {
    ParcelStatus["PENDING"] = "pending";
    ParcelStatus["ASSIGNED"] = "assigned";
    ParcelStatus["PICKED_UP"] = "picked_up";
    ParcelStatus["IN_TRANSIT"] = "in_transit";
    ParcelStatus["DELIVERED"] = "delivered";
    ParcelStatus["FAILED"] = "failed";
})(ParcelStatus || (exports.ParcelStatus = ParcelStatus = {}));
var ParcelType;
(function (ParcelType) {
    ParcelType["DOCUMENT"] = "document";
    ParcelType["PACKAGE"] = "package";
    ParcelType["FRAGILE"] = "fragile";
    ParcelType["OTHER"] = "other";
})(ParcelType || (exports.ParcelType = ParcelType = {}));
var ParcelSize;
(function (ParcelSize) {
    ParcelSize["SMALL"] = "small";
    ParcelSize["MEDIUM"] = "medium";
    ParcelSize["LARGE"] = "large";
    ParcelSize["XLARGE"] = "xlarge";
})(ParcelSize || (exports.ParcelSize = ParcelSize = {}));
var PaymentMethod;
(function (PaymentMethod) {
    PaymentMethod["COD"] = "cod";
    PaymentMethod["PREPAID"] = "prepaid";
})(PaymentMethod || (exports.PaymentMethod = PaymentMethod = {}));
exports.ParcelSearchableFields = ['pickupAddress', 'deliveryAddress'];
