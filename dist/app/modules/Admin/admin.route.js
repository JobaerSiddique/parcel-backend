"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoute = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const user_constant_1 = require("../user/user.constant");
const admin_controller_1 = require("./admin.controller");
const router = express_1.default.Router();
router.put('/assign/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), admin_controller_1.AdminController.assignAgentInParcel);
router.get('/allUser', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), admin_controller_1.AdminController.getAllUser);
router.get('/report', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), admin_controller_1.AdminController.getParcelReport);
exports.AdminRoute = router;
