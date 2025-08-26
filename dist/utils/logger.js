"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
const path_1 = __importDefault(require("path"));
const logFormat = winston_1.format.combine(winston_1.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), winston_1.format.printf((info) => `${info.timestamp} [${info.level.toUpperCase()}]: ${info.message}`));
const logger = (0, winston_1.createLogger)({
    level: "info",
    format: logFormat,
    transports: [
        new winston_1.transports.Console(),
        new winston_daily_rotate_file_1.default({
            filename: path_1.default.join("logs", "app-%DATE%.log"),
            datePattern: "YYYY-MM-DD",
            zippedArchive: true,
            maxSize: "20m",
            maxFiles: "14d",
        }),
    ],
});
exports.default = logger;
// logger.info("User logged in: " + user.id);
// logger.error("Failed to connect to DB");
// logger.warn("Disk space is low");
