import oauthPlugin, { OAuth2Namespace } from "@fastify/oauth2";
import { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import { Session, sessionStore } from "./session";

// @fastify/oauth2のdeclareが効かないのでpatch
declare module "fastify" {
  interface FastifyInstance {
    githubOAuth2: OAuth2Namespace | undefined;
  }
}

// session type declare
declare module "@fastify/session" {
  interface FastifySessionObject extends Session {}
}

const githubAuthPluginCallback: FastifyPluginAsync<{
  serveOrigin: string;
  clientId: string;
  clientSecret: string;
}> = async (fastify, opts) => {
  fastify.register(oauthPlugin, {
    name: "githubOAuth2",
    scope: [],
    credentials: {
      client: {
        id: opts.clientId,
        secret: opts.clientSecret,
      },
      auth: oauthPlugin.GITHUB_CONFIGURATION,
    },
    startRedirectPath: "/login/github",
    callbackUri: `${opts.serveOrigin}/login/github/callback`,
  });

  fastify.get("/login/github/callback", async function (request, reply) {
    const result = await this.githubOAuth2
      ?.getAccessTokenFromAuthorizationCodeFlow(request)
      .catch((err: unknown) => {
        reply.send(err);
      });

    if (!result?.token) {
      reply.send("token is undefined");
      return;
    }

    request.session.user = {
      access_token: result.token.access_token,
    };
    await request.session.save();
    // todo: debug page remove
    reply.redirect("/debug");
  });

  fastify.addHook("onRequest", (request, reply, done) => {
    sessionStore.run(request.session, done);
  });
};

export const githubAuthPlugin = fp(githubAuthPluginCallback);
