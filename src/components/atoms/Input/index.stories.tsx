import type { Meta, StoryObj } from "@storybook/react";
import Input,{ InputProps } from "./index";

const meta: Meta<typeof Input> = {
  title: "Atoms/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    hasError: { control: "boolean", description: "エラー表示かどうか" },
    hasBorder: { control: "boolean", description: "ボーダーの有無" },
    small: { control: "boolean", description: "小サイズ入力かどうか" },
    height: { control: "text", description: "高さ(px)", defaultValue: "56px" },
    placeholder: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// --------------------------------------------------
// 基本のInput
// --------------------------------------------------
export const Default: Story = {
  args: {
    height: "56px",
    placeholder: "入力してください",
    hasBorder: true,
    hasError: false,
    small: false,
  },
  render: (args: InputProps) => <Input {...args} />,
};

// --------------------------------------------------
// エラー状態
// --------------------------------------------------
export const Error: Story = {
  args: {
    height: "56px",
    placeholder: "必須項目です",
    hasBorder: true,
    hasError: true,
    small: false,
  },
  render: (args: InputProps) => <Input {...args} />,
};

// --------------------------------------------------
// 小サイズ
// --------------------------------------------------
export const Small: Story = {
  args: {
    height: "40px",
    placeholder: "小サイズ",
    hasBorder: true,
    hasError: false,
    small: true,
  },
  render: (args: InputProps) => <Input {...args} />,
};

// --------------------------------------------------
// ボーダーなし
// --------------------------------------------------
export const NoBorder: Story = {
  args: {
    height: "56px",
    placeholder: "ボーダーなし",
    hasBorder: false,
    hasError: false,
    small: false,
  },
  render: (args: InputProps) => <Input {...args} />,
};