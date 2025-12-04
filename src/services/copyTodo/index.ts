import { handleFailed, handleSucceed } from "../";
import { TodoUIModel } from "src/types/data";

export function copyTodo(todoId: string): Promise<{ todo: TodoUIModel }> {
  return fetch(`/api/todo/${todoId}/copy`, {
    method: "POST",
    next: { revalidate: 0 },
  })
    .then(handleSucceed)
    .catch(handleFailed);
}