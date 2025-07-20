"use strict";
// import jwt, { JwtPayload } from 'jsonwebtoken';
// import httpStatus from "http-status";
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
// import config from '../../config';
// import { TUserRole } from '../modules/user/user.interface';
// import catchAsync from '../utils/catchAsync';
// const Auth = (...requiredRoles: TUserRole[])=>{
//     return catchAsync(async(req,res,next)=>{
//         let token: string | undefined;
//   if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//     token = req.headers.authorization.split(' ')[1];
//   }
//   if (!token) {
//     return res.status(httpStatus.UNAUTHORIZED).json({ success: false, message: 'UnAutorized user Token' });
//   }
//   // check vaild token 
//     jwt.verify(token,config.accessToken as string ,function (err,decoded){
//         if(err){
//             return res.status(httpStatus.UNAUTHORIZED).json({ success: false, message: 'UnAutorized user not Verify' });
//         }
//         const role = (decoded as JwtPayload).role;
//         if(  requiredRoles && !requiredRoles.includes(role) ){
//             return res.status(httpStatus.UNAUTHORIZED).json({ success: false, message: 'You have no access to this route ' });
//         }
//         req.user = decoded as JwtPayload
//         console.log('auth',req.user);
//         next()
//     })
//     })
// }
// export default Auth;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../config"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const Auth = (...requiredRoles) => {
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(http_status_1.default.UNAUTHORIZED).json({
                success: false,
                message: 'You are not authorized'
            });
        }
        // Verify token
        jsonwebtoken_1.default.verify(token, config_1.default.accessToken, (err, decoded) => {
            if (err) {
                return res.status(http_status_1.default.UNAUTHORIZED).json({
                    success: false,
                    message: 'Unauthorized'
                });
            }
            const payload = decoded;
            const role = payload.role;
            // Check if user role is allowed
            if (requiredRoles.length && !requiredRoles.includes(role)) {
                return res.status(http_status_1.default.FORBIDDEN).json({
                    success: false,
                    message: 'You are not authorized to access this route'
                });
            }
            // Attach user to request
            req.user = payload;
            next();
        });
    }));
};
exports.default = Auth;
