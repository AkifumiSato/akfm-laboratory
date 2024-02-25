import { RedirectType } from "next/navigation";
import { describe, expect, test } from "vitest";
import { mockNavigation } from "../../../lib/test-utils/next";
import { server } from "../../../mocks";
import { coreApiHandlers } from "../../mocks";
import { forgotEmail } from "./action";

const { redirectMock } = mockNavigation();

describe("forgot action", () => {
  test("バリデーションエラー時、エラーメッセージが返却されること", async () => {
    // Act
    const res = await forgotEmail(null, new FormData());
    // Assert
    expect(res?.status).toBe("error");
    expect(res?.error).toEqual({
      email: ["メールアドレスは必須です"],
    });
    expect(redirectMock).not.toBeCalled();
  });

  test("APIからエラー返却時、エラーメッセージが返却されること", async () => {
    server.use(coreApiHandlers.forgot.error());
    const formData = new FormData();
    formData.append("email", "test@exampl.com");
    // Act
    const res = await forgotEmail(null, formData);
    // Assert
    expect(res?.status).toBe("error");
    expect(res?.error).toEqual({
      "": ["エラーが発生しました。もう一度お試しください"],
    });
  });

  test("メール送信受理成功時に`/users`へリダイレクト", async () => {
    server.use(coreApiHandlers.forgot.success());
    const formData = new FormData();
    formData.append("email", "test@exampl.com");
    // Act
    const res = await forgotEmail(null, formData);
    // Assert
    expect(res).toBeUndefined();
    expect(redirectMock).toBeCalledTimes(1);
    expect(redirectMock).toBeCalledWith("/user", RedirectType.replace);
  });
});
