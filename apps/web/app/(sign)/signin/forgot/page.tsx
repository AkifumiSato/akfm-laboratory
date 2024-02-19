import { redirect } from "next/navigation";
import { coreApiUrl } from "../../../lib/api-url";
import { ForgotPasswordPresentation } from "./presentation";
import * as v from "valibot";

const forgotPasswordFormSchema = v.object({
  email: v.string([v.email()]),
});

export default function Page() {
  async function action(data: FormData) {
    "use server";

    const user = {
      email: data.get("email"),
    };
    const validatedUser = v.safeParse(forgotPasswordFormSchema, user);
    if (validatedUser.issues && validatedUser.issues.length > 0) {
      console.error("issues", validatedUser.issues);
      throw new Error("Invalid form data");
    }
    // todo: fetcher
    const response = await fetch(`${coreApiUrl}/auth/forgot`, {
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
