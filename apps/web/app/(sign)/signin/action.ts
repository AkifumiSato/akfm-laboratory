"use server";

import { coreApiUrl } from "../../lib/api-url";
import { getSession, updateSession } from "../../lib/session";
import { redirect } from "next/navigation";
import { RedirectType } from "next/dist/client/components/redirect";
import { parseWithZod } from "@conform-to/zod";
import { loginSchema } from "./schema";

export async function login(_prevState: unknown, formData: FormData) {
  const submission = parseWithZod(formData, {
    schema: loginSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  // todo: fetcher
  const response = await fetch(`${coreApiUrl}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(submission.value),
  });

  if (response.status === 200) {
    const { token } = (await response.json()) as { token: string };
    const session = await getSession();
    session.currentUser = {
      ...session.currentUser,
      isLogin: true,
      token,
    };
    await updateSession(session);

    redirect("/", RedirectType.replace);
  } else {
    console.error("action failed", response.status, await response.json());
  }
}
