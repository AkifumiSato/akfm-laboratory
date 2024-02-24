import { z } from "zod";

export const forgotPasswordFormSchema = z.object({
  email: z
    .string({
      required_error: "メールアドレスは必須です",
    })
    .email("メールアドレスが無効です"),
});
