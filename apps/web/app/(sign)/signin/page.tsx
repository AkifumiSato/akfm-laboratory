import { RedirectType } from "next/dist/client/components/redirect";
import { redirect } from "next/navigation";
import type { JSX } from "react";
import * as v from "valibot";
import { coreApiUrl } from "../../lib/api-url";
import { getSession } from "../../lib/session";
import { SingInPagePresentation } from "./presentation";

const signInFormSchema = v.object({
  email: v.string([v.email()]),
  password: v.string([v.minLength(4), v.maxLength(100)]),
});

export default function Page(): JSX.Element {
  async function action(data: FormData) {
    "use server";

    const user = {
      email: data.get("email"),
      password: data.get("password"),
    };
    const validatedUser = v.safeParse(signInFormSchema, user);
    if (validatedUser.issues && validatedUser.issues.length > 0) {
      console.error("issues", validatedUser.issues);
      throw new Error("Invalid form data");
    }
    // todo: fetcher
    const response = await fetch(`${coreApiUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedUser.output),
    });

    if (response.status === 200) {
      const { token } = (await response.json()) as { token: string };
      const session = getSession();
      if (!session) throw new Error("session not found");
      session.currentUser = {
        ...session.currentUser,
        isLogin: true,
        token,
      };
      await session.save();

      redirect("/debug", RedirectType.replace);
    } else {
      console.error("action failed", response.status, await response.json());
    }
  }

  return <SingInPagePresentation action={action} />;
}
