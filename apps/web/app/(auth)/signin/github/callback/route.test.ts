import { RedirectType } from "next/navigation";
import { NextRequest } from "next/server";
import { describe, test, expect } from "vitest";
import { getRedisInstance } from "../../../../lib/test-utils/session";
import { server } from "../../../../mocks";
import { mockNavigation, mockCookies } from "../../../../lib/test-utils/next";
import { coreApiHandlers, githubApiHandlers } from "../../../mocks";
import { GET } from "./route";

const { redirectMock } = mockNavigation();
const { setCookiesMock } = mockCookies();

describe("GET", () => {
  test("access_tokenの取得エラー", async () => {
    // Arrange
    server.use(githubApiHandlers.accessToken.error());
    const request = new NextRequest(
      "http://localhost:3000/auth/github/callback?code=123",
    );
    // Act
    const responsePromise = GET(request);
    // Assert
    await expect(responsePromise).rejects.toThrow("failed to get access token");
  });

  test("github userの取得エラー", async () => {
    // Arrange
    server.use(
      githubApiHandlers.accessToken.success(),
      githubApiHandlers.user.error(),
    );
    const request = new NextRequest(
      "http://localhost:3000/auth/github/callback?code=123",
    );
    // Act
    const responsePromise = GET(request);
    // Assert
    await expect(responsePromise).rejects.toThrow("failed to get github user");
  });

  test("内部APIの登録処理エラー", async () => {
    // Arrange
    server.use(
      githubApiHandlers.accessToken.success(),
      githubApiHandlers.user.success(),
      coreApiHandlers.register.github.error(),
    );
    const request = new NextRequest(
      "http://localhost:3000/auth/github/callback?code=123",
    );
    // Act
    const responsePromise = GET(request);
    // Assert
    await expect(responsePromise).rejects.toThrow("failed to user register");
  });

  test("内部APIのログイン処理エラー", async () => {
    // Arrange
    server.use(
      githubApiHandlers.accessToken.success(),
      githubApiHandlers.user.success(),
      coreApiHandlers.register.github.success(),
      coreApiHandlers.login.github.error(),
    );
    const request = new NextRequest(
      "http://localhost:3000/auth/github/callback?code=123",
    );
    // Act
    const responsePromise = GET(request);
    // Assert
    await expect(responsePromise).rejects.toThrow("failed to login");
  });

  test("github idで登録成功時", async () => {
    // Arrange
    server.use(
      githubApiHandlers.accessToken.success(),
      githubApiHandlers.user.success(),
      coreApiHandlers.register.github.success(),
      coreApiHandlers.login.github.success(),
    );
    const request = new NextRequest(
      "http://localhost:3000/auth/github/callback?code=123",
    );
    const redis = getRedisInstance();
    // Act
    const response = await GET(request);
    // Assert
    expect(response).toBeUndefined();
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
