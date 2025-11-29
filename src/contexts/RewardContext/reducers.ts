import type { Reward } from "src/types/data";

export const ADD_REWARD = 'ADD_REWARD'
export const REMOVE_REWARD = 'REMOVE_REWARD'
export const SET_REWARD = 'SET_REWARD'

type myRewardReducerAction = 
| {
    type: 'ADD_REWARD'
    list: Reward
  }
| {
    type: 'REMOVE_REWARD'
    list: number
  }
| {
    type: 'SET_REWARD'
    list: Reward[]
  }

const createReward = (reward: Reward, state: Reward[]) => {
  return [...state, reward]
}

const removeReward = (id: number, state: Reward[]) => {
  return state.filter((item) => item.id !== id);
}

const setReward = (rewards: Reward[]) => {
  return rewards
}

export const myRewardReducer: React.Reducer<Reward[], myRewardReducerAction> = (
  state: Reward[],
  action: myRewardReducerAction,
) => {
  switch (action.type) {
    case "ADD_REWARD":
      return createReward(action.list, state)
    case "REMOVE_REWARD":
      return removeReward(action.list, state)
    case "SET_REWARD":
      return setReward(action.list)
    default:
      return state
  }
}
