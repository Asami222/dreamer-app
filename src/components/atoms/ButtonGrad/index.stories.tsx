// Button2.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import ButtonGrad from './index'

const meta: Meta<typeof ButtonGrad> = {
  title: 'Atoms/ButtonGrad',
  component: ButtonGrad,
  args: {
    children: 'BUTTON',
    selectcolor: 'Red',
  },
}
export default meta

type Story = StoryObj<typeof ButtonGrad>

export const Default: Story = {}
export const Error: Story = { args: { hasError: true } }
export const Pink: Story = { args: { selectcolor: 'Pink' } }

/**
 * ローディング状態
 */
export const Loading: Story = {
  args: {
    loading: true,
    selectcolor: 'Red',
  },
}

/**
 * ローディング状態＋親から className 指定
 */
export const LoadingMesageWithClass: Story = {
  args: {
    loading: true,
    loadingMessage: '送信中...',
    selectcolor: 'Pink',
  },
}

export const LoadingWithClass: Story = {
  args: {
    loading: true,
    selectcolor: 'Pink',
  },
}

export const WithClass: Story = {
  args: {
    loading: false,
    selectcolor: 'Pink',
  },
}