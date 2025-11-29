import { handleFailed, handleSucceed } from "..";
import type { Todo } from "src/types/data";

type Props = {
  revalidate?: number;
};

export async function getTodo({
  revalidate,
}: Props): Promise<{ todos: Todo[] }> {
  return fetch(`/api/todo`, {
    next: {
      tags: [`todos`],
      ...(revalidate !== undefined && { revalidate }),
    },
  })
    .then(handleSucceed)
    .catch(handleFailed);
}