import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import TodoForm from "./index";
import type { TodoFormData } from "src/types/data";

// --- Storybook メタ情報 ---
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

// --- 🧩 モック版 Template ---
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Template = (args: any) => {
  const [value, setValue] = useState(3); // 星の初期値
  return (
    <div className="w-[420px] p-6 bg-[rgba(255,255,255,0.9)] rounded-2xl shadow-md">
      <TodoForm
        {...args}
        title={args.title}
        value={value}
        setValue={setValue}
        onTodoSave={(data: TodoFormData) => {
          console.log("🎯 Submitted Data:", data);
        }}
      />
    </div>
  );
};

// --- 🧪 各 Story ---
export const Default: Story = {
  render: (args) => <Template {...args} />,
  args: {
    title: "日",
    isLoading: false,
    submitError: "",
  },
};

export const Loading: Story = {
  render: (args) => <Template {...args} />,
  args: {
    title: "月",
    isLoading: true,
    submitError: "",
  },
};

export const WithError: Story = {
  render: (args) => <Template {...args} />,
  args: {
    title: "年",
    isLoading: false,
    submitError: "サーバーエラーが発生しました。",
  },
};