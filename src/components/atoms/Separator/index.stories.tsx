import type { Meta, StoryObj } from "@storybook/react";
import Separator from "./index";

const meta: Meta<typeof Separator> = {
  title: "Atoms/Separator",
  component: Separator,
  tags: ["autodocs"],
  argTypes: {
    children: { control: "text", description: "中央に表示する文字" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// --------------------------------------------------
// デフォルト（文字なし）
export const Default: Story = {
  args: {},
  render: (args) => (
    <div style={{ width: "1000px", margin: "0 auto", border: "1px solid #eee" }}>
      <Separator {...args} />
    </div>
  ),
};

// --------------------------------------------------
// 文字あり
export const WithText: Story = {
  args: { children: "OR" },
  render: (args) => (
    <div style={{ width: "1000px", margin: "0 auto", border: "1px solid #eee" }}>
      <Separator {...args} />
    </div>
  ),
};

// --------------------------------------------------
// カスタムテキスト
export const CustomText: Story = {
  args: { children: "セパレーター" },
  render: (args) => (
    <div style={{ width: "1000px", margin: "0 auto", border: "1px solid #eee" }}>
      <Separator {...args} />
    </div>
  ),
};