import Redis from "ioredis";
import RedisStore from "connect-redis";

export const store = new RedisStore({
  client: new Redis({
    enableAutoPipelining: true,
  }),
});

declare module "fastify" {
  interface Session {
    github_access_token?: string;
  }
}
