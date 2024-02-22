"use server";

import { parseWithZod } from "@conform-to/zod";
import { redirect } from "next/navigation";
import { coreApiUrl } from "../../lib/api-url";
import { signupFormSchema } from "./schema";

export async function signup(_prevState: unknown, formData: FormData) {
  const submission = parseWithZod(formData, {
    schema: signupFormSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  // todo: fetcher
  const response = await fetch(`${coreApiUrl}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(submission.value),
  });

  if (response.status === 200) {
    redirect("/signup/completed");
  } else {
    console.error("action failed", response.status, await response.json());
  }
}