import type { AsyncLocalStorage } from "node:async_hooks";
import type { FastifySession } from "@repo/app-proxy-server";

declare namespace globalThis {
  // eslint-disable-next-line no-unused-vars
  let sessionStore: AsyncLocalStorage<FastifySession | undefined> | undefined;
}

export function getSession(): FastifySession | undefined {
  return globalThis.sessionStore?.getStore();
}
