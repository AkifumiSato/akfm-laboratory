"use client";

import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { InputText } from "@/components/input-text";
import Link from "next/link";
import { stack } from "../../../styled-system/patterns";
import { Password } from "../password";
import { Typography } from "@/components/typography";
import { GithubSignIn } from "../github-signin";
import { SubmissionResult, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useFormState } from "react-dom";
import { loginSchema } from "./schema";

export function SingInPagePresentation({
  login,
}: {
  login: (
    // eslint-disable-next-line no-unused-vars
    _prevState: unknown,
    // eslint-disable-next-line no-unused-vars
    formData: FormData,
  ) => Promise<SubmissionResult<unknown> | undefined>;
}) {
  const [lastResult, action] = useFormState(login, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: loginSchema });
    },
    shouldValidate: "onBlur",
  });

  console.log("fields.email", fields.email.errors);

  return (
    <main className={stack({ gap: "10" })}>
      <div className={stack({ rowGap: 5 })}>
        <Typography tag="h1">Sign in</Typography>
        <form
          id={form.id}
          onSubmit={form.onSubmit}
          action={action}
          noValidate
          className={stack({
            rowGap: 10,
            width: "100%",
            alignItems: "center",
          })}
        >
          <Card>
            <Typography tag="h2">Email</Typography>
            <div className={stack({ gap: "5" })}>
              <InputText
                type="email"
                name="email"
                label="Email"
                errors={fields.email.errors as string[]}
              />
              <Password
                name="password"
                testId="signup-password"
                label="Password"
                errors={fields.password.errors as string[]}
              />
            </div>
            <Button color="blue">Sign in</Button>
            <div>
              <Link href="/signin/forgot">forgot password?</Link>
            </div>
          </Card>
          <Card>
            <Typography tag="h2">OAuth</Typography>
            <GithubSignIn />
          </Card>
        </form>
      </div>
    </main>
  );
}
