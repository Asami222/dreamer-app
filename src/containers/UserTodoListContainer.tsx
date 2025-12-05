"use client";

import TodoCard from "src/components/organisms/TodoCard"
//import { useTotalStarContext } from "src/contexts/TotalStarContext"
//import useSearch from "services/todos/use-search"
//import useUser from "services/users/use-user"
//import addUser from "services/users/add-user"
//import deleteTodo from "services/todos/deleteTodo"
//import addTodo from "services/todos/add-todo"
import type { TodoUIModel } from "src/types/data"
import { useGlobalSpinnerActionsContext } from "src/contexts/GlobalSpinnerContext";
//import { useMyTodosContext } from "src/contexts/TodoContext"
import { useRouter } from 'next/navigation';
import { copyTodo } from "src/services/copyTodo"
import { deleteTodo } from "src/services/deleteTodo"
import toast from "react-hot-toast";

interface UserTodoListContainerProps {
  todos: TodoUIModel[]
  period?: string
}

const UserTodoListContainer = ({
  period, todos
}: UserTodoListContainerProps) => {
/*
  const { removeTodo } = useMyTodosContext()
 
  const { todos: userTodos } = useSearch(context, {
    category,
    userId,
    initial: todos,
  })
*/
 // const { addStar } = useTotalStarContext()
  //const userHasStar = user.numberOfStars
  const setGlobalSpinner = useGlobalSpinnerActionsContext()
  const router = useRouter();
  const handleCopyTextClick = async(id: string) => {
    //todos.filter((item: { id: number }) => item.id === userid);
    //const newTodo = userTodos[0]
    //const { id, ...todo } = newTodo;
    try {
      setGlobalSpinner(true)
      await copyTodo(id)
    } catch (err: unknown) {
      if(err instanceof Error) {
        toast.error(err.message);
      }
    } finally {
      setGlobalSpinner(false)
      router.refresh();
    }
  }
  const handleRemoveButtonClick = async(id: string, isChecked: boolean | undefined) => {
    
    try {
      setGlobalSpinner(true)
      await deleteTodo(id,isChecked)
    } catch (err: unknown) {
      if(err instanceof Error) {
        toast.error(err.message);
      }
    } finally {
      setGlobalSpinner(false)
      router.refresh();
    }
  }

  return (
    <div className="flex flex-col gap-2">
      { todos.map((t) => (
        <TodoCard
          key={t.id}
          id={t.id}
          title={t.title}
          limit={t.limit}
          limitPeriod={period}
          detail={t.detail}
          image={t.image}
          star={t.star}
          description={t.description}
          onCopyTextClick={handleCopyTextClick}
          onRemoveTextClick={handleRemoveButtonClick}
        />
      ))}
    </div>
  )
}

export default UserTodoListContainer