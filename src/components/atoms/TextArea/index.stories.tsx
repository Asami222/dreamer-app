import type { Meta, StoryObj } from "@storybook/react";
import TextArea, { TextAreaProps } from "./index";

const meta: Meta<TextAreaProps> = {
  title: "Atoms/TextArea",
  component: TextArea,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    placeholder: "メッセージを入力してください",
    minRows: 3,
    maxRows: 10,
  },
  argTypes: {
    hasError: {
      control: "boolean",
      description: "エラー時のボーダー色を切り替えます",
    },
    hasBorder: {
      control: "boolean",
      description: "破線ボーダーを表示するかどうか",
    },
    minRows: {
      control: { type: "number", min: 1, max: 20 },
    },
    maxRows: {
      control: { type: "number", min: 1, max: 20 },
    },
  },
};

export default meta;
type Story = StoryObj<TextAreaProps>;

/**
 * デフォルト
 */
export const Default: Story = {
  args: {
    hasBorder: true,
    hasError: false,
  },
  render: (args) => (
    <div style={{ width: "1000px", margin: "0 auto" }}>
      <TextArea {...args} />
    </div>
  ),
};

/**
 * エラー状態
 */
export const Error: Story = {
  args: {
    hasBorder: true,
    hasError: true,
    placeholder: "入力内容にエラーがあります",
  },
  render: (args) => (
    <div style={{ width: "1000px", margin: "0 auto" }}>
      <TextArea {...args} />
    </div>
  ),
};

/**
 * ボーダーなし
 */
export const NoBorder: Story = {
  args: {
    hasBorder: false,
    placeholder: "ボーダーなしのテキストエリア",
  },
  render: (args) => (
    <div style={{ width: "1000px", margin: "0 auto" }}>
      <TextArea {...args} />
    </div>
  ),
};

/**
 * 多行入力テスト
 */
export const LongText: Story = {
  args: {
    hasBorder: true,
    children:
      "これは長文テキストの例です。\n自動で行数が増え、最大行数まで拡張されます。",
  },
  render: (args) => (
    <div style={{ width: "1000px", margin: "0 auto" }}>
      <TextArea {...args} />
    </div>
  ),
};