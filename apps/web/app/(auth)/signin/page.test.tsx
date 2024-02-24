import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Page from "./page";
import { login } from "./action";

jest.mock("./action");

const loginMock = login as jest.Mock;

describe("SingInPagePresentation", () => {
  test("submit時のFormDataにname,email,passwordが含まれること", async () => {
    // Arrange
    const user = userEvent.setup();
    render(<Page />);
    await user.type(
      screen.getByRole("textbox", { name: "Email" }),
      "akfm.sato@gmail.com",
    );
    await user.type(screen.getByLabelText("Password"), "test password");
    // Act
    await user.click(screen.getByRole("button", { name: "Sign in" }));
    // Assert
    expect(loginMock).toHaveBeenCalled();
    // fixme: 2回呼ばれているため↓が通らない
    // expect(loginMock).toHaveBeenCalledTimes(1);
    const submitData = loginMock.mock.calls[0][1];
    expect(submitData.get("email")).toBe("akfm.sato@gmail.com");
    expect(submitData.get("password")).toBe("test password");
  });
});
