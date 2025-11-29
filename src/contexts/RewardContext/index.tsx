import React, { useContext, useReducer } from "react";
import { myRewardReducer,ADD_REWARD, REMOVE_REWARD, SET_REWARD } from "./reducers";
import type { Reward } from "src/types/data";

type MyRewardsContextType = {
  myRewards: Reward[]
  createReward: (reward: Reward) => void
  removeReward: (rewardId: number) => void
  setReward: (reward: Reward[]) => void
}

type RewardContextProviderProps = {
  children?: React.ReactNode
}

const MyRewardsContext = React.createContext<MyRewardsContextType>({
  myRewards: [],
  createReward: () => {},
  removeReward: () => {},
  setReward: () => {},
})

export const useMyRewardsContext = (): MyRewardsContextType =>
  useContext<MyRewardsContextType>(MyRewardsContext)


export const MyRewardsContextProvider =({
  children,
}: React.PropsWithChildren<RewardContextProviderProps>) => {
  const rewards: Reward[] = []
  const [myRewardState, dispatch] = useReducer(myRewardReducer,rewards)

  const createReward = (reward: Reward) => {
    dispatch({ type: ADD_REWARD, list: reward})
  }

  const removeReward = (id: number) => {
   dispatch({ type: REMOVE_REWARD, list: id})
  }
 
  const setReward = (reward: Reward[] ) => {
    dispatch({ type: SET_REWARD, list: reward})
  }

  return (
    <MyRewardsContext.Provider 
    value={{
      myRewards: myRewardState,
      createReward,
      removeReward,
      setReward,
    }}>
        {children}
    </MyRewardsContext.Provider>
  )
}

