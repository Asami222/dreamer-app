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
  
  render: () => (
    <div
      style={{
        width: '800px',
        margin: '0 auto',
        border: '1px solid #eee',
        padding: '40px',
      }}
    >
      <RewardForm />
    </div>
  ),
}

// --- ② ローディング中 ---
export const Loading: Story = {
  args: {
    onRewardSave: fn(),
    isLoading: true,
  },
  render: () => (
    <div
      style={{
        width: '800px',
        margin: '0 auto',
        border: '1px solid #eee',
        padding: '40px',
      }}
    >
      <RewardForm />
    </div>
  ),
}

// --- ③ エラー表示中（UI見た目のみ再現）---
export const WithErrors: Story = {
 
  render: () => (
    <div
      style={{
        width: '800px',
        margin: '0 auto',
        border: '1px solid #eee',
        padding: '40px',
      }}
    >
      <RewardForm />
    </div>
  ),
}