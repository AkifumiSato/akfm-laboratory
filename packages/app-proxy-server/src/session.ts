import { FastifySessionObject } from "@fastify/session";
import { AsyncLocalStorage } from "node:async_hooks";
import Redis from "ioredis";
import RedisStore from "connect-redis";

export const store = new RedisStore({
  client: new Redis({
    enableAutoPipelining: true,
  }),
});

export type CustomSession = {
  currentUser?: {
    token?: string;
    github_access_token?: string;
  };
};

// session type declare
declare module "@fastify/session" {
  interface FastifySessionObject extends CustomSession {}
}

export type Session = CustomSession & FastifySessionObject;

export const sessionStore = new AsyncLocalStorage<Session | undefined>();

// @ts-ignore
globalThis.sessionStore = sessionStore;
