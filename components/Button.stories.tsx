import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button/Button";
import React from "react";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  argTypes: {
    variant: {
      control: "radio",
      options: ["primary", "secondary"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    title: "Primary Button",
    variant: "primary",
    onPress: () => console.log("Primary pressed"),
  },
};

export const Secondary: Story = {
  args: {
    title: "Secondary Button",
    variant: "secondary",
    onPress: () => console.log("Secondary pressed"),
  },
};
