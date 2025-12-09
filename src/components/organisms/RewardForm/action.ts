"use server";

import { getServerSession } from "src/libs/auth";
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
import { uploadRewardImage } from "src/libs/supabase/uploadRewardImage";

export async function createReward(
  prevState: FormState<RewardInput>,
  formData: FormData,
): Promise<FormState<RewardInput>> {

  const session = await getServerSession();
  if (!session) return handleError(prevState, errors[401]);

  const userId = session.user.id;

  try {
    // -----------------------
    // ① Zod バリデーション
    // -----------------------
    const payload = validateFormData(formData, rewardSchema);
    const { title, star, image } = payload;
    // image は必ず「object | undefined」

    // -----------------------
    // ② FormData から File を抽出
    // -----------------------
    let formFile: File | null = null;

    for (const [key, value] of formData.entries()) {
      if (key === "image.file" && value instanceof File && value.size > 0) {
        formFile = value;
        break;
      }
    }

    // -----------------------
    // ③ 画像アップロード or 既存URL
    // -----------------------
    let imageUrl = "/images/bear01.webp"; // デフォルト

    if (formFile) {
      // 新しくアップロード
      imageUrl = await uploadRewardImage(formFile, userId);

    } else if (image?.src && image.src.startsWith("http")) {
      // 編集時：既存画像の保持
      imageUrl = image.src;
    }

    // -----------------------
    // ④ DB 保存
    // -----------------------
    await prisma.reward.create({
      data: {
        user: { connect: { id: userId } },
        image: imageUrl,
        title,
        star,
      },
    });

    revalidateTag("rewards", "max");
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