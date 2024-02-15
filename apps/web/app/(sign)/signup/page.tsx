import { redirect } from "next/navigation";
import type { JSX } from "react";
import { coreApiUrl } from "../../lib/api-url";
import { SingUpPagePresentation } from "./presentation";

export default function SingUpPage(): JSX.Element {
  async function action(data: FormData) {
    "use server";

    // todo: validation
    const user = {
      name: data.get("name"),
      email: data.get("email"),
      password: data.get("password"),
    };
    // todo: fetcher
    const response = await fetch(`${coreApiUrl}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    console.log("action", response.status, await response.json());
    redirect("/signup/completed");
  }

  return <SingUpPagePresentation action={action} />;
}
