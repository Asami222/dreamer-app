"use client";

import TodoCard from "src/components/organisms/TodoCard"
import type { TodoUIModel } from "src/types/data"
import { useGlobalSpinnerActionsContext } from "src/contexts/GlobalSpinnerContext";
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

  const setGlobalSpinner = useGlobalSpinnerActionsContext()
  const router = useRouter();
  
  const handleCopyTextClick = async(id: string) => {
   
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