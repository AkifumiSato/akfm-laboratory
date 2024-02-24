import { beforeAll, afterEach, afterAll } from "vitest";
import { server } from "./app/mocks";

beforeAll(() =>
  server.listen({
    onUnhandledRequest: "error",
  }),
);
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
