import { redirect } from "next/navigation";
import * as v from "valibot";
import { coreApiUrl } from "../../../lib/api-url";
import { ForgotPasswordPresentation } from "./presentation";

const resetPasswordFormSchema = v.object({
  password: v.string([]),
  token: v.string(),
});

export default function Page({
  searchParams: { token },
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  if (!token || Array.isArray(token)) {
    throw new Error("Invalid token");
  }

  async function action(data: FormData) {
    "use server";

    const user = {
      password: data.get("password"),
      token: token,
    };
    const validatedUser = v.safeParse(resetPasswordFormSchema, user);
    if (validatedUser.issues && validatedUser.issues.length > 0) {
      console.error("issues", validatedUser.issues);
      throw new Error("Invalid form data");
    }
    // todo: fetcher
    const response = await fetch(`${coreApiUrl}/auth/reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedUser.output),
    });

    if (response.status === 200) {
      console.log("action", response.status, await response.json());
      // todo: redirect to send success page
      redirect("/");
    } else {
      console.error("action failed", response.status, await response.json());
    }
  }

  return <ForgotPasswordPresentation action={action} />;
}
