import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { Prose } from "@/components/prose";
import React from "react";
import { stack } from "../../../../styled-system/patterns";
import { Password } from "../../password";

// todo: react-hook-form + realtime validation
export function ForgotPasswordPresentation({
  action,
}: {
  // eslint-disable-next-line no-unused-vars
  action: (data: FormData) => void;
}) {
  return (
    <main className={stack({ gap: "10" })}>
      <Prose>
        <h1>Reset Password</h1>
        <form
          action={action}
          className={stack({
            width: "100%",
            alignItems: "center",
          })}
        >
          <Card>
            <Password
              name="password"
              testId="new-password"
              label="New Password"
            />
            <Button color="dark">Submit</Button>
          </Card>
        </form>
      </Prose>
    </main>
  );
}
