import type { Todo } from "src/types/data";

export const ADD_TODO = 'ADD_TODO'
export const REMOVE_TODO = 'REMOVE_TODO'
export const SET_TODO = 'SET_TODO'

type myTodoReducerAction = 
| {
  type: 'ADD_TODO'
  list: Todo
  }
| {
  type: 'REMOVE_TODO'
  list: number
  }
| {
    type: 'SET_TODO'
    list: Todo[]
  }

const createTodo = (todo: Todo, state: Todo[]) => {
  return [...state, todo]
}

const removeTodo = (todoID: number, state: Todo[]) => {
  return state.filter((item) => item.id !== todoID);
}

const setTodo = (todos: Todo[]) => {
  return todos
}

export const myTodoReducer: React.Reducer<Todo[], myTodoReducerAction> = (
  state: Todo[],
  action: myTodoReducerAction,
) => {
  switch (action.type) {
    case "ADD_TODO":
      return createTodo(action.list, state)
    case "REMOVE_TODO":
      return removeTodo(action.list, state)
    case "SET_TODO":
      return setTodo(action.list)
    default:
      return state
  }
}
