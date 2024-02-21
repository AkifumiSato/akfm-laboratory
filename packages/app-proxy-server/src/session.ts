import type * as fastify from "fastify";
import { AsyncLocalStorage } from "node:async_hooks";
import Redis from "ioredis";
import RedisStore from "connect-redis";

export const store = new RedisStore({
  client: new Redis({
    enableAutoPipelining: true,
  }),
});

declare module "fastify" {
  interface Session {
    // currentUserがundefined許容にするとapp routerからsessionの更新が不可能になるので注意
    currentUser:
      | {
          isLogin: false;
        }
      | {
          isLogin: true;
          token: string;
        };
    github_access_token?: string;
  }
}

export const sessionStore = new AsyncLocalStorage<
  fastify.Session | undefined
>();

// @ts-ignore
globalThis.sessionStore = sessionStore;
