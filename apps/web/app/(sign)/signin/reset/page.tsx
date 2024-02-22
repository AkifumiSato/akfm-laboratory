"use client";

import { resetPassword } from "./action";
import { stack } from "../../../../styled-system/patterns";
import { Typography } from "@/components/typography";
import { Card } from "@/components/card";
import { Password } from "../../password";
import { Button } from "@/components/button";
import React from "react";
import { useFormState } from "react-dom";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { resetPasswordFormSchema } from "./schema";

export default function Page({
  searchParams: { token },
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  if (!token || Array.isArray(token)) {
    throw new Error("Invalid token");
  }

  const [lastResult, action] = useFormState(resetPassword, undefined);
  const [form, fields] = useForm({
    // Sync the result of last submission
    lastResult,

    // Reuse the validation logic on the client
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: resetPasswordFormSchema });
    },

    // Validate the form on blur event triggered
    shouldValidate: "onBlur",
  });

  return (
    <main className={stack({ gap: "10" })}>
      <div className={stack({ rowGap: 5 })}>
        <Typography tag="h1">Reset Password</Typography>
        <form
          id={form.id}
          onSubmit={form.onSubmit}
          action={action}
          noValidate
          className={stack({
            width: "100%",
            alignItems: "center",
          })}
        >
          <Card>
            <Password
              name="password"
              label="New Password"
              errors={fields.password.errors}
            />
            <input type="hidden" name={fields.token.name} value={token} />
            <Button color="dark">Submit</Button>
          </Card>
        </form>
      </div>
    </main>
  );
}
