import Fastify from "fastify";
import next from "next";
import fastifyCookie from "@fastify/cookie";
import fastifySession from "@fastify/session";
import { githubAuthPlugin } from "./github-auth-plugin";
import { healthCheckPlugin } from "./health-check-plugin";

// prepare next app
const nextApp = next({ dev: process.env.NODE_ENV !== "production" });
const nextHandle = nextApp.getRequestHandler();
await nextApp.prepare();

// todo: validation
const envSettings = {
  sessionSecret: process.env.SESSION_SECRET as string,
  oauth: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
} as const;

const fastify = Fastify();

fastify.register(healthCheckPlugin);
fastify.register(fastifyCookie);
fastify.register(fastifySession, {
  cookieName: "sessionId",
  secret: envSettings.sessionSecret,
});
fastify.register(githubAuthPlugin, {
  serveOrigin: "http://localhost:3000",
  clientId: envSettings.oauth.github.clientId,
  clientSecret: envSettings.oauth.github.clientSecret,
});

// todo: debug page remove
fastify.get("/debug", (request) => ({
  session: {
    user: request.session.user,
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
  fastify.log.error(err);
  process.exit(1);
}

export type { Session } from "./session";
