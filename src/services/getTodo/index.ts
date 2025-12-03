import { handleFailed, handleSucceed,path } from "..";
//import type { Todo } from "src/types/data";
import { TodoUIModel } from "src/types/data";

type Props = {
  revalidate?: number;
};

export async function getTodo({
  revalidate,
}: Props): Promise<{ todos: TodoUIModel[] }> {
  return fetch(path(`/api/todo`), {
    next: {
      tags: [`todos`],
      ...(revalidate !== undefined && { revalidate }),
    },
  })
    .then(handleSucceed)
    .catch(handleFailed);
}