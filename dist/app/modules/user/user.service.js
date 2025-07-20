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
exports.UserService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../error/AppError"));
const user_model_1 = require("./user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../../config"));
const user_constant_1 = require("./user.constant");
const createUserIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({
        email: payload.email
    });
    if (user) {
        throw new AppError_1.default(http_status_1.default.CONFLICT, `User Already created in this email ${payload.email}`);
    }
    const hashPassword = yield bcrypt_1.default.hash(payload.password, Number(config_1.default.salt_Rounds));
    const newUser = yield user_model_1.User.create(Object.assign(Object.assign({}, payload), { password: hashPassword, role: user_constant_1.USER_ROLE.customer }));
    return newUser;
});
const createAgentUserDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({
        email: payload.email
    });
    if (user) {
        throw new AppError_1.default(http_status_1.default.CONFLICT, `User Already created in this email ${payload.email}`);
    }
    const hashPassword = yield bcrypt_1.default.hash(payload.password, Number(config_1.default.salt_Rounds));
    const newUser = yield user_model_1.User.create(Object.assign(Object.assign({}, payload), { password: hashPassword, role: user_constant_1.USER_ROLE.deliveryAgent }));
    return newUser;
});
exports.UserService = {
    createUserIntoDB,
    createAgentUserDB
};
