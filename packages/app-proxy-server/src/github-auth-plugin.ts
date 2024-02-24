import oauthPlugin, { OAuth2Namespace } from "@fastify/oauth2";
import { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";

// @fastify/oauth2のdeclareが効かないのでpatch
declare module "fastify" {
  interface FastifyInstance {
    githubOAuth2: OAuth2Namespace | undefined;
  }
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
    startRedirectPath: "/signin/github",
    callbackUri: `${opts.serveOrigin}/signin/github/callback`,
  });

  // fastify.get("/signin/github/callback", async function (request, reply) {
  //   const result = await this.githubOAuth2
  //     ?.getAccessTokenFromAuthorizationCodeFlow(request)
  //     .catch((err: unknown) => {
  //       reply.send(err);
  //     });
  //
  //   if (!result?.token) {
  //     reply.send("token is undefined");
  //     return;
  //   }
  //
  //   request.session.github_access_token = result.token.access_token;
  //   await request.session.save();
  //   // todo: debug page remove
  //   reply.redirect("/debug");
  // });
};

export const githubAuthPlugin = fp(githubAuthPluginCallback);
