import { RedirectType } from "next/navigation";
import { describe, expect, test } from "vitest";
import { mockNavigation } from "../../../lib/test-utils/next";
import { server } from "../../../mocks";
import { coreApiHandlers } from "../../mocks";
import { resetPassword } from "./action";

const { redirectMock } = mockNavigation();

describe("reset action", () => {
  test("バリデーションエラー時、エラーメッセージが返却されること", async () => {
    // Act
    const res = await resetPassword(null, new FormData());
    // Assert
    expect(res?.status).toBe("error");
    expect(res?.error).toEqual({
      password: ["パスワードは必須です"],
      token: ["Required"],
    });
    expect(redirectMock).not.toBeCalled();
  });

  test("APIからエラー返却時、エラーメッセージが返却されること", async () => {
    server.use(coreApiHandlers.reset.error());
    const formData = new FormData();
    formData.append("password", "new password");
    formData.append("token", "DUMMY TOKEN");
    // Act
    const res = await resetPassword(null, formData);
    // Assert
    expect(res?.status).toBe("error");
    expect(res?.error).toEqual({
      "": ["エラーが発生しました。もう一度お試しください"],
    });
  });

  test("リセット成功時に`/users`へリダイレクト", async () => {
    server.use(coreApiHandlers.reset.success());
    const formData = new FormData();
    formData.append("password", "new password");
    formData.append("token", "DUMMY TOKEN");
    // Act
    const res = await resetPassword(null, formData);
    // Assert
    expect(res).toBeUndefined();
    expect(redirectMock).toBeCalledTimes(1);
    expect(redirectMock).toBeCalledWith("/user", RedirectType.replace);
  });
});
