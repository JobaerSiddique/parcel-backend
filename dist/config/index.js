"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
dotenv.config();
exports.default = {
    port: process.env.PORT,
    db: process.env.DB,
    secret: process.env.SECRET,
    accessToken: process.env.accessToken,
    RefreshToken: process.env.RefreshToken,
    salt_Rounds: process.env.SALT_ROUNDS,
    NODE_ENV: process.env.NODE_ENV,
    accessTokenExpires: process.env.access_Expires,
    refreshTokenExpires: process.env.refresh_Expires,
    store_Id: process.env.storeID,
    store_pass: process.env.storePassword,
    reset_link: process.env.resetLink,
    GMAIL_USER: process.env.gUser,
    GMAIL_PASS: process.env.gPass,
    Reset_Link: process.env.resetLink,
    GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY
};
