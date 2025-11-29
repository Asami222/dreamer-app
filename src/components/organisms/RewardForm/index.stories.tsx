import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import RewardForm from './index'

// --- Meta情報 ---
const meta: Meta<typeof RewardForm> = {
  title: 'Forms/RewardForm',
  component: RewardForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof RewardForm>

// --- ① 通常状態 ---
export const Default: Story = {
  args: {
    onRewardSave: fn(),
    isLoading: false,
  },
  render: (args) => (
    <div
      style={{
        width: '800px',
        margin: '0 auto',
        border: '1px solid #eee',
        padding: '40px',
      }}
    >
      <RewardForm {...args} />
    </div>
  ),
}

// --- ② ローディング中 ---
export const Loading: Story = {
  args: {
    onRewardSave: fn(),
    isLoading: true,
  },
  render: (args) => (
    <div
      style={{
        width: '800px',
        margin: '0 auto',
        border: '1px solid #eee',
        padding: '40px',
      }}
    >
      <RewardForm {...args} />
    </div>
  ),
}

// --- ③ エラー表示中（UI見た目のみ再現）---
export const WithErrors: Story = {
  args: {
    onRewardSave: fn(),
    isLoading: false,
    submitError: '星の数またはご褒美名を正しく入力してください',
  },
  render: (args) => (
    <div
      style={{
        width: '800px',
        margin: '0 auto',
        border: '1px solid #eee',
        padding: '40px',
      }}
    >
      <RewardForm {...args} />
    </div>
  ),
}