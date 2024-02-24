import { http, HttpResponse } from "msw";
import { RedirectType } from "next/navigation";
import { describe, test, expect } from "vitest";
import { coreApiUrl } from "../../lib/api/url";
import { server } from "../../mocks";
import { mockCookies, mockNavigation } from "../../test-utils/next";
import { login } from "./action";

const { redirectMock } = mockNavigation();
const { setCookiesMock } = mockCookies();

describe("sign in action", () => {
  test("emailなしのform data", async () => {
    // Act
    const res = await login(null, new FormData());
    // Assert
    expect(res?.status).toBe("error");
    expect(res?.error).toEqual({
      email: ["メールアドレスは必須です"],
    });
    expect(redirectMock).not.toBeCalled();
  });

  test("passwordなしのform data", async () => {
    // Arrange
    const formData = new FormData();
    formData.append("email", "test@example.com");
    // Act
    const res = await login(null, formData);
    // Assert
    expect(res?.status).toBe("error");
    expect(res?.error).toEqual({
      password: ["パスワードは必須です"],
    });
    expect(redirectMock).not.toBeCalled();
  });

  test("valid form data", async () => {
    server.use(
      http.post(`${coreApiUrl}/auth/login`, () => {
        return HttpResponse.json({
          token: "DUMMY TOKEN",
        });
      }),
    );
    const formData = new FormData();
    formData.append("email", "test@exampl.com");
    formData.append("password", "password");
    // Act
    const res = await login(null, formData);
    // Assert
    expect(res).toBeUndefined();
    expect(setCookiesMock).toBeCalledTimes(1);
    expect(setCookiesMock.mock.calls[0][0]).toBe("sessionId");
    expect(redirectMock).toBeCalledTimes(1);
    expect(redirectMock).toBeCalledWith("/user", RedirectType.replace);
  });
});
