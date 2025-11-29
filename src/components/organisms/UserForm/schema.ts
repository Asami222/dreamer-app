import { z } from "zod"

export const userFormSchema = z.object({
  image: z
    .array(
      z.object({
        id: z.string().optional(),
        src: z.string().url("有効なURLを入力してください"),
        file: z.instanceof(File).optional(),
        selected: z.boolean().optional(),
        chosen: z.boolean().optional(),
      })
    )
    .optional(),
  displayName: z.string().optional(),
  dream: z.string().optional(),
  limit: z.string().optional(),
}).refine(
  (data) => {
    const hasAnyValue =
      (data.displayName && data.displayName.trim() !== "") ||
      (data.dream && data.dream.trim() !== "") ||
      (data.limit && data.limit.trim() !== "") ||
      (data.image && data.image.length > 0)
    return hasAnyValue
  },
  {
    message: "すべての項目が未入力の場合は登録できません",
    path: ["_form"], // フォーム全体のエラーとして扱う
  }
)

export type UserFormInput = z.infer<typeof userFormSchema>