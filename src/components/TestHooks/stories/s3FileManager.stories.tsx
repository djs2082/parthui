import React from "react";
import { StoryObj, Meta } from "@storybook/react";
import TestUseS3FileManager from "./../../TestHooks/TestUseS3FileManager";

const meta: Meta<typeof TestUseS3FileManager> = {
  title: "Hooks/useS3FileManager",
  component: TestUseS3FileManager,
  argTypes: {
    dataToUpdate: {
      control: {
        type: "object",
      },
    },
    dataToAdd: {
      control: {
        type: "object",
      },
    },

    // theme: {
    //   control: { type: "select", options: ["basic", "shadi"] },
    // },
    // size: {
    //   control: { type: "select", options: ["small", "medium", "large"] },
    // },
  },
};

export default meta;

type Story = StoryObj<typeof TestUseS3FileManager>;

export const Test: Story = {
  args: {
    dataToUpdate: { firstName: "TestUpdated" },
    dataToAdd: { firstName: "Dilip", lastName: "joshi" },
    id: "8904f52d-0ca3-4ae7-9454-50ffac499849",
    configFileName: "config_test4.json",
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
