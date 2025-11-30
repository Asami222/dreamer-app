import type { Meta, StoryObj } from "@storybook/react";
import TodoForm from "./index";
import { useState } from "react";
import type { Category2 } from "src/types/data";

const meta: Meta<typeof TodoForm> = {
  title: "Forms/TodoForm",
  component: TodoForm,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof TodoForm>;

// Template
const Template = (args: { category: Category2 }) => {
  return (
    <div className="w-[420px] p-6 bg-[rgba(255,255,255,0.9)] rounded-2xl shadow-md">
      <TodoForm {...args} />
    </div>
  );
};

// 各ストーリー
export const Day: Story = {
  render: (args) => <Template {...args} />,
  args: {
    category: "day",
  },
};

export const Week: Story = {
  render: (args) => <Template {...args} />,
  args: {
    category: "week",
  },
};

export const Month: Story = {
  render: (args) => <Template {...args} />,
  args: {
    category: "month",
  },
};

export const Year: Story = {
  render: (args) => <Template {...args} />,
  args: {
    category: "year",
  },
};

export const Hour: Story = {
  render: (args) => <Template {...args} />,
  args: {
    category: "time",
  },
};