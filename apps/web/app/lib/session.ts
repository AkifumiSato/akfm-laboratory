import type { AsyncLocalStorage } from "node:async_hooks";
import type { Session } from "@repo/app-proxy-server";

declare namespace globalThis {
  // eslint-disable-next-line no-unused-vars
  let sessionStore: AsyncLocalStorage<Session | undefined> | undefined;
}

export function getSession(): Session | undefined {
  return globalThis.sessionStore?.getStore();
}
