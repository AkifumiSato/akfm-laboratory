import { RedirectType } from "next/navigation";
import { describe, expect, test } from "vitest";
import { mockCookies, mockNavigation } from "../../lib/test-utils/next";
import { getRedisInstance } from "../../lib/test-utils/session";
import { server } from "../../mocks";
import { coreApiHandlers } from "../mocks";
import { login } from "./action";

const { redirectMock } = mockNavigation();
const { setCookiesMock } = mockCookies();

describe("sign in action", () => {
  test("バリデーションエラー時、エラーメッセージが返却されること", async () => {
    // Act
    const res = await login(null, new FormData());
    // Assert
    expect(res?.status).toBe("error");
    expect(res?.error).toEqual({
      email: ["メールアドレスは必須です"],
    });
    expect(redirectMock).not.toBeCalled();
  });

  test("APIからエラー返却時、`/signin`へリダイレクト", async () => {
    server.use(coreApiHandlers.login.error());
    const formData = new FormData();
    formData.append("email", "test@exampl.com");
    formData.append("password", "password");
    // Act
    const res = await login(null, formData);
    // Assert
    expect(res).toBeUndefined();
    expect(redirectMock).toBeCalledTimes(1);
    expect(redirectMock).toBeCalledWith("/signin", RedirectType.replace);
  });

  test("登録成功時に`/users`へリダイレクト", async () => {
    server.use(coreApiHandlers.login.success());
    const formData = new FormData();
    formData.append("email", "test@exampl.com");
    formData.append("password", "password");
    const redis = getRedisInstance();
    // Act
    const res = await login(null, formData);
    // Assert
    expect(res).toBeUndefined();
    expect(setCookiesMock).toBeCalledTimes(1);
    expect(setCookiesMock.mock.calls[0][0]).toBe("sessionId");
    const sessionId = setCookiesMock.mock.calls[0][1];
    const sessionValues = await redis
      .get(sessionId)
      .then((res) => (res === null ? null : JSON.parse(res)));
    expect(sessionValues).toEqual({
      currentUser: {
        isLogin: true,
        token: "DUMMY TOKEN",
      },
    });
    expect(redirectMock).toBeCalledTimes(1);
    expect(redirectMock).toBeCalledWith("/user", RedirectType.replace);
  });
});
