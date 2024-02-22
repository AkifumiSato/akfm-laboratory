import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { InputText } from "@/components/input-text";
import { stack } from "../../../../styled-system/patterns";
import { Typography } from "@/components/typography";

// todo: react-hook-form + realtime validation
export function ForgotPasswordPresentation({
  action,
}: {
  // eslint-disable-next-line no-unused-vars
  action: (data: FormData) => void;
}) {
  return (
    <main className={stack({ gap: "10" })}>
      <div className={stack({ rowGap: 5 })}>
        <Typography tag="h1">Forget Password</Typography>
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
      </div>
    </main>
  );
}
