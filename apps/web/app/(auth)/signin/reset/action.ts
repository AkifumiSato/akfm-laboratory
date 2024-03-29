"use server";

import { parseWithZod } from "@conform-to/zod";
import { RedirectType } from "next/dist/client/components/redirect";
import { redirect } from "next/navigation";
import { coreApiUrl } from "../../../lib/api/url";
import { resetPasswordFormSchema } from "./schema";

export async function resetPassword(_prevState: unknown, formData: FormData) {
  const submission = parseWithZod(formData, {
    schema: resetPasswordFormSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const response = await fetch(`${coreApiUrl}/auth/reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(submission.value),
  });

  if (response.status === 200) {
    redirect("/user", RedirectType.replace);
  } else {
    console.error("action failed", response.status);
    return submission.reply({
      formErrors: ["エラーが発生しました。もう一度お試しください"],
    });
  }
}
