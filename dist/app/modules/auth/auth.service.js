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
exports.AuthService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../error/AppError"));
const user_model_1 = require("../user/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_1 = require("../../middleware/jwt");
const config_1 = __importDefault(require("../../../config"));
const LoginUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({
        email: email
    }).select('+password');
    console.log(user);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "Invaild crenditial");
    }
    if (user.isDeleted) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "User Already Deleted");
    }
    const comparePassword = yield bcrypt_1.default.compare(password, user.password);
    if (!comparePassword) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "Invaild crenditial");
    }
    const JwtPayload = {
        userId: user._id,
        role: user.role
    };
    const accessToken = (0, jwt_1.createToken)(JwtPayload, config_1.default.accessToken, config_1.default.accessTokenExpires);
    const refreshToken = (0, jwt_1.createToken)(JwtPayload, config_1.default.RefreshToken, config_1.default.refreshTokenExpires);
    return {
        accessToken, refreshToken
    };
});
exports.AuthService = {
    LoginUser
};
