import { cookies } from "next/headers";
import { RedirectType, redirect } from "next/navigation";
import { Mock, describe, expect, test } from "vitest";
import { server } from "../../mocks";
import { coreApiHandlers } from "../mocks";
import { signup } from "./action";

const cookiesMock = cookies() as unknown as {
  get: Mock;
  set: Mock;
};

describe("sign up action", () => {
  test("バリデーションエラー時、エラーメッセージが返却されること", async () => {
    // Act
    const res = await signup(null, new FormData());
    // Assert
    expect(res?.status).toBe("error");
    expect(res?.error).toEqual({
      name: ["ユーザー名は必須です"],
    });
    expect(redirect).not.toBeCalled();
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
    expect(redirect).not.toBeCalled();
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
    expect(redirect).not.toBeCalled();
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
    expect(cookiesMock.set).toBeCalledTimes(1);
    expect(cookiesMock.set.mock.calls[0][0]).toBe("sessionId");
    expect(redirect).toBeCalledTimes(1);
    expect(redirect).toBeCalledWith("/user", RedirectType.replace);
  });
});
