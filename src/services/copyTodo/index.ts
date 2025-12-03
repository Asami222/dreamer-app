import { handleFailed, handleSucceed,path } from "../";
import { TodoUIModel } from "src/types/data";

export function copyTodo(todoId: string): Promise<{ todo: TodoUIModel }> {
  return fetch(path(`/api/todo/${todoId}/copy`), {
    method: "POST",
    next: { revalidate: 0 },
  })
    .then(handleSucceed)
    .catch(handleFailed);
}