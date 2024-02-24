import Redis from "ioredis-mock";
import { Redis as OriginalRedis } from "ioredis";

let redis: OriginalRedis;

export function getRedisInstance() {
  if (!redis) {
    redis = new Redis({
      enableAutoPipelining: true,
    });
  }
  return redis;
}
