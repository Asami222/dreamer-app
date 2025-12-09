"use server";

import { getServerSession } from "src/libs/auth";
import { prisma } from "src/libs/prisma";
import { ZodError } from "zod";
import { revalidateTag } from "next/cache";
import { validateFormData, transformFieldErrors } from "src/utils/validate";
import {
  handleError,
  errors,
  type FormState,
  handleSuccess,
} from "src/utils/state";
import { todoSchema } from "./schema";
import type { TodoInput } from "./schema";
import { uploadImage } from "src/libs/supabase/uploadImage";

export async function createTodo(
  prevState: FormState<TodoInput>,
  formData: FormData,
): Promise<FormState<TodoInput>> {

  const session = await getServerSession();
  if (!session) return handleError(prevState, errors[401]);

  const userId = session.user.id;

  try {
    // -----------------------
    // ① Zodバリデーション
    // -----------------------
    const payload = validateFormData(formData, todoSchema);
    const {
      title,
      image, // object | undefined
      limit1,
      limit2,
      detail,
      description,
      star,
      category,
    } = payload;

    // -----------------------
    // ② limit を 1つの配列にまとめる
    // -----------------------
    const limitArr: number[] = [];
    if (limit1) limitArr.push(limit1);
    if (limit2) limitArr.push(limit2);

    // -----------------------
    // ③ FormData から File を取得
    // -----------------------
    let formFile: File | null = null;

    for (const [key, value] of formData.entries()) {
      if (key === "image.file" && value instanceof File && value.size > 0) {
        formFile = value;
        break;
      }
    }

    // -----------------------
    // ④ 新規アップロード or 既存URL
    // -----------------------
    let imageUrl: string | null = null;

    if (formFile) {
      // 新しく画像をアップロード
      imageUrl = await uploadImage(formFile, userId, "todo");

    } else if (image?.src && image.src.startsWith("http")) {
      // 編集時：既存画像をそのまま保存
      imageUrl = image.src;
    }

    // -----------------------
    // ⑤ Prisma で Todo 作成
    // -----------------------
    await prisma.todo.create({
      data: {
        user: { connect: { id: userId } },
        image: imageUrl ?? "", // 画像なしは空文字
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