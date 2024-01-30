import type { Meta, StoryObj } from "@storybook/react";
import { LinkButton } from "./link-button";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "components/LinkButton",
  component: LinkButton,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  // argTypes: {
  //   color: { control: "color" },
  // },
} satisfies Meta<typeof LinkButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Dark: Story = {
  args: {
    color: "dark",
    href: "/",
    children: "Link",
  },
};

export const Blue: Story = {
  args: {
    color: "blue",
    href: "/",
    children: "Link",
  },
};
