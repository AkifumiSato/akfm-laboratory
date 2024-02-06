import type { Meta, StoryObj } from "@storybook/react";
import { Prose } from "./prose";

const meta = {
  title: "components/Prose",
  component: Prose,
  tags: ["autodocs"],
} satisfies Meta<typeof Prose>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <>
        <h1>h1</h1>
        <h2>h2</h2>
        <p>Paragraph.</p>
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
        </ul>
      </>
    ),
  },
};
