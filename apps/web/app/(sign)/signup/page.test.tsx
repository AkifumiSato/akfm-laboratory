import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SingUpPagePresentation } from "./page";

describe("SingUpPagePresentation", () => {
  test("submit時のFormDataにnameが含まれること", async () => {
    // Arrange
    const user = userEvent.setup();
    const action = jest.fn();
    render(<SingUpPagePresentation action={action} />);
    await user.type(
      screen.getByRole("textbox", { name: "User Name" }),
      "test name",
    );
    // Act
    await user.click(screen.getByRole("button", { name: "Sign up" }));
    // Assert
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Sign up",
    );
    const submitData = action.mock.calls[0][0];
    expect(submitData.get("name")).toBe("test name");
  });

  test.todo("submit時のFormDataにemailが含まれること");
  test.todo("submit時のFormDataにpasswordが含まれること");
});
