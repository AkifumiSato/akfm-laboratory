import { RedirectType } from "next/navigation";
import { describe, test, expect } from "vitest";
import { server } from "../../mocks";
import { mockCookies, mockNavigation } from "../../lib/test-utils/next";
import { coreApiHandlers } from "../mocks";
import { signup } from "./action";

const { redirectMock } = mockNavigation();
const { setCookiesMock } = mockCookies();

describe("sign up action", () => {
  test("バリデーションエラー時、エラーメッセージが返却されること", async () => {
    // Act
    const res = await signup(null, new FormData());
    // Assert
    expect(res?.status).toBe("error");
    expect(res?.error).toEqual({
      name: ["ユーザー名は必須です"],
    });
    expect(redirectMock).not.toBeCalled();
  });

  test("登録済みエラー時、エラーメッセージが返却されること", async () => {
    server.use(coreApiHandlers.register.conflict());
    const formData = new FormData();
    formData.append("name", "test user");
    formData.append("email", "test@exampl.com");
    formData.append("password", "test password");
    // Act
    const res = await signup(null, formData);
    // Assert
    expect(res?.status).toBe("error");
    expect(res?.error).toEqual({
      "": ["すでにこのメールアドレスは登録済みです"],
    });
    expect(redirectMock).not.toBeCalled();
  });

  test("APIからエラー返却時、エラーメッセージが返却されること", async () => {
    server.use(coreApiHandlers.register.error());
    const formData = new FormData();
    formData.append("name", "test user");
    formData.append("email", "test@exampl.com");
    formData.append("password", "test password");
    // Act
    const res = await signup(null, formData);
    // Assert
    expect(res?.status).toBe("error");
    expect(res?.error).toEqual({
      "": ["エラーが発生しました。もう一度お試しください"],
    });
    expect(redirectMock).not.toBeCalled();
  });

  test("登録成功時に`/users`へリダイレクト", async () => {
    server.use(
      coreApiHandlers.register.success(),
      coreApiHandlers.login.success(),
    );
    const formData = new FormData();
    formData.append("name", "test user");
    formData.append("email", "test@exampl.com");
    formData.append("password", "test password");
    // Act
    const res = await signup(null, formData);
    // Assert
    expect(res).toBeUndefined();
    expect(setCookiesMock).toBeCalledTimes(1);
    expect(setCookiesMock.mock.calls[0][0]).toBe("sessionId");
    expect(redirectMock).toBeCalledTimes(1);
    expect(redirectMock).toBeCalledWith("/user", RedirectType.replace);
  });
});
