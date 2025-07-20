"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDateRange = void 0;
const moment_1 = __importDefault(require("moment"));
const getDateRange = (period) => {
    const now = (0, moment_1.default)();
    let start, end;
    switch (period) {
        case 'daily':
            start = now.startOf('day').toDate();
            end = now.endOf('day').toDate();
            break;
        case 'weekly':
            start = now.startOf('week').toDate();
            end = now.endOf('week').toDate();
            break;
        case 'monthly':
            start = now.startOf('month').toDate();
            end = now.endOf('month').toDate();
            break;
        case 'yearly':
            start = now.startOf('year').toDate();
            end = now.endOf('year').toDate();
            break;
        case 'half-yearly':
            start = now.subtract(6, 'months').startOf('month').toDate();
            end = now.endOf('month').toDate();
            break;
        case 'custom':
            // For custom dates, we'll handle separately
            start = new Date(0);
            end = new Date();
            break;
        default:
            start = now.subtract(1, 'month').toDate();
            end = now.toDate();
    }
    return { start, end };
};
exports.getDateRange = getDateRange;
