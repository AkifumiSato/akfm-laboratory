"use client";

import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { InputText } from "@/components/input-text";
import { Typography } from "@/components/typography";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useFormState } from "react-dom";
import { stack } from "../../../../styled-system/patterns";
import { forgotEmail } from "./action";
import { forgotPasswordFormSchema } from "./schema";

export default function Page() {
  const [lastResult, action] = useFormState(forgotEmail, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: forgotPasswordFormSchema });
    },
    shouldValidate: "onSubmit",
  });

  return (
    <main className={stack({ gap: "10" })}>
      <div className={stack({ rowGap: 5 })}>
        <Typography tag="h1">Forget Password</Typography>
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
            <InputText
              type="email"
              name={fields.email.name}
              label="Email"
              errors={fields.email.errors}
            />
            <Button type="submit" color="dark">
              Send
            </Button>
          </Card>
        </form>
      </div>
    </main>
  );
}
