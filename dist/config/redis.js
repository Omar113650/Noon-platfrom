"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redlock = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
const dotenv_1 = __importDefault(require("dotenv"));
const redlock_1 = __importDefault(require("redlock"));
dotenv_1.default.config();
const redis = new ioredis_1.default({
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    password: process.env.REDIS_PASSWORD,
});
redis.on("connect", () => {
    console.log("✅ Redis connected");
});
redis.on("error", (err) => {
    console.error("❌ Redis error", err);
});
exports.redlock = new redlock_1.default([redis], {
    retryCount: 10,
    retryDelay: 200, // ms
    retryJitter: 200,
});
exports.default = redis;
