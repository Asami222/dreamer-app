"use client";

import TodoCard from "src/components/organisms/TodoCard"
import type { TodoUIModel } from "src/types/data"
//import { useGlobalSpinnerActionsContext } from "src/contexts/GlobalSpinnerContext";
//import { useRouter } from 'next/navigation';
//import { copyTodo } from "src/services/copyTodo"
//import { deleteTodo } from "src/services/deleteTodo"
import { useCopyTodo } from "@/hooks/useCopyTodo";
import { useDeleteTodo } from "@/hooks/useDeleteTodo";

import toast from "react-hot-toast";

interface UserTodoListContainerProps {
  todos: TodoUIModel[]
  period?: string
}

const UserTodoListContainer = ({
  period, todos
}: UserTodoListContainerProps) => {

  //const setGlobalSpinner = useGlobalSpinnerActionsContext()
  //const router = useRouter();
  
  const copyMutation = useCopyTodo()
  const deleteMutation = useDeleteTodo()
  
  const handleCopyTextClick = async(id: string) => {
   
    copyMutation.mutate(id, {
      onError: (err: unknown) => {
        if (err instanceof Error) {
          toast.error(err.message)
        }
      },
    })
  }
  const handleRemoveButtonClick = async(id: string, isChecked: boolean | undefined) => {
    
   deleteMutation.mutate(
      { id, isChecked },
      {
        onError: (err: unknown) => {
          if (err instanceof Error) {
            toast.error(err.message)
          }
        },
      }
    )
  }

  return (
    <div className="flex flex-col gap-2">
      { todos.map((t) => {

        const isCopying =
          copyMutation.isPending &&
          copyMutation.variables === t.id

        const isDeleting =
          deleteMutation.isPending &&
          deleteMutation.variables?.id === t.id

        return (
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
          isCopying={isCopying}
          isDeleting={isDeleting}
        />
        )
      })}
    </div>
  )
}

export default UserTodoListContainer