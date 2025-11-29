// Button2.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import Button2 from './index'

const meta: Meta<typeof Button2> = {
  title: 'Atoms/Button2',
  component: Button2,
  args: {
    children: 'BUTTON2',
  },
}
export default meta

type Story = StoryObj<typeof Button2>

export const Default: Story = {}
export const Disabled: Story = { args: { disabled: true } }