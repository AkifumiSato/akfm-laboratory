"use client";

import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { InputText } from "@/components/input-text";
import { Typography } from "@/components/typography";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import type { JSX } from "react";
import { useFormState } from "react-dom";
import { css } from "../../../styled-system/css";
import { stack } from "../../../styled-system/patterns";
import { GithubSignIn } from "../github-signin";
import { Password } from "../password";
import { signup } from "./action";
import { signupFormSchema } from "./schema";

export default function SingUpPage(): JSX.Element {
  const [lastResult, action] = useFormState(signup, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: signupFormSchema });
    },
    shouldValidate: "onSubmit",
  });

  return (
    <main className={stack({ gap: "10" })}>
      <div className={stack({ rowGap: 5 })}>
        <Typography tag="h1">Sign up</Typography>
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
                type="text"
                name={fields.name.name}
                label="User Name"
                errors={fields.name.errors}
              />
              <InputText
                type="email"
                name={fields.email.name}
                label="Email"
                errors={fields.email.errors}
              />
              <Password
                name={fields.password.name}
                label="Password"
                errors={fields.password.errors}
              />
            </div>
            <Button type="submit" color="blue">
              Sign up
            </Button>
            {form.errors && (
              <Typography
                tag="p"
                mergeCss={css({
                  color: "red.500",
                  fontSize: "sm",
                })}
              >
                {form.errors.join(", ")}
              </Typography>
            )}
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
