//import { unstable_cache } from "next/cache";
import { getUserTodosWithImageUrl } from "@/libs/todo";
import { toTodosUI } from "src/utils/transform";

export const getTodosData = async (userId: string) =>{
      const todosWithImageUrl = await getUserTodosWithImageUrl(userId)

      const todos = toTodosUI(todosWithImageUrl);

      return {
       todos
      };
    }