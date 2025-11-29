import type { Meta, StoryObj } from '@storybook/react'
import Button from './index'

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  args: {
    children: '交換する',
    selectcolor: 'Orange',
  },
}
export default meta

type Story = StoryObj<typeof Button>

export const Default: Story = {}

export const Disabled: Story = {
  args: { disabled: true },
}

export const Yellow: Story = {
  args: { selectcolor: 'Yellow' },
}

export const Pink: Story = {
  args: { selectcolor: 'Pink' },
}

/**
 * ローディング状態
 */
export const Loading: Story = {
  args: {
    loading: true,
    selectcolor: 'Yellow',
  },
}

/**
 * ローディング状態＋親から className 指定
 */
export const LoadingMesageWithClass: Story = {
  args: {
    loading: true,
    loadingMessage: '交換中...',
    selectcolor: 'Yellow',
    className: 'w-[104px] h-[28px] rounded-[5px] text-[14px] inline-block text-(--text) text-center',
  },
}

export const LoadingWithClass: Story = {
  args: {
    loading: true,
    selectcolor: 'Yellow',
    className: 'w-[104px] h-[28px] rounded-[5px] text-[14px] inline-block text-(--text) text-center',
  },
}

export const WithClass: Story = {
  args: {
    loading: false,
    selectcolor: 'Yellow',
    className: 'w-[104px] h-[28px] rounded-[5px] text-[14px] inline-block text-(--text) text-center',
  },
}