"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const globalHandlerError_1 = __importDefault(require("./app/middleware/globalHandlerError"));
const notFound_1 = __importDefault(require("./app/middleware/notFound"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const route_1 = __importDefault(require("./app/route"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Define allowed origins
const allowedOrigins = ['http://localhost:5173', 'https://dapper-nasturtium-bce1b7.netlify.app'];
// Configure CORS
app.use((0, cors_1.default)({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));
app.use((0, cookie_parser_1.default)());
// use route
app.get('/', (req, res) => {
    res.send('Hurry Parcel  server is Started');
});
app.use('/api/v1', route_1.default);
app.use(globalHandlerError_1.default);
// not found route
app.use(notFound_1.default);
exports.default = app;
