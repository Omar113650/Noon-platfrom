import Queue from "bull";

export const createQueue = (name: string) => {
  return new Queue(name, {
    redis: {
      host: process.env.REDIS_HOST || "127.0.0.1",
      port: Number(process.env.REDIS_PORT) || 6379,
      password: process.env.REDIS_PASSWORD || undefined,
    },
  });
};

export const orderQueue = createQueue("orderQueue");
