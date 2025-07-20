"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthZod = void 0;
const zod_1 = __importDefault(require("zod"));
const createLogin = zod_1.default.object({
    body: zod_1.default.object({
        email: zod_1.default.string({ message: "email is Required" }).email({ message: "Invaild Email Format" }),
        password: zod_1.default.string({ message: "Password Must be required" })
    })
});
exports.AuthZod = {
    createLogin
};
