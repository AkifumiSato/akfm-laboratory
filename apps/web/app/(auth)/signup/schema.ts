import { z } from "zod";

export const signupFormSchema = z.object({
  name: z.preprocess(
    (value) => (value === "" ? undefined : value),
    z
      .string({
        required_error: "ユーザー名は必須です",
      })
      .min(1, "ユーザー名は1文字以上で入力してください")
      .max(100, "ユーザー名は100文字以下で入力してください"),
  ),
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
