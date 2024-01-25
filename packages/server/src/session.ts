import { AsyncLocalStorage } from "node:async_hooks";

export type Session = {
  user: {
    access_token: string;
  };
};

export const sessionStore = new AsyncLocalStorage<Session | undefined>();

// @ts-ignore
globalThis.sessionStore = sessionStore;
