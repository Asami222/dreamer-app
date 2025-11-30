import type { Meta, StoryObj } from "@storybook/react";
import GotRewardCard from "./index";

const meta = {
  title: "Molecules/GotRewardCard",
  component: GotRewardCard,
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "報酬の内容",
    },
    star: {
      control: "number",
      description: "星の数",
    },
    createdAt: {
      control: "text",
      description: "取得時間",
    },
    onRemoveButtonClick: {
      action: "removed",
      description: "削除ボタンがクリックされたときのハンドラ",
    },
  },
} satisfies Meta<typeof GotRewardCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: "1",
    title: "旅行",
    star: 3,
    createdAt: "2025年10月31日",
  },
};

export const LongRewardName: Story = {
  args: {
    id: "2",
    title: "非常に長いご褒美名がここに入る例です。UIの崩れ確認用。",
    star: 5,
    createdAt: "2025年9月30日",
  },
};

export const WithRemoveAction: Story = {
  args: {
    id: "3",
    title: "テスト報酬",
    star: 2,
    createdAt: "2025年9月30日",
    onRemoveButtonClick: (id: string) => alert(`削除ボタンが押されました: ${id}`),
  },
};