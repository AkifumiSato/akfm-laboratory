import type { Meta, StoryObj } from "@storybook/react";
import { Typography } from "./typography";

const meta = {
  title: "components/Typography",
  component: Typography,
  tags: ["autodocs"],
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const H1: Story = {
  args: {
    children: "h1",
    tag: "h1",
  },
};

export const H2: Story = {
  args: {
    children: "h2",
    tag: "h2",
  },
};

export const Paragraph: Story = {
  args: {
    children: "paragraph",
    tag: "p",
  },
};
