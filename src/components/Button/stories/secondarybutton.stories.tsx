import React from "react";
import { StoryObj, Meta } from "@storybook/react";
import { SecondaryButton } from "..";

const meta: Meta<typeof SecondaryButton> = {
  title: "Components/Button",
  component: SecondaryButton,
  argTypes: {
    // theme: {
    //   control: { type: "select", options: ["basic", "shadi"] },
    // },
    // size: {
    //   control: { type: "select", options: ["small", "medium", "large"] },
    // },
  },
};

export default meta;

type Story = StoryObj<typeof SecondaryButton>;

export const Secondary: Story = {
  args: {
    children: "Secondary Button",
    // variant: "primary",
    // size: "medium",
  },
};

// export const Secondary: Story = {
//   args: {
//     children: "Secondary Button",
//     type: "secondary",
//     // variant: "secondary",
//     // size: "medium",
//   },
// };
