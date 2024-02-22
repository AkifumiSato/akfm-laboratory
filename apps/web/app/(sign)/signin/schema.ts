import { z } from "zod";

export const loginSchema = z.object({
  email: z.preprocess(
    (value) => (value === "" ? undefined : value),
    z
      .string({
        required_error: "メールアドレスは必須です",
      })
      .email("メールアドレスが無効です"),
  ),
  password: z.preprocess(
    (value) => (value === "" ? undefined : value),
    z
      .string({
        required_error: "パスワードは必須です",
      })
      .min(4, "パスワードは4文字以上で入力してください")
      .max(100, "パスワードは100文字以下で入力してください"),
  ),
});
