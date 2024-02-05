import { AsyncLocalStorage } from "node:async_hooks";
import Redis from "ioredis";
import RedisStore from "connect-redis";

export const store = new RedisStore({
  client: new Redis({
    enableAutoPipelining: true,
  }),
});

export type Session = {
  user: {
    access_token: string;
  };
};

export const sessionStore = new AsyncLocalStorage<Session | undefined>();

// @ts-ignore
globalThis.sessionStore = sessionStore;
