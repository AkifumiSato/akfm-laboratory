import { Button } from "@/components/button";
import { InputText } from "@/components/input-text";
import { Prose } from "@/components/prose";
import { css } from "../../../styled-system/css";
import { stack } from "../../../styled-system/patterns";
import { Password } from "../password";

// todo: react-hook-form + realtime validation
export function SingInPagePresentation({
  action,
}: {
  // eslint-disable-next-line no-unused-vars
  action: (data: FormData) => void;
}) {
  return (
    <main className={stack({ gap: "10" })}>
      <Prose>
        <h1>Sign in</h1>
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
              <div className={stack({ gap: "10" })}>
                <div className={stack({ gap: "5" })}>
                  <label className={labelStyle}>
                    Email
                    <InputText type="email" name="email" />
                  </label>
                  <label className={labelStyle}>
                    Password
                    <Password name="password" testId="signin-password" />
                  </label>
                </div>
                <Button color="blue">Sign in</Button>
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
