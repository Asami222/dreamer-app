// src/libs/reward.ts
import { prisma } from "@/libs/prisma";
//import { createClient } from "@/libs/supabase/server";
import type { Todo } from "@prisma/client"
import { unstable_cache } from "next/cache";

export async function getUserTodos(userId: string) {
  const todos = await prisma.todo.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  return todos;
}

/**
 * Reward.image (storage path) → 表示用 URL
 */
export function getTodoImageUrl(
  todo: Pick<Todo, "image" | "createdAt">,
) {

  const path = todo.image;
  // image が無い場合（保険）
  if (!path) return "";

  /* todo は外部 URL を持たない前提
  const supabase = await createClient();
  const { data } = supabase
    .storage
    .from("images")
    .getPublicUrl(todo.image);

  let url = data.publicUrl;
  */

  // Supabase Storage public URL（手動生成）
  let url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/${path}`;

  // todo は更新されない想定なので createdAt を使う
  url += `?v=${todo.createdAt.getTime()}`;

  return url;
}

export const getUserTodosWithImageUrl = (userId: string) => 
  unstable_cache( 
  async () => {
    const todos = await prisma.todo.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    return todos.map((todo) => ({
        ...todo,
        imageUrl: getTodoImageUrl(todo),
    }));
  },
  [`todos-${userId}`],
  { 
    tags: [`todos-${userId}`],
    revalidate: 60
  }
)();