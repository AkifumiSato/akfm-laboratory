import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { InputText } from "@/components/input-text";
import { Prose } from "@/components/prose";
import { stack } from "../../../styled-system/patterns";
import { Password } from "../password";

// todo: react-hook-form + realtime validation
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
        <form
          action={action}
          className={stack({
            width: "100%",
            alignItems: "center",
          })}
        >
          <Card>
            <div className={stack({ gap: "5" })}>
              <InputText type="text" name="name" label="User Name" />
              <InputText type="email" name="email" label="Email" />
              <Password
                name="password"
                testId="signup-password"
                label="Password"
              />
            </div>
            <Button color="blue">Sign up</Button>
          </Card>
        </form>
      </Prose>
    </main>
  );
}
