// server/utils/transform.ts
import type { Prisma } from "@prisma/client";
import { TodoUIModel, RewardUIModel, GotRewardUIModel } from "src/types/data";

type Todo = Prisma.TodoGetPayload<object>
type Reward = Prisma.RewardGetPayload<object>
type GotReward = Prisma.GotRewardGetPayload<object>

// Todo
export function toTodoUI(todo: Todo): TodoUIModel {
  return {
    id: todo.id,
    title: todo.todo,
    category: todo.category,
    star: todo.starNum ?? 0, // ⭐ nullを0に統一
    limit: todo.limit.length > 0 ? todo.limit : undefined,
    detail: todo.detail ?? undefined,
    description: todo.description ?? undefined,
    image: todo.image ?? undefined,
    createdAt: todo.createdAt.toISOString(), // DateのままだとJSON化で崩れやすい
  };
}

export function toTodosUI(todos: Todo[]): TodoUIModel[] {
  return todos.map(toTodoUI);
}

// Reawrd
export function toRewardUI(reward: Reward): RewardUIModel {
  return {
    id: reward.id,
    title: reward.reward,
    star: reward.starPieces ?? 0, // ⭐ nullを0に統一
    image: reward.image ?? undefined,
    createdAt: reward.createdAt.toISOString(), // DateのままだとJSON化で崩れやすい
  };
}

export function toRewardsUI(rewards: Reward[]): RewardUIModel[] {
  return rewards.map(toRewardUI);
}

// GotReawrd
export function toGotRewardUI(gotReward: GotReward): GotRewardUIModel {
  return {
    id: gotReward.id,
    title: gotReward.reward,
    star: gotReward.starPieces ?? 0, // ⭐ nullを0に統一
    createdAt: gotReward.createdAt.toISOString(), // DateのままだとJSON化で崩れやすい
  };
}

export function toGotRewardsUI(gotRewards: GotReward[]): GotRewardUIModel[] {
  return gotRewards.map(toGotRewardUI);
}