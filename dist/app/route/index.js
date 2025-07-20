"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = require("../modules/user/user.route");
const auth_route_1 = require("../modules/auth/auth.route");
const parcel_route_1 = require("../modules/parcel/parcel.route");
const admin_route_1 = require("../modules/Admin/admin.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/user",
        route: user_route_1.UserRoute
    },
    {
        path: "/auth",
        route: auth_route_1.AuthRoute
    },
    {
        path: "/parcel",
        route: parcel_route_1.ParcelRoute
    },
    {
        path: "/admin",
        route: admin_route_1.AdminRoute
    }
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
