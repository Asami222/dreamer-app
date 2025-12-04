import { handleFailed, handleSucceed } from "../";

export function deleteTodo(todoId: string, check?: boolean) {
  return fetch(`/api/todo/${todoId}/delete`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ check }),
    next: { revalidate: 0 },
  })
    .then(handleSucceed)
    .catch(handleFailed);
}