import type { Meta, StoryObj } from "@storybook/react";
import GotRewardCard from "./index";

const meta = {
  title: "Molecules/GotRewardCard",
  component: GotRewardCard,
  tags: ["autodocs"],
  argTypes: {
    gotreward: {
      control: "text",
      description: "報酬の内容",
    },
    starNum: {
      control: "number",
      description: "星の数",
    },
    time: {
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
    id: 1,
    gotreward: "旅行",
    starNum: 3,
    time: "2025年10月31日",
  },
};

export const LongRewardName: Story = {
  args: {
    id: 2,
    gotreward: "非常に長いご褒美名がここに入る例です。UIの崩れ確認用。",
    starNum: 5,
    time: "2025年9月30日",
  },
};

export const WithRemoveAction: Story = {
  args: {
    id: 3,
    gotreward: "テスト報酬",
    starNum: 2,
    time: "2025年9月30日",
    onRemoveButtonClick: (id: number) => alert(`削除ボタンが押されました: ${id}`),
  },
};