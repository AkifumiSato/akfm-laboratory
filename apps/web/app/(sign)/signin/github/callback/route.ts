import { redirect, RedirectType } from "next/navigation";
import { NextRequest } from "next/server";
import { coreApiUrl } from "../../../../lib/api/url";
import { getSession, updateSession } from "../../../../lib/session";

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
  const githubTokenResponse: GithubAccessTokenResponse = await fetch(
    `https://github.com/login/oauth/access_token?client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}&code=${code}`,
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
  // todo: fetcher
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

  // todo: fetcher
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
  session.currentUser = {
    ...session.currentUser,
    isLogin: true,
    token: loginResponse.token,
  };
  await updateSession(session);

  redirect("/user", RedirectType.replace);
}
