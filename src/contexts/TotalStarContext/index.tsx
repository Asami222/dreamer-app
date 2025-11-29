import React, { useContext, useReducer } from "react";
import { starReducer, ADD_STAR, DECRE_STAR, SET_STAR } from "./reducers";
//import React, { useState, useContext, createContext} from "react";

type TotalStarContextType = {
  totalStar: number
  addStar: (star: number) => void
  decreStar: (star: number) => void
  setStar: (star: number) => void
}

const TotalStarContext = React.createContext<TotalStarContextType>({
  totalStar: 0,
  addStar: () => {},
  decreStar: () => {},
  setStar: () => {}
})

export const useTotalStarContext = (): TotalStarContextType =>
  useContext<TotalStarContextType>(TotalStarContext)

interface TotalStarContextProviderProps {
  children?: React.ReactNode
}

const TotalStarContextProvider =({
  children,
}: TotalStarContextProviderProps) => {

const totalNum: number = 0
  const [starState, dispatch] = useReducer(starReducer,totalNum)

  const addStar = (num: number) => {
    dispatch({ type: ADD_STAR, payload: num})
  }

  const decreStar = (num: number) => {
    dispatch({ type: DECRE_STAR, payload: num})
  }

  const setStar = (num: number) => {
    dispatch({ type: SET_STAR, payload: num})
  }

  return (
    <TotalStarContext.Provider
      value={{
        totalStar: starState,
        addStar,
        decreStar,
        setStar,
      }}
    >
      {children}
    </TotalStarContext.Provider>
  )
}

export default TotalStarContextProvider

/*
type TotalStarContextType = {
  totalStar: number
  addStar: (star: number) => void
  decreStar: (star: number) => void
  setStar: (star: number) => void
}

const TotalStarContext = React.createContext<TotalStarContextType>({
  totalStar: 0,
  addStar: () => {},
  decreStar: () => {},
  setStar: () => {}
})

export const useTotalStarContext = (): TotalStarContextType =>
  useContext<TotalStarContextType>(TotalStarContext)

*/

/*
  const totalNum: number = 0
  const [starState, dispatch] = useReducer(starReducer,totalNum)

  const addStar = (num: number) => {
    dispatch({ type: ADD_STAR, payload: num})
  }

  const decreStar = (num: number) => {
    dispatch({ type: DECRE_STAR, payload: num})
  }

  const setStar = (num: number) => {
    dispatch({ type: SET_STAR, payload: num})
  }
*/
/*
const TotalStarContext = createContext<number>(0)
const TotalStarActionsContext = createContext<
React.Dispatch<React.SetStateAction<number>>
>(() => {})

export const useTotalStarContext = (): number =>
  useContext<number>(TotalStarContext)

export const useTotalStarActionsContext =(): React.Dispatch<
React.SetStateAction<number>
> =>
  useContext<React.Dispatch<React.SetStateAction<number>>>(TotalStarActionsContext)

interface TotalStarContextProviderProps {
  children?: React.ReactNode
}

const TotalStarContextProvider =({
  children,
}: TotalStarContextProviderProps) => {

const [isTotalStarNum, setTotalStarNum] = useState(0)

*/