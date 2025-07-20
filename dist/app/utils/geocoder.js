"use strict";
// // utils/geocoding.ts
// import axios from 'axios';
// import AppError from '../error/AppError';
// import config from '../../config';
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
exports.geocodeWithOSM = void 0;
// export const geocodeAddress = async (address: string) => {
//   try {
//     // Debug: Check what key is being used
//     console.log('Using API Key:', config.GOOGLE_MAPS_API_KEY || process.env.GOOGLE_MAPS_API_KEY);
//     const apiKey = config.GOOGLE_MAPS_API_KEY || process.env.GOOGLE_MAPS_API_KEY;
//     if (!apiKey) {
//       throw new AppError(500, 'Google Maps API key is not configured');
//     }
//     const response = await axios.get(
//       `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`
//     );
//     console.log('Geocoding response:', response.data); // Debug response
//     if (response.data.status === 'REQUEST_DENIED') {
//       console.error('Geocoding denied. Reason:', response.data.error_message);
//       throw new AppError(400, response.data.error_message || 'Geocoding service configuration error');
//     }
//     // Rest of your code...
//   } catch (err) {
//     console.error('Geocoding error:', err);
//     if (err instanceof AppError) throw err;
//     throw new AppError(503, 'Geocoding service temporarily unavailable');
//   }
// };
const axios_1 = __importDefault(require("axios"));
const AppError_1 = __importDefault(require("../error/AppError"));
const geocodeWithOSM = (address) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`);
        if (!response.data || response.data.length === 0) {
            return null;
        }
        const { lat, lon, display_name } = response.data[0];
        return {
            type: 'Point',
            coordinates: [parseFloat(lon), parseFloat(lat)],
            formattedAddress: display_name,
        };
    }
    catch (err) {
        throw new AppError_1.default(503, 'OpenStreetMap geocoding service unavailable');
    }
});
exports.geocodeWithOSM = geocodeWithOSM;
