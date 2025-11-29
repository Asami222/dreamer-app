import { GotReward } from "src/types/data";

export const ADD_REWARD = 'ADD_REWARD'
export const REMOVE_REWARD = 'REMOVE_REWARD'
export const SET_REWARD = 'SET_REWARD'

type PageReducerAction =
| {
    type: 'ADD_REWARD'
    payload: GotReward
  }
| {
    type: 'REMOVE_REWARD'
    payload: number
  }
| {
    type: 'SET_REWARD'
    payload: GotReward[]
  }

const addgotRewardToPage = (reward: GotReward, state: GotReward[]) => {
  return [ ...state, reward]
}

const removegotRewardFromPage = (rewardId: number, state: GotReward[]) => {
  return state.filter((item) => item.id !== rewardId);
}

const setgotRewardToPage = (rewards: GotReward[]) => {
  return rewards
}

export const pageReducer: React.Reducer<GotReward[], PageReducerAction> = (
  state: GotReward[],
  action: PageReducerAction,
) => {
  switch (action.type) {
    case "ADD_REWARD":
      return addgotRewardToPage(action.payload, state)
    case "REMOVE_REWARD":
      return removegotRewardFromPage(action.payload, state)
    case "SET_REWARD":
      return setgotRewardToPage(action.payload)
    default:
      return state
  }
}