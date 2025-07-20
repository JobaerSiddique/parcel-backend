"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeAddress = void 0;
const normalizeAddress = (address) => {
    if (!address || typeof address !== 'string') {
        throw new Error('Invalid address');
    }
    return address
        .trim()
        .toLowerCase()
        .replace(/\s+/g, ' ')
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\b(st|street|rd|road|ave|avenue)\b/g, match => {
        const abbr = {
            st: 'street',
            rd: 'road',
            ave: 'avenue'
        };
        return abbr[match] || match;
    });
};
exports.normalizeAddress = normalizeAddress;
