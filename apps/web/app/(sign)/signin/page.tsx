"use client";

import type { JSX } from "react";
import { login } from "./action";
import { useFormState } from "react-dom";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { loginSchema } from "./schema";
import { stack } from "../../../styled-system/patterns";
import { Typography } from "@/components/typography";
import { Card } from "@/components/card";
import { InputText } from "@/components/input-text";
import { Password } from "../password";
import { Button } from "@/components/button";
import Link from "next/link";
import { GithubSignIn } from "../github-signin";

export default function Page(): JSX.Element {
  const [lastResult, action] = useFormState(login, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: loginSchema });
    },
    shouldValidate: "onBlur",
  });

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
                name={fields.email.name}
                label="Email"
                errors={fields.email.errors as string[]}
              />
              <Password
                name={fields.password.name}
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
