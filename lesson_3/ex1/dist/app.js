"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const controllers_1 = require("./controllers");
const log_1 = require("./middleware/log");
const logError_1 = require("./middleware/logError");
const app = express_1.default();
exports.app = app;
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use(cors_1.default());
app.use(log_1.log);
Object.keys(controllers_1.config).forEach((k) => {
    const routeConfig = controllers_1.config[k];
    app.use(routeConfig.prefix, routeConfig.router);
});
app.use(logError_1.logError);
//# sourceMappingURL=app.js.map