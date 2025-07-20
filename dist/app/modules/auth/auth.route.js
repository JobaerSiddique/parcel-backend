"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoute = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("./auth.controller");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const auth_zod_1 = require("./auth.zod");
const router = express_1.default.Router();
router.post('/login', (0, validateRequest_1.default)(auth_zod_1.AuthZod.createLogin), auth_controller_1.AuthController.login);
exports.AuthRoute = router;
