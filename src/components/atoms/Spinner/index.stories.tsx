import type { Meta, StoryObj } from "@storybook/react";
import Spinner from "./index";

const meta: Meta<typeof Spinner> = {
  title: "Atoms/Spinner",
  component: Spinner,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "number", min: 10, max: 200, step: 5 },
      description: "スピナーのサイズ(px)",
    },
    strokeWidth: {
      control: { type: "number", min: 1, max: 10, step: 1 },
      description: "線の太さ",
    },
    isAutoCentering: {
      control: "boolean",
      description: "スピナーを中央に自動配置するか",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// --------------------------------------------------
// デフォルト
export const Default: Story = {
  args: {
    size: 50,
    strokeWidth: 4,
    isAutoCentering: false,
  },
  render: (args) => (
    <div className="flex items-center justify-center h-40">
      <Spinner {...args} />
    </div>
  ),
};

// --------------------------------------------------
// 大サイズ
export const Large: Story = {
  args: {
    size: 100,
    strokeWidth: 6,
  },
  render: (args) => (
    <div className="flex items-center justify-center h-60">
      <Spinner {...args} />
    </div>
  ),
};

// --------------------------------------------------
// 自動中央寄せ
export const AutoCentered: Story = {
  args: {
    size: 60,
    strokeWidth: 4,
    isAutoCentering: true,
  },
  render: (args) => (
    <div className="relative w-60 h-60">
      <div className="absolute top-1/2 left-1/2">
        <Spinner {...args} />
      </div>
    </div>
  ),
};
