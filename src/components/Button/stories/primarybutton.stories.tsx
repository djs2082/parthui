import React from "react";
import { StoryObj, Meta } from "@storybook/react";
import { PrimaryButton } from "..";

const meta: Meta<typeof PrimaryButton> = {
  title: "Components/Button",
  component: PrimaryButton,
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

type Story = StoryObj<typeof PrimaryButton>;

export const Primary: Story = {
  args: {
    children: "Primary Button",
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
