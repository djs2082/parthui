import React from "react";
import { StoryObj, Meta } from "@storybook/react";
import { Modal } from "..";
import { PrimaryButton, SecondaryButton } from "../../Button";

const meta: Meta<typeof Modal> = {
  title: "Components/Modal",
  component: Modal,
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

type Story = StoryObj<typeof Modal>;

export const Primary: Story = {
  args: {
    header: <p>Modal Header</p>,
    body: <p>Modal Description goes here</p>,
    primaryButton: <PrimaryButton>Okay</PrimaryButton>,
    secondaryButton: <SecondaryButton>Cancel</SecondaryButton>,
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
