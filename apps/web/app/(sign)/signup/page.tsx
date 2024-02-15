import { redirect } from "next/navigation";
import type { JSX } from "react";
import { coreApiUrl } from "../../lib/api-url";
import { SingUpPagePresentation } from "./presentation";
import * as v from "valibot";

const signupFormSchema = v.object({
  name: v.string([v.minLength(1), v.maxLength(100)]),
  email: v.string([v.email()]),
  password: v.string([v.minLength(8), v.maxLength(100)]),
});

export default function SingUpPage(): JSX.Element {
  async function action(data: FormData) {
    "use server";

    const user = {
      name: data.get("name"),
      email: data.get("email"),
      password: data.get("password"),
    };
    const validatedUser = v.safeParse(signupFormSchema, user);
    if (validatedUser.issues && validatedUser.issues.length > 0) {
      console.error("issues", validatedUser.issues);
      throw new Error("Invalid form data");
    }
    // todo: fetcher
    const response = await fetch(`${coreApiUrl}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedUser.output),
    });

    console.log("action", response.status, await response.json());
    redirect("/signup/completed");
  }

  return <SingUpPagePresentation action={action} />;
}
