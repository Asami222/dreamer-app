import { unstable_cache } from "next/cache";
import { getUserTodosWithImageUrl } from "@/libs/todo";
import { toTodosUI } from "src/utils/transform";

export const getTodosData = (userId: string) =>
  unstable_cache(
    async () => {
      const todosWithImageUrl = await getUserTodosWithImageUrl(userId)

      const todos = toTodosUI(todosWithImageUrl);

      return {
       todos
      };
    },
    ["todos", userId], // ← ユーザーごとに分離
    {
      tags: ["todos"],
    }
  )();