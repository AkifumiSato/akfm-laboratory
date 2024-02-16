import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { SingInPagePresentation } from "./presentation";

describe("SingInPagePresentation", () => {
  test("submit時のFormDataにname,email,passwordが含まれること", async () => {
    // Arrange
    const user = userEvent.setup();
    const action = jest.fn();
    render(<SingInPagePresentation action={action} />);
    await user.type(
      screen.getByRole("textbox", { name: "Email" }),
      "akfm.sato@gmail.com",
    );
    await user.type(screen.getByTestId("signin-password"), "test password");
    // Act
    await user.click(screen.getByRole("button", { name: "Sign in" }));
    // Assert
    expect(action).toHaveBeenCalledTimes(1);
    const submitData = action.mock.calls[0][0];
    expect(submitData.get("email")).toBe("akfm.sato@gmail.com");
    expect(submitData.get("password")).toBe("test password");
  });
});
