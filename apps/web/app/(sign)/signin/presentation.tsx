import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { InputText } from "@/components/input-text";
import Link from "next/link";
import { stack } from "../../../styled-system/patterns";
import { Password } from "../password";
import { Typography } from "@/components/typography";

// todo: react-hook-form + realtime validation
export function SingInPagePresentation({
  action,
}: {
  // eslint-disable-next-line no-unused-vars
  action: (data: FormData) => void;
}) {
  return (
    <main className={stack({ gap: "10" })}>
      <div className={stack({ rowGap: 5 })}>
        <Typography tag="h1">Sign in</Typography>
        <form
          action={action}
          className={stack({
            width: "100%",
            alignItems: "center",
          })}
        >
          <Card>
            <div className={stack({ gap: "5" })}>
              <InputText type="email" name="email" label="Email" />
              <Password
                name="password"
                testId="signup-password"
                label="Password"
              />
            </div>
            <Button color="blue">Sign in</Button>
            <div>
              <Link href="/signin/forgot">forgot password?</Link>
            </div>
          </Card>
        </form>
      </div>
    </main>
  );
}
