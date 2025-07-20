"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoute = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const user_zod_1 = require("./user.zod");
const user_controller_1 = require("./user.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const user_constant_1 = require("./user.constant");
const router = express_1.default.Router();
router.post("/create-user", (0, validateRequest_1.default)(user_zod_1.UserValidation.createUserZodSchema), user_controller_1.UserController.createUser);
router.post("/create-agent", (0, auth_1.default)(user_constant_1.USER_ROLE.admin), (0, validateRequest_1.default)(user_zod_1.UserValidation.createUserZodSchema), user_controller_1.UserController.createAgent);
exports.UserRoute = router;
