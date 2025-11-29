import { handleFailed, handleSucceed } from "../";
import type { Todo } from "src/types/data";

export function copyTodo(todoId: string): Promise<{ todo: Todo }> {
  return fetch(`/api/todo/${todoId}/copy`, {
    method: "POST",
    next: { revalidate: 0 },
  })
    .then(handleSucceed)
    .catch(handleFailed);
}