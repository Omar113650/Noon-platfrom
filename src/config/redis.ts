import Redis from "ioredis";
import dotenv from "dotenv";
import Redlock from "redlock";

dotenv.config();

const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PASSWORD,
});

redis.on("connect", () => {
  console.log("Redis connected");
});

redis.on("error", (err) => {
  console.error("Redis error", err);
});

export const redlock = new Redlock([redis], {
  retryCount: 10,
  retryDelay: 200, 
  retryJitter: 200,
});

export default redis;
