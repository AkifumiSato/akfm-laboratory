import type { Meta, StoryObj } from "@storybook/react";
import { H1 } from "./h1";

const meta = {
  title: "components/H1",
  component: H1,
  tags: ["autodocs"],
} satisfies Meta<typeof H1>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Title",
  },
};
