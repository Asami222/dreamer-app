// server/utils/transform.ts

import type { Todo, Reward, GotReward } from "@prisma/client";
import { TodoUIModel, RewardUIModel, GotRewardUIModel } from "src/types/data";

// Todo
type TodoWithImageUrl = Todo & {
  imageUrl?: string;
};

export function toTodoUI(todo: TodoWithImageUrl): TodoUIModel {
  return {
    id: todo.id,
    title: todo.title,
    category: todo.category,
    star: todo.star ?? 0, // ⭐ nullを0に統一
    limit: todo.limit.length > 0 ? todo.limit : undefined,
    detail: todo.detail ?? undefined,
    description: todo.description ?? undefined,
    image: todo.imageUrl,
    createdAt: todo.createdAt.toISOString(), // DateのままだとJSON化で崩れやすい
  };
}

export function toTodosUI(todos: TodoWithImageUrl[]): TodoUIModel[] {
  return todos.map(toTodoUI);
}

// Reawrd
// libs/reward.ts から返る型を想定
type RewardWithImageUrl = Reward & {
  imageUrl?: string;
};

export function toRewardUI(reward: RewardWithImageUrl): RewardUIModel {
  return {
    id: reward.id,
    title: reward.title,
    star: reward.star ?? 0, // ⭐ null → 0
    image: reward.imageUrl,
    createdAt: reward.createdAt.toISOString(),
  };
}

export function toRewardsUI(
  rewards: RewardWithImageUrl[],
): RewardUIModel[] {
  return rewards.map(toRewardUI);
}

// GotReawrd
export function toGotRewardUI(gotReward: GotReward): GotRewardUIModel {
  return {
    id: gotReward.id,
    title: gotReward.title,
    star: gotReward.star ?? 0, // ⭐ nullを0に統一
    createdAt: gotReward.createdAt.toISOString(), // DateのままだとJSON化で崩れやすい
  };
}

export function toGotRewardsUI(gotRewards: GotReward[]): GotRewardUIModel[] {
  return gotRewards.map(toGotRewardUI);
}