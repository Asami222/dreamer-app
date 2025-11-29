import React, { useReducer, useContext } from "react";
import { pageReducer, ADD_REWARD, REMOVE_REWARD, SET_REWARD } from "./reducers";
import type { GotReward } from "src/types/data";

type GotRewardContextType = {
  gotRewards: GotReward[]
  addgotRewardToPage: (reward: GotReward) => void
  removegotRewardFromPage: (rewardId: number) => void
  setgotRewardToPage: (reward: GotReward[]) => void
}

const GotRewardContext = React.createContext<GotRewardContextType>({
  gotRewards: [],
  addgotRewardToPage: () => {},
  removegotRewardFromPage: () => {},
  setgotRewardToPage: () => {}
})

export const useGotRewardContext = (): GotRewardContextType =>
  useContext<GotRewardContextType>(GotRewardContext)

interface GotRewardContextProviderProps {
  children?: React.ReactNode
}

export const GotRewardContextProvider = ({children}: GotRewardContextProviderProps) => {
  const rewards: GotReward[] = []
  const [ gotState, dispatch] = useReducer(pageReducer, rewards)

  const addgotRewardToPage = (reward: GotReward) => {
    dispatch({ type: ADD_REWARD, payload: reward})
  }

  const removegotRewardFromPage = (rewardId: number) => {
    dispatch({ type: REMOVE_REWARD, payload: rewardId})
  }

  const setgotRewardToPage = (reward: GotReward[] ) => {
      dispatch({ type: SET_REWARD, payload: reward})
    }

  return (
    <GotRewardContext.Provider
      value={{
        gotRewards: gotState,
        addgotRewardToPage,
        removegotRewardFromPage,
        setgotRewardToPage
      }}
    >
      {children}
    </GotRewardContext.Provider>
  )
}
