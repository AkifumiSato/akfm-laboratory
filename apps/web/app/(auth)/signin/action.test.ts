import { cookies } from "next/headers";
import { RedirectType, redirect } from "next/navigation";
import { Mock, describe, expect, test } from "vitest";
import { getRedisInstance } from "../../lib/test-utils/session";
import { server } from "../../mocks";
import { coreApiHandlers } from "../mocks";
import { login } from "./action";

const cookiesMock = cookies() as unknown as {
  get: Mock;
  set: Mock;
};

describe("sign in action", () => {
  test("バリデーションエラー時、エラーメッセージが返却されること", async () => {
    // Act
    const res = await login(null, new FormData());
    // Assert
    expect(res?.status).toBe("error");
    expect(res?.error).toEqual({
      email: ["メールアドレスは必須です"],
    });
    expect(redirect).not.toBeCalled();
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
    expect(redirect).toBeCalledTimes(1);
    expect(redirect).toBeCalledWith("/signin", RedirectType.replace);
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
    expect(cookiesMock.set).toBeCalledTimes(1);
    expect(cookiesMock.set.mock.calls[0][0]).toBe("sessionId");
    const sessionId = cookiesMock.set.mock.calls[0][1];
    const sessionValues = await redis
      .get(sessionId)
      .then((res) => (res === null ? null : JSON.parse(res)));
    expect(sessionValues).toEqual({
      currentUser: {
        isLogin: true,
        token: "DUMMY TOKEN",
      },
    });
    expect(redirect).toBeCalledTimes(1);
    expect(redirect).toBeCalledWith("/user", RedirectType.replace);
  });
});
