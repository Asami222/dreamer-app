import type { Meta, StoryObj } from "@storybook/react";
import { HeaderUI } from "./HeaderUI";
import type { Profile } from "@/types/data";

const meta: Meta<typeof HeaderUI> = {
  title: "Organisms/Header",
  component: HeaderUI,
};

export default meta;
type Story = StoryObj<typeof HeaderUI>;

const baseStyle = {
  width: "1000px",
  margin: "0 auto",
  border: "1px solid #eee",
};

const dummyProfile: Profile = {
  id: "1",
  userId: "user-1",
  displayName: "asami",
  dream: null,
  limit: null,
  stars: 10,
  profileImageUrl: "/sample2.png",
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const Default: Story = {
  args: {
    profile: dummyProfile,
    profileImageUrl: "/sample2.png",
    onLogout: () => alert("logout"),
  },
  render: (args) => (
    <div style={baseStyle}>
      <HeaderUI {...args} />
    </div>
  ),
};

export const NoProfileImage: Story = {
  args: {
    profile: dummyProfile,
    profileImageUrl: null,
    onLogout: () => alert("logout"),
  },
  render: (args) => (
    <div style={baseStyle}>
      <HeaderUI {...args} />
    </div>
  ),
};

export const LoggedOut: Story = {
  args: {
    profile: null,
    profileImageUrl: null,
    onLogout: () => alert("logout"),
  },
  render: (args) => (
    <div style={baseStyle}>
      <HeaderUI {...args} />
    </div>
  ),
};