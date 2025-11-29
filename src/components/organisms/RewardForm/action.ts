"use server";

import { getServerSession } from "src/libs/auth";
import { prisma } from "src/libs/prisma";
import { ZodError } from "zod";
//import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";
import { validateFormData, transformFieldErrors } from "src/utils/validate";
import { handleError, errors, type FormState, handleSuccess } from "src/utils/state";
import { rewardSchema } from "./schema";
import { RewardInput } from "./schema";

export async function createReward(
  prevState: FormState<RewardInput>,
  formData: FormData,
): Promise<FormState<RewardInput>> {
  const session = await getServerSession();
  if (!session) return handleError(prevState, errors[401]);

  const userId = session.user.id;

  try {
    const payload = validateFormData(formData, rewardSchema);
    const { reward, starPieces, image } = payload;
    const imageUrl = image?.[0]?.src ?? "/images/bear01.webp";

     await prisma.reward.create({
        data: { user: {
          connect: { id: userId } // ← Userの紐付けが必要！
        },
        image: imageUrl, 
        reward, 
        starPieces },
      });

    revalidateTag("rewards", "max");
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