import React, { useContext, useReducer } from "react";
import { myTodoReducer, ADD_TODO, REMOVE_TODO, SET_TODO } from "./reducers";
import type { Todo } from "src/types/data";

type MyTodosContextType = {
  myTodos: Todo[]
  createTodo: (todo: Todo) => void
  removeTodo: (todoId: number) => void
  setTodo: (reward: Todo[]) => void
}

const MyTodosContext = React.createContext<MyTodosContextType>({
  myTodos: [],
  createTodo: () => {},
  removeTodo: () => {},
  setTodo: () => {},
})

export const useMyTodosContext = (): MyTodosContextType =>
  useContext<MyTodosContextType>(MyTodosContext)


interface MyTodosContextProviderProps {
  children?: React.ReactNode
}

export const MyTodosContextProvider =({
  children,
}: MyTodosContextProviderProps) => {
  const todos: Todo[] = []
  const [myTodoState, dispatch] = useReducer(myTodoReducer,todos)

  const createTodo = (todo: Todo) => {
    dispatch({ type: ADD_TODO, list: todo})
  }

  const removeTodo = (todoId: number) => {
    dispatch({ type: REMOVE_TODO, list: todoId})
  }

  const setTodo = (todo: Todo[]) => {
      dispatch({ type: SET_TODO, list: todo})
    }

  return (
    <MyTodosContext.Provider 
    value={{
      myTodos: myTodoState,
      createTodo,
      removeTodo,
      setTodo
    }}>
        {children}
    </MyTodosContext.Provider>
  )
}
