import { handleFailed, handleSucceed } from "../";

export function deleteTodo(todoId: string, isChecked?: boolean) {
  return fetch(`/api/todo/${todoId}/delete`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ isChecked }),
    next: { revalidate: 0 },
  })
    .then(handleSucceed)
    .catch(handleFailed);
}