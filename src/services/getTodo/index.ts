//import { handleFailed, handleSucceed } from "..";
//import type { Todo } from "src/types/data";
import { redirect } from "next/navigation";
import { createClient } from "@/libs/supabase/server";
import { TodoUIModel } from "src/types/data";
import { getTodosData } from "./core";

export async function getTodo(): Promise<{ todos: TodoUIModel[] }> {

  const isE2E = process.env.NEXT_PUBLIC_E2E_TEST === "true"
    //let todos: TodoUIModel[]
  /*
    if (isE2E) {
        // E2E時：認証・DBを完全スキップ
        todos = E2E_TODOS
        return Response.json(todos);
      } 
*/
      if (isE2E) {
       return {
          todos: [
              {
              id: "todo-1",
              title: "テストTodo",
              description: "詳細テキスト",
              category: "day",
              star: 3,
              image: '',
              limit: [10],
              detail: '',
            }
          ]
        }
      }
  
      const supabase = await createClient();
      const { data: { user } } = await supabase.auth.getUser();
  
      if (!user?.id) {
          redirect("/login");
        }

      return await getTodosData( user.id );
}