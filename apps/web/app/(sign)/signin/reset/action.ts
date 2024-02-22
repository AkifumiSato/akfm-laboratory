"use server";

import { resetPasswordFormSchema } from "./schema";
import { coreApiUrl } from "../../../lib/api-url";
import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod";

export async function resetPassword(_prevState: unknown, formData: FormData) {
  const submission = parseWithZod(formData, {
    schema: resetPasswordFormSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  // todo: fetcher
  const response = await fetch(`${coreApiUrl}/auth/reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(submission.value),
  });

  if (response.status === 200) {
    console.log("action", response.status, await response.json());
    // todo: redirect to send success page
    redirect("/");
  } else {
    console.error("action failed", response.status, await response.json());
  }
}
