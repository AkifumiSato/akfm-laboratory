"use client";

import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { InputText } from "@/components/input-text";
import { Typography } from "@/components/typography";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import Link from "next/link";
import type { JSX } from "react";
import { useFormState } from "react-dom";
import { stack } from "../../../styled-system/patterns";
import { GithubSignIn } from "../github-signin";
import { Password } from "../password";
import { login } from "./action";
import { loginSchema } from "./schema";

export default function Page(): JSX.Element {
  const [lastResult, action] = useFormState(login, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: loginSchema });
    },
    shouldValidate: "onSubmit",
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
            <Button type="submit" color="blue">
              Sign in
            </Button>
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
