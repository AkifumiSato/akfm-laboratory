import type { Meta, StoryObj } from "@storybook/react";
import { Title } from "./title";

const meta = {
  title: "components/Title",
  component: Title,
  tags: ["autodocs"],
} satisfies Meta<typeof Title>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Title",
  },
};
