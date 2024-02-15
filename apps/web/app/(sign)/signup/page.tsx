import { Button } from "@/components/button";
import { InputText } from "@/components/input-text";
import type { JSX } from "react";
import { Prose } from "@/components/prose";
import { css } from "../../../styled-system/css";
import { stack } from "../../../styled-system/patterns";
import { coreApiUrl } from "../../lib/api-url";
import { Password } from "./password";

export function SingUpPagePresentation({
  action,
}: {
  // eslint-disable-next-line no-unused-vars
  action: (data: FormData) => void;
}) {
  return (
    <main className={stack({ gap: "10" })}>
      <Prose>
        <h1>Sign up</h1>
        <div
          className={stack({
            width: "100%",
            alignItems: "center",
          })}
        >
          <div
            className={css({
              padding: "5",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
              borderRadius: "5px",
              width: "100%",
              maxWidth: "600px",
            })}
          >
            <form action={action}>
              <h2>Register</h2>
              <div className={stack({ gap: "10", marginTop: "5" })}>
                <div className={stack({ gap: "5" })}>
                  <label className={labelStyle}>
                    User Name
                    <InputText type="text" name="name" />
                  </label>
                  <label className={labelStyle}>
                    Email
                    <InputText type="email" name="email" />
                  </label>
                  <label className={labelStyle}>
                    Password
                    <Password name="password" testId="signup-password" />
                  </label>
                </div>
                <Button color="blue">Sign up</Button>
              </div>
            </form>
          </div>
        </div>
      </Prose>
    </main>
  );
}

const labelStyle = css({
  display: "flex",
  flexDirection: "column",
  rowGap: "1",
});

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
  }

  return <SingUpPagePresentation action={action} />;
}
