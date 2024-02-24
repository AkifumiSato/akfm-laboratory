import Redis from "ioredis";

let redis: Redis;

export function getRedisInstance() {
  if (!redis) {
    redis = new Redis({
      enableAutoPipelining: true,
    });
  }
  return redis;
}
