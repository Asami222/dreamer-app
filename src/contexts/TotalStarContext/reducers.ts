export const ADD_STAR = 'ADD_STAR'
export const DECRE_STAR = 'DECRE_STAR'
export const SET_STAR = 'SET_STAR'

type StarReducerAction = 
| {
    type: 'ADD_STAR'
    payload: number
  }
| {
    type: 'DECRE_STAR'
    payload: number
  }
| {
    type: 'SET_STAR'
    payload: number
  }

const addStar = (num: number, state: number) => {
   return ( state + num )
}

const decreStar = (num: number, state: number) => {
  return ( state - num )
}

const setStar = (num: number): number => {
  return num
}

export const starReducer: React.Reducer<number, StarReducerAction> = (
  state: number,
  action: StarReducerAction,
) => {
  switch (action.type) {
    case ADD_STAR:
      return addStar(action.payload, state)
    case DECRE_STAR:
      return decreStar(action.payload, state)
    case SET_STAR:
      return setStar(action.payload)
    default:
      return state
  }
}