import type { Meta, StoryObj } from '@storybook/react'
import BtnLink from './index'

const meta: Meta<typeof BtnLink> = {
  title: 'Atoms/Button',
  component: BtnLink,
  args: {
    children: '年単位',
  },
}
export default meta

type Story = StoryObj<typeof BtnLink>

export const Default: Story = {}

export const Disabled: Story = {
  args: { disabled: true },
}

/**
 * ローディング状態
 */
export const Loading: Story = {
  args: {
    loading: true,
  },
}

/**
 * ローディング状態＋親から className 指定
 */
export const LoadingMesageWithClass: Story = {
  args: {
    loading: true,
    loadingMessage: '交換中...',
    className: 'w-[104px] h-[28px] rounded-[5px] text-[14px] inline-block text-(--text) text-center',
  },
}

export const LoadingWithClass: Story = {
  args: {
    loading: true,
    className: 'w-[104px] h-[28px] rounded-[5px] text-[14px] inline-block text-(--text) text-center',
  },
}

export const WithClass: Story = {
  args: {
    loading: false,
    className: 'w-[104px] h-[28px] rounded-[5px] text-[14px] inline-block text-(--text) text-center',
  },
}