import { Meta, StoryFn } from '@storybook/react'
import RectLoader from './index'

export default {
  title: 'Atoms/RectLoader',
  argTypes: {
    width: {
      control: { type: 'number' },
      defaultValue: 350,
      description: '横幅',
      table: {
        type: { summary: 'number' },
      },
    },
    height: {
      control: { type: 'number' },
      description: '縦幅',
      defaultValue: 215,
      table: {
        type: { summary: 'number' },
      },
    },
  },
} as Meta<typeof RectLoader>

const Template: StoryFn<typeof RectLoader> = (args) => (
  <RectLoader {...args} />
)

export const Normal = Template.bind({})
Normal.args = { width: 350, height: 215 }