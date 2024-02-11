import { Button } from "@/components/button";
import { InputText } from "@/components/input-text";
import { css } from "@/styled-system/css";
import { stack } from "@/styled-system/patterns";
import type { JSX } from "react";
import { Prose } from "@/components/prose";

export default function Page(): JSX.Element {
  async function action(data: FormData) {
    "use server";

    // fix: fastify does not support server actions
    console.log("action", data);
  }

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
                    <InputText type="text" id="name" name="name" />
                  </label>
                  <label className={labelStyle}>
                    Email
                    <InputText type="email" id="email" name="email" />
                  </label>
                  <label className={labelStyle}>
                    Password
                    <InputText type="password" id="password" name="password" />
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
