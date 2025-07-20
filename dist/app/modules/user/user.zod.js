"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const user_constant_1 = require("./user.constant");
const createUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ message: "Name Must be required" }),
        email: zod_1.z
            .string({ message: "Email Must be required" })
            .email('Invalid email format'),
        password: zod_1.z.string({ message: "Password Must be required" }),
        role: zod_1.z.enum([...Object.values(user_constant_1.USER_ROLE)]).default(user_constant_1.USER_ROLE.customer),
        phone: zod_1.z.string({
            message: "Phone Must be required"
        }),
        address: zod_1.z.string().optional(),
        isDeleted: zod_1.z.boolean().default(false),
        isVerified: zod_1.z.boolean().default(false)
    }),
});
const loginZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string({
            message: "Name Must be required"
        })
            .email('Invalid email format'),
        password: zod_1.z.string({
            message: "Password Must be required"
        }),
    }),
});
exports.UserValidation = {
    createUserZodSchema,
    loginZodSchema,
};
