import redis from "../config/redis";

export const setCache = async (key: string, value: any, ttlSeconds =500) => {
  await redis.set(key, JSON.stringify(value), "EX", ttlSeconds);
};

export const getCache = async <T>(key: string): Promise<T | null> => {
  const data = await redis.get(key);
  return data ? JSON.parse(data) : null;
};

export const deleteCache = async (key: string) => {
  await redis.del(key);
};

