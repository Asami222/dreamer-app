import type { Meta, StoryObj } from "@storybook/react";
import UserForm from "./index";

// --- Storybook メタ情報 ---
const meta: Meta<typeof UserForm> = {
  title: "Forms/UserForm",
  component: UserForm,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof UserForm>;

// --- 🧩 モック版 Template ---
const Template = () => {
  return (
    <div className="w-[420px] p-6 bg-[rgba(255,255,255,0.9)] rounded-2xl shadow-md">
      <UserForm />
    </div>
  );
};

// --- 🧪 各 Story ---
export const Default: Story = {
  render: () => <Template />,
};