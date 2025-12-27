// RewardForm/action.ts
"use server";

import { createClient } from "@/libs/supabase/server";
import { prisma } from "src/libs/prisma";
import { ZodError } from "zod";
import { revalidateTag } from "next/cache";
import {
  validateFormData,
  transformFieldErrors,
} from "src/utils/validate";
import {
  handleError,
  errors,
  type FormState,
  handleSuccess,
} from "src/utils/state";
import { rewardSchema } from "./schema";
import type { RewardInput } from "./schema";
import { resizeImage } from "@/libs/image/resizeImage";
import { uploadImage } from "src/libs/supabase/uploadImage";

export async function createReward(
  prevState: FormState<RewardInput>,
  formData: FormData,
): Promise<FormState<RewardInput>> {

   //e2e playwrightテスト用
   const isE2E = process.env.NEXT_PUBLIC_E2E_TEST === "true";
   const forceError = formData.get("__forceServerError") === "1";

   if (isE2E && forceError) {
     return handleError(prevState, {
       ...errors[500],
       message: "サーバーエラーが発生しました",
     });
   }

   if (isE2E) {
     // フォームの値だけ軽くバリデーションして即成功
     try {
       validateFormData(formData, rewardSchema);
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

  const userId = user.id; // auth.users.id === Profile.userId

  try {
    // -----------------------
    // ① Zod バリデーション
    // -----------------------
    const payload = validateFormData(formData, rewardSchema);
    const { title, star, image } = payload;

    // -----------------------
    // ② FormData から File 抽出
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
    // ③ 画像アップロード / 既存利用
    // -----------------------
    let imagePath: string | null = null;

    if (formFile) {
      const resized = await resizeImage(formFile);
      imagePath = await uploadImage(resized, userId, "reward");
    } else if (image?.src) {
      imagePath = image.src;
    }

    // -----------------------
    // ④ DB 保存（Profile に紐づける）
    // -----------------------
    await prisma.reward.create({
      data: {
        title,
        star,
        image: imagePath,
        userId, // ← 必須
      },
    });

    revalidateTag("rewards","max");
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