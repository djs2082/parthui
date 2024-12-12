import React from "react";
import { StoryObj, Meta } from "@storybook/react";
import Loader from "../Loader";

const meta: Meta<typeof Loader> = {
  title: "Components/Loaders",
  component: Loader,
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

type Story = StoryObj<typeof Loader>;

export const Basic: Story = {
  args: {
    type: "basic",
    // children: "Primary Button",
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
