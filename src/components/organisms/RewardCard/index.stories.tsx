import type { Meta, StoryObj } from "@storybook/react";
import RewardCardPresenter from "./RewardCardUI";

const meta: Meta<typeof RewardCardPresenter> = {
  title: "Molecules/RewardCard",
  component: RewardCardPresenter,
  args: {
    rewardId: "1",
    rewardImageUrl: "/sample.png",
    reward: "チョコレート",
    starNum: 5,
    userHasStar: 30,
  },
};

export default meta;
type Story = StoryObj<typeof RewardCardPresenter>;

/**
 * 通常表示
 */
export const Default: Story = {
  args: {
    onChangeButtonClick: (id) =>
      alert(`交換ボタンが押されました: id=${id}`),
    onRemoveButtonClick: (id) => alert(`削除: ${id}`),
  },
};

/**
 * ボタン無効（星が足りない）
 */
export const Disabled: Story = {
  args: {
    onChangeButtonClick: () => alert("クリック不可"),
    onRemoveButtonClick: (id) => alert(`削除: ${id}`),
  },
};

/**
 * ローディング中（交換中…）
 */
export const Loading: Story = {
  args: {
    isLoading: true,
    onChangeButtonClick: () => {},
    onRemoveButtonClick: () => {},
  },
};