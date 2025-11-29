import type { Meta, StoryObj } from "@storybook/react";
import UserProfile from "./index";

// --- Meta情報 ---
const meta: Meta<typeof UserProfile> = {
  title: "Molecules/UserProfile",
  component: UserProfile,
  args: {
    username: "あさみ",
    profileImageUrl: "/sample2.png",
    numberOfStars: 12,
    dream: "素敵なアプリを作る",
    limit: "2025年中",
  },
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof UserProfile>;

/**
 * 通常表示
 */
export const Default: Story = {};

/**
 * 夢と期限が未設定
 */
export const NoDreamOrLimit: Story = {
  args: {
    dream: "",
    limit: "",
  },
};

/**
 * 星が多い（表示テスト）
 */
export const ManyStars: Story = {
  args: {
    numberOfStars: 120,
  },
};

/**
 * プロフィール画像なし（noImg.webp 表示）
 */
export const NoImage: Story = {
  args: {
    profileImageUrl: "",
  },
};