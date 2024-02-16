import { redirect } from "next/navigation";
import type { JSX } from "react";
import * as v from "valibot";
import { coreApiUrl } from "../../lib/api-url";
import { SingInPagePresentation } from "./presentation";

const signInFormSchema = v.object({
  email: v.string([v.email()]),
  password: v.string([v.minLength(8), v.maxLength(100)]),
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
      console.log("action", response.status, await response.json());
      redirect("/");
    } else {
      console.error("action failed", response.status, await response.json());
    }
  }

  return <SingInPagePresentation action={action} />;
}
