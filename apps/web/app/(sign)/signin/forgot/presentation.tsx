import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { InputText } from "@/components/input-text";
import { Prose } from "@/components/prose";
import { stack } from "../../../../styled-system/patterns";

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
        <h1>Forget Password</h1>
        <form
          action={action}
          className={stack({
            width: "100%",
            alignItems: "center",
          })}
        >
          <Card>
            <InputText type="email" name="email" label="Email" />
            <Button color="dark">Send</Button>
          </Card>
        </form>
      </Prose>
    </main>
  );
}
