import { z } from "zod"

export const userFormSchema = z.object({
  image: z.object({
    id: z.string().optional(),
    src: z.string().optional(),
    file: z.instanceof(File).optional(),
  }).optional(),
  displayName: z.string().optional(),
  dream: z.string().optional(),
  limit: z.string().optional(),
})
/*
.refine(
  (data) => {
    const hasAnyValue =
      (data.displayName?.trim() !== "") ||
      (data.dream?.trim() !== "") ||
      (data.limit?.trim() !== "") ||
      (data.image && data.image.length > 0); // ← image があればOK に変更

    return hasAnyValue;
  },
  {
    message: "すべての項目が未入力の場合は登録できません",
    path: ["_form"],
  }
);
*/
export type UserFormInput = z.infer<typeof userFormSchema>