import { redirect, RedirectType } from "next/navigation";
import { NextRequest } from "next/server";
import { coreApiUrl } from "../../../../lib/api/url";
import { getSession } from "../../../../lib/session";

type GithubAccessTokenResponse = {
  access_token: string;
  token_type: string;
  scope: string;
};

// Partial type
type GithubUserResponse = {
  id: number;
  name: string;
  email: string;
};

type LoginResponse = {
  token: string;
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = process.env;
  if (GITHUB_CLIENT_ID === undefined || GITHUB_CLIENT_SECRET === undefined) {
    throw new Error("GITHUB_CLIENT_ID or GITHUB_CLIENT_SECRET is not defined");
  }

  const githubTokenResponse: GithubAccessTokenResponse = await fetch(
    `https://github.com/login/oauth/access_token?client_id=${GITHUB_CLIENT_ID}&client_secret=${GITHUB_CLIENT_SECRET}&code=${code}`,
    {
      method: "GET",
      headers: {
        Accept: " application/json",
      },
    },
  ).then((res) => {
    if (!res.ok) throw new Error("failed to get access token");
    return res.json();
  });

  const githubUser: GithubUserResponse = await fetch(
    "https://api.github.com/user",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${githubTokenResponse.access_token}`,
      },
    },
  ).then((res) => {
    if (!res.ok) throw new Error("failed to get github user");
    return res.json();
  });

  // todo: 登録済みの場合、スキップ
  await fetch(`${coreApiUrl}/auth/register/github`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      github_id: githubUser.id,
      name: githubUser.name,
      email: githubUser.email,
    }),
  }).then((res) => {
    if (!res.ok) throw new Error("failed to user register");
    return res.json();
  });

  const loginResponse: LoginResponse = await fetch(
    `${coreApiUrl}/auth/login/github`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        github_id: githubUser.id,
        email: githubUser.email,
      }),
    },
  ).then((res) => {
    if (!res.ok) throw new Error("failed to login");
    return res.json();
  });

  const session = await getSession();
  await session.onLogin(loginResponse.token);

  redirect("/user", RedirectType.replace);
}
