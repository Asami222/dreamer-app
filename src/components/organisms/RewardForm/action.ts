"use server";

import { getServerSession } from "src/libs/auth";
import { prisma } from "src/libs/prisma";
import { ZodError } from "zod";
import { revalidateTag } from "next/cache";
import { transformFieldErrors } from "src/utils/validate";
import {
  handleError,
  errors,
  type FormState,
  handleSuccess,
} from "src/utils/state";
import { rewardSchema, type RewardInput } from "./schema";
import { uploadRewardImage } from "@/libs/supabase/uploadRewardImage";

export async function createReward(
  prevState: FormState<RewardInput>,
  formData: FormData,
): Promise<FormState<RewardInput>> {
  const session = await getServerSession();
  if (!session) return handleError(prevState, errors[401]);

  const userId = session.user.id;

  try {
    // -------------------------------------------------
    // STEP 1: FormData → Zod が求める構造に変換
    // -------------------------------------------------
    const files = formData.getAll("image") as File[];

    const imagePayload =
      files.length > 0
        ? files.map((file) => ({
            src: "https://placeholder/image-upload", // Zod の検証通すダミー
            file,
          }))
        : undefined;

    const payload = rewardSchema.parse({
      image: imagePayload,
      title: formData.get("title")?.toString(),
      star: formData.get("star")?.toString(),
    });

    const { title, star, image } = payload;

    // -------------------------------------------------
    // STEP 2: Supabase Storage へアップロード（private）
    // -------------------------------------------------
    let imageUrl = "/images/bear01.webp"; // デフォルト

    if (image && image[0]?.file) {
      imageUrl = await uploadRewardImage(image[0].file, userId);
    } else if (image && image[0]?.src) {
      // 編集フォームで既存画像 URL が来た場合
      imageUrl = image[0].src;
    }

    // -------------------------------------------------
    // STEP 3: DB 保存
    // -------------------------------------------------
    await prisma.reward.create({
      data: {
        user: { connect: { id: userId } },
        image: imageUrl,
        title,
        star,
      },
    });

    // キャッシュ再検証
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