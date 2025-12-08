"use server";

import { getServerSession } from "src/libs/auth";
import { prisma } from "src/libs/prisma";
import { ZodError } from "zod";
import { revalidateTag } from "next/cache";
import { validateFormData, transformFieldErrors } from "src/utils/validate";
import { handleError, errors, type FormState, handleSuccess } from "src/utils/state";
import { todoSchema } from "./schema";
import type { TodoInput } from "./schema";
import { uploadTodoImage } from "src/libs/supabase/uploadTodoImage";

export async function createTodo(
  prevState: FormState<TodoInput>,
  formData: FormData,
): Promise<FormState<TodoInput>> {

  const session = await getServerSession();
  if (!session) return handleError(prevState, errors[401]);

  const userId = session.user.id;

  try {
    // Zod バリデーション
    const payload = validateFormData(formData, todoSchema);
    const { title, image, limit1, limit2, detail, description, star, category } = payload;

    // limit をひとつの配列にまとめる
    const limitArr: number[] = [];
    if (limit1) limitArr.push(limit1);
    if (limit2) limitArr.push(limit2);

    // 画像アップロード処理
    let imageUrl: string | null = null;

    // FormData から File を取り出す
    let formFile: File | null = null;
    for (const [key, value] of formData.entries()) {
      if (key.includes("image") && value instanceof File && value.size > 0) {
        formFile = value;
      }
    }

    // File があれば Supabase Storage にアップロード
    if (formFile) {
      imageUrl = await uploadTodoImage(formFile, userId);
    } else if (image?.[0]?.src?.startsWith("http")) {
      // 既存のURL（編集時）
      imageUrl = image[0].src;
    }

    // Prisma で Todo 新規作成
    await prisma.todo.create({
      data: {
        user: { connect: { id: userId } },
        image: imageUrl ?? "", // 画像なしの場合は空文字
        title,
        category,
        limit: limitArr,
        detail,
        description,
        star,
      },
    });

    revalidateTag("todos", "max");
    return handleSuccess(prevState);

  } catch (err) {
    if (err instanceof ZodError) {
      return handleError(prevState, {
        ...errors[400],
        fieldErrors: transformFieldErrors(err),
      });
    }

    console.error(err);
    return handleError(prevState, errors[500]);
  }
}