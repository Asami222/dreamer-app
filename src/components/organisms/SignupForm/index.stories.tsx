import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test';
import SignupForm from './index'

// --- Meta情報 ---
const meta: Meta<typeof SignupForm> = {
  title: 'Forms/NewSigninForm',
  component: SignupForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof SignupForm>

// --- ① 通常状態 ---
export const Default: Story = {
  args: {
    onSign: fn(),
    isLoading: false,
  },
  render: (args) => (
    <div style={{ width: "1000px", margin: "0 auto", border: "1px solid #eee" }}>
      <SignupForm {...args} />
    </div>
  ),
}

// --- ② ローディング中 ---
export const Loading: Story = {
  args: {
    onSign: fn(),
    isLoading: true,
  },
  render: (args) => (
    <div style={{ width: "1000px", margin: "0 auto", border: "1px solid #eee" }}>
      <SignupForm {...args} />
    </div>
  ),
}

// --- ③ エラー表示中（UI見た目のみ再現）---
export const WithErrors: Story = {
  args: {
    onSign: fn(),
    isLoading: false,
    submitError: "ユーザー名またはパスワードが正しくありません",
  },
  render: (args) => (
    <div style={{ width: "1000px", margin: "0 auto", border: "1px solid #eee" }}>
      <SignupForm {...args} />
    </div>
  ),
}