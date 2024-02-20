import Fastify from "fastify";
import next from "next";
import fastifyCookie from "@fastify/cookie";
import fastifySession from "@fastify/session";
import multipart from "@fastify/multipart";
import { githubAuthPlugin } from "./github-auth-plugin";
import { healthCheckPlugin } from "./health-check-plugin";
import * as v from "valibot";
import { CustomSession, store } from "./session";

// prepare next app
const nextApp = next({ dev: process.env.NODE_ENV !== "production" });
const nextHandle = nextApp.getRequestHandler();
await nextApp.prepare();

// validation of environment variables
const envSchema = v.object({
  SESSION_SECRET: v.string([v.minLength(32)]),
  GITHUB_CLIENT_ID: v.string([v.minLength(1)]),
  GITHUB_CLIENT_SECRET: v.string([v.minLength(1)]),
});
let envVariables: v.Input<typeof envSchema>;
try {
  envVariables = v.parse(envSchema, process.env);
} catch (err) {
  console.error(err);
  process.exit(1);
}

// prepare fastify
const fastify = Fastify();

fastify.register(multipart);
fastify.register(healthCheckPlugin);
fastify.register(fastifyCookie);
fastify.register(fastifySession, {
  cookieName: "sessionId",
  secret: envVariables.SESSION_SECRET,
  store,
});
fastify.register(githubAuthPlugin, {
  serveOrigin: "http://localhost:3000",
  clientId: envVariables.GITHUB_CLIENT_ID,
  clientSecret: envVariables.GITHUB_CLIENT_SECRET,
});

// todo: debug page remove
fastify.get("/debug", (request) => ({
  session: {
    currentUser: request.session.currentUser,
  },
}));

fastify.all("*", (req, reply) => nextHandle(req.raw, reply.raw));

fastify.setNotFoundHandler((req, reply) =>
  nextApp.render404(req.raw, reply.raw),
);

const PORT = 3000;
try {
  await fastify.listen({ port: PORT });
} catch (err) {
  console.error(err);
  process.exit(1);
}

export type { Session } from "./session";
