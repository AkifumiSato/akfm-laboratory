"use server";

import { RedirectType } from "next/dist/client/components/redirect";
import { coreApiUrl } from "../../../lib/api/url";
import { redirect } from "next/navigation";
import { forgotPasswordFormSchema } from "./schema";
import { parseWithZod } from "@conform-to/zod";

export async function forgotEmail(_prevStata: unknown, formData: FormData) {
  const submission = parseWithZod(formData, {
    schema: forgotPasswordFormSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const response = await fetch(`${coreApiUrl}/auth/forgot`, {
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
