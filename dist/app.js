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
app.use((0, cookie_parser_1.default)());
// app.use(cors({
//   origin: ['http://localhost:3000','https://parcel-client-iota.vercel.app'], // Remove trailing slash
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }))
app.use((0, cors_1.default)({
    origin: [
        'http://localhost:3000',
        'https://parcel-client-iota.vercel.app',
        // Add other domains as needed
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], // Added PATCH
    allowedHeaders: [
        'Content-Type',
        'Authorization',
        'X-Requested-With',
        'Accept',
        'Origin'
    ],
    exposedHeaders: ['Authorization'], // If you need to expose custom headers
    maxAge: 86400 // Cache CORS preflight requests for 24 hours
}));
// use route
app.get('/', (req, res) => {
    res.send('Hurry Parcel  server is Started');
});
app.use('/api/v1', route_1.default);
app.use(globalHandlerError_1.default);
// not found route
app.use(notFound_1.default);
exports.default = app;
