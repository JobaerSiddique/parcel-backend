"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTrackingNumber = generateTrackingNumber;
function generateTrackingNumber() {
    const prefix = 'TRK';
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const datePart = new Date().getTime().toString().slice(-6);
    return `${prefix}${datePart}${randomNum}`;
}
