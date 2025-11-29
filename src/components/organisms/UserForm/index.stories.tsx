import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import UserForm from "./index";
import type { UserFormInput } from "src/libs/validations/user";

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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Template = (args: any) => {
  const [isLoading, setIsLoading] = useState(args.isLoading);

  return (
    <div className="w-[420px] p-6 bg-[rgba(255,255,255,0.9)] rounded-2xl shadow-md">
      <UserForm
        {...args}
        isLoading={isLoading}
        onSave={(data: UserFormInput) => {
          console.log("🎯 Submitted Data:", data);
          setIsLoading(true);
          setTimeout(() => setIsLoading(false), 1500);
        }}
      />
    </div>
  );
};

// --- 🧪 各 Story ---
export const Default: Story = {
  render: (args) => <Template {...args} />,
  args: {
    isLoading: false,
    submitError: "",
  },
};

export const Loading: Story = {
  render: (args) => <Template {...args} />,
  args: {
    isLoading: true,
    submitError: "",
  },
};

export const WithError: Story = {
  render: (args) => <Template {...args} />,
  args: {
    isLoading: false,
    submitError: "サーバーエラーが発生しました。",
  },
};

export const EmptySubmitError: Story = {
  render: (args) => <Template {...args} />,
  args: {
    isLoading: false,
    submitError: "",
  },
};