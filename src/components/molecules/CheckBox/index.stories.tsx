

// src/components/CheckBox/CheckBox.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import CheckBox from './index'

const meta: Meta<typeof CheckBox> = {
  title: 'Molecules/CheckBox',
  component: CheckBox,
  parameters: {
    layout: 'centered',
  },
}
export default meta

type Story = StoryObj<typeof CheckBox>

/**
 * チェックボックスの通常表示
 */
export const Default: Story = {
  render: () => {
    const Wrapper = () => {
    const [isChecked, setIsChecked] = useState(false)
    return <CheckBox isChecked={isChecked} setIsChecked={setIsChecked} />
    }
    return <Wrapper />
  },
}

/**
 * チェック済みの初期状態
 */
export const Checked: Story = {
  render: () => {
    const Wrapper = () => {
      const [isChecked, setIsChecked] = useState(true)
      return <CheckBox isChecked={isChecked} setIsChecked={setIsChecked} />
    }
    return <Wrapper />
  },
}