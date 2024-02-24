"use server";

import { parseWithZod } from "@conform-to/zod";
import { RedirectType } from "next/dist/client/components/redirect";
import { redirect } from "next/navigation";
import { coreApiUrl } from "../../lib/api/url";
import { getSession } from "../../lib/session";
import { signupFormSchema } from "./schema";

export async function signup(_prevState: unknown, formData: FormData) {
  const submission = parseWithZod(formData, {
    schema: signupFormSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  // todo: fetcher
  const registerResponse = await fetch(`${coreApiUrl}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(submission.value),
  });

  if (registerResponse.status === 200) {
    const loginResponse = await fetch(`${coreApiUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submission.value),
    });
    if (loginResponse.status === 200) {
      const { token } = (await loginResponse.json()) as { token: string };
      const session = await getSession();
      await session.onLogin(token);

      redirect("/user", RedirectType.replace);
    } else {
      console.error(
        "action failed",
        loginResponse.status,
        await loginResponse.json(),
      );
    }
  } else if (registerResponse.status === 409) {
    return submission.reply({
      formErrors: ["すでにこのメールアドレスは登録済みです"],
    });
  } else {
    console.error(
      "action failed",
      registerResponse.status,
      await registerResponse.json(),
    );
    return submission.reply({
      formErrors: ["エラーが発生しました。もう一度お試しください"],
    });
  }
}
