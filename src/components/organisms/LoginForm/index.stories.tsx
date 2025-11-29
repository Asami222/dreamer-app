import type { Meta, StoryObj } from "@storybook/react";
import LoginForm from "./index";

// --- Meta情報 ---
const meta: Meta<typeof LoginForm> = {
  title: "Forms/LoginForm",
  component: LoginForm,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof LoginForm>;

// --- ① 通常状態 ---
export const Default: Story = {
  args: {
    onLogin: (username: string, password: string) => {
      console.log("✅ 通常ログイン:", { username, password });
    },
    onGuestLogin: () => {
      console.log("🧪 テストユーザーログイン:");
    },
    isLoading: false,
  },
  render: (args) => (
    <div
      style={{
        width: "420px",
        margin: "0 auto",
        padding: "40px",
        border: "1px solid #eee",
        borderRadius: "12px",
        background: "var(--bg-secondary, #f9f9f9)",
      }}
    >
      <LoginForm {...args} />
    </div>
  ),
};

// --- ② ローディング中 ---
export const Loading: Story = {
  args: {
    ...Default.args,
    isLoading: true,
  },
  render: (args) => (
    <div
      style={{
        width: "420px",
        margin: "0 auto",
        padding: "40px",
        border: "1px solid #eee",
        borderRadius: "12px",
      }}
    >
      <LoginForm {...args} />
    </div>
  ),
};

// --- ③ エラー表示中（UIのみ） ---
export const WithErrors: Story = {
  args: {
    ...Default.args,
    isLoading: false,
    submitError: "ユーザー名またはパスワードが正しくありません",
  },
  render: (args) => (
    <div
      style={{
        width: "420px",
        margin: "0 auto",
        padding: "40px",
        border: "1px solid #eee",
        borderRadius: "12px",
      }}
    >
      <LoginForm {...args} />
    </div>
  ),
};