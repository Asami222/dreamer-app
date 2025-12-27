"use server";

import { createClient } from "@/libs/supabase/server";
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
import { resizeImage } from "@/libs/image/resizeImage";
import { uploadImage } from "src/libs/supabase/uploadImage";

export async function createTodo(
  prevState: FormState<TodoInput>,
  formData: FormData,
): Promise<FormState<TodoInput>> {

   //e2e playwrightテスト用
   const isE2E = process.env.NEXT_PUBLIC_E2E_TEST === "true";

   if (isE2E) {
     // フォームの値だけ軽くバリデーションして即成功
     try {
       validateFormData(formData, todoSchema);
       return handleSuccess(prevState);
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

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return handleError(prevState, errors[401]);

  const userId = user.id;

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
    if (limit1 !== undefined) limitArr.push(limit1);
    if (limit2 !== undefined) limitArr.push(limit2);

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

    const MAX_SIZE = 5 * 1024 * 1024;
    const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

    if (formFile && formFile.size > 0) {
      if (formFile.size > MAX_SIZE) {
        return handleError(prevState, {
          ...errors[400],
          message: "画像サイズは5MB以内にしてください",
        });
      }

      if (!ALLOWED_TYPES.includes(formFile.type)) {
        return handleError(prevState, {
          ...errors[400],
          message: "jpg / png / webp のみアップロードできます",
        });
      }
    }

    // -----------------------
    // ④ 新規アップロード or 既存URL
    // -----------------------
    let imagePath: string | null = null;

    if (formFile) {
      //リサイズ
      const resized = await resizeImage(formFile);
      // 新しく画像をアップロード
      imagePath = await uploadImage(resized, userId, "todo");

    } else if (image?.src && image.src.startsWith("http")) {
      // 編集時：既存画像をそのまま保存
      imagePath = image.src;
    }

    // -----------------------
    // ⑤ Prisma で Todo 作成
    // -----------------------
    await prisma.todo.create({
      data: {
        userId,
        image: imagePath, // 画像なしは空文字
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