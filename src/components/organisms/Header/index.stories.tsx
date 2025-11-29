import type { Meta, StoryObj } from '@storybook/react'
import { HeaderUI } from './HeaderUI'

const meta: Meta<typeof HeaderUI> = {
  title: 'Organisms/Header',
  component: HeaderUI,
}

export default meta
type Story = StoryObj<typeof HeaderUI>

export const Default: Story = {
  args: {
    authUser: { profileImageUrl: '/sample2.png' },
  },
  render: (args) => (
    <div style={{ width: "1000px", margin: "0 auto", border: "1px solid #eee" }}>
      <HeaderUI {...args} />
    </div>
  ),
}

export const noProfileImage: Story = {
  args: {
    authUser: { },
  },
  render: (args) => (
    <div style={{ width: "1000px", margin: "0 auto", border: "1px solid #eee" }}>
      <HeaderUI {...args} />
    </div>
  ),
}
/*
export const Loading: Story = {
  args: {
    isLoading: true,
  },
  render: (args) => (
    <div style={{ width: "1000px", margin: "0 auto", border: "1px solid #eee" }}>
      <HeaderUI {...args} />
    </div>
  ),
}
*/
export const LoggedOut: Story = {
  args: {
    authUser: null,
  },
  render: (args) => (
    <div style={{ width: "1000px", margin: "0 auto", border: "1px solid #eee" }}>
      <HeaderUI {...args} />
    </div>
  ),
}