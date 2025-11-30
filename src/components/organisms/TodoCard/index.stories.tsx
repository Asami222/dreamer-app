import type { Meta, StoryObj } from "@storybook/react";
import Todo from "./index";

const meta: Meta<typeof Todo> = {
  title: "Organisms/Todo",
  component: Todo,
  args: {
    id: "1",
    image: "/sample.png",
    title: "日記を書く",
    limit: [9, 18],
    star: 4,
    description:
      "毎日少しずつでも構わないので、感じたことを自由に書いてみよう。完璧さよりも継続が大切です。",
  },
};

export default meta;
type Story = StoryObj<typeof Todo>;

/**
 * 通常表示
 */
export const Default: Story = {
  args: {
    onCopyTextClick: (id) => console.log(`コピー: id=${id}`),
    onRemoveTextClick: (id) =>
      console.log(`完了: id=${id}`),
  },
};

/**
 * チェックボックス付き + 詳細あり
 */
export const WithDescription: Story = {
  args: {
    ...Default.args,
    description:
      "タスクの詳細内容をここに記載します。詳細ボタンを押すと開閉アニメーションが動作します。",
  },
};

/**
 * 詳細なし（詳細ボタン無効）
 */
export const NoDescription: Story = {
  args: {
    ...Default.args,
    description: undefined,
  },
};

/**
 * 期限が1つのみ
 */
export const SingleLimit: Story = {
  args: {
    ...Default.args,
    limit: [21],
    detail: "日",
    description: "寝る前に",
  },
};

/**
 * 画像なし
 */
export const NoImage: Story = {
  args: {
    ...Default.args,
    image: undefined,
  },
};