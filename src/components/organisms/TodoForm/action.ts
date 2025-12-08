"use server";

import { getServerSession } from "src/libs/auth";
import { prisma } from "src/libs/prisma";
import { ZodError } from "zod";
//import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";
import {  transformFieldErrors } from "src/utils/validate";
import { handleError, errors, type FormState, handleSuccess } from "src/utils/state";
import { todoSchema } from "./schema";
import type { TodoInput } from "./schema";
import { uploadTodoImage } from "src/libs/supabase/uploadTodoImage";

export async function createTodo(
  prevState: FormState<TodoInput>,
  formData: FormData,
): Promise<FormState<TodoInput>> {

  console.log("FILES:", formData.getAll("image"));
  
  const session = await getServerSession();
  if (!session) return handleError(prevState, errors[401]);

  const userId = session.user.id;
  
  try {
    //const payload = validateFormData(formData, todoSchema);
    const files = formData.getAll("image") as File[];

    const imagePayload =
      files.length > 0
        ? files.map((file) => ({
            src: "https://placeholder/image-upload", // Zod url() を通すダミー
            file,
          }))
        : undefined;

    const payload = todoSchema.parse({
      image: imagePayload,

      title: formData.get("title")?.toString(),
      detail: formData.get("detail")?.toString(),
      description: formData.get("description")?.toString(),

      category: formData.get("category")?.toString(),

      limit1: formData.get("limit1")?.toString(),
      limit2: formData.get("limit2")?.toString(),

      star: formData.get("star")?.toString(),
    });
    const { title, image, limit1, limit2, detail, description, star, category } = payload;
    
    // limit1 / limit2 → 配列にまとめる
    const limit: number[] = [];
    if (limit1 !== undefined) limit.push(limit1);
    if (limit2 !== undefined) limit.push(limit2);

    // ------------------------------------
    // ⭐ Supabase Storage にアップロード
    // ------------------------------------
    let imageUrl = "";

    if (image && image[0]?.file) {
      imageUrl = await uploadTodoImage(image[0].file, userId);
    } else if (image && image[0]?.src) {
      // 既存画像 URL
      imageUrl = image[0].src;
    }

    // ------------------------------------
    // DB 保存
    // ------------------------------------
    await prisma.todo.create({
      data: {
        user: {
          connect: { id: userId } // ← Userの紐付けが必要！
        },
        image: imageUrl,
        title,
        category,
        limit,
        detail,
        description,
        star,
      }
    });
/*
    await prisma.todo.create({
      data: { 
      user: {
        connect: { id: userId } // ← Userの紐付けが必要！
      },
        todo: "test",
        limit: [1, 2, 3],
        category
      },
    });
*/

    // キャッシュ系
    revalidateTag("todos", "max");
    return handleSuccess(prevState);

    //return handleSuccess(prevState);
  } catch (err) {
    if (err instanceof ZodError) {
      return handleError(prevState, {
        ...errors[400],
        fieldErrors: transformFieldErrors(err),
      });
    }
    return handleError(prevState, errors[500]);
  }
}
