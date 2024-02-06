// https://github.com/vercel/next.js/blob/3b46f22bb161779d027f462f80da9d300385c58b/examples/cache-handler-redis/cache-handler.js

const { IncrementalCache } = require("@neshca/cache-handler");
const createRedisCache = require("@neshca/cache-handler/redis-stack").default;
const createLruCache = require("@neshca/cache-handler/local-lru").default;
const { createClient } = require("redis");

const client = createClient({
  url: process.env.REDIS_STACK_URL ?? "redis://localhost:6379",
});

client.on("error", (error) => {
  console.error("Redis error:", error.message);
});

IncrementalCache.onCreation(async () => {
  // read more about TTL limitations https://caching-tools.github.io/next-shared-cache/configuration/ttl
  function useTtl(maxAge) {
    return maxAge * 1.5;
  }

  await client.connect();

  const redisCache = await createRedisCache({
    client,
    useTtl,
  });

  const localCache = createLruCache({
    useTtl,
  });

  return {
    cache: [redisCache, localCache],
    // read more about useFileSystem limitations https://caching-tools.github.io/next-shared-cache/configuration/use-file-system
    useFileSystem: false,
  };
});

module.exports = IncrementalCache;
