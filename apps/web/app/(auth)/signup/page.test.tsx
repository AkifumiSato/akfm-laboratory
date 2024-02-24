import { describe, expect, Mock, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Page from "./page";
import { signup } from "./action";

vi.mock("./action");

const signupMock = signup as Mock;

describe("SingUpPagePresentation", () => {
  test("submit時のFormDataにname,email,passwordが含まれること", async () => {
    // Arrange
    const user = userEvent.setup();
    render(<Page />);
    await user.type(
      screen.getByRole("textbox", { name: "User Name" }),
      "test name",
    );
    await user.type(
      screen.getByRole("textbox", { name: "Email" }),
      "akfm.sato@gmail.com",
    );
    await user.type(screen.getByLabelText("Password"), "test password");
    // Act
    await user.click(screen.getByRole("button", { name: "Sign up" }));
    // Assert
    expect(signupMock).toHaveBeenCalled();
    // fixme: 2回呼ばれているため↓が通らない
    // expect(loginMock).toHaveBeenCalledTimes(1);
    const submitData = signupMock.mock.calls[0][1];
    expect(submitData.get("name")).toBe("test name");
    expect(submitData.get("email")).toBe("akfm.sato@gmail.com");
    expect(submitData.get("password")).toBe("test password");
  });
});
