import { z } from "zod"

export const todoSchema = z.object({
  category: z
    .enum(["all", "year", "month", "week", "day", "time"])
    .refine((val) => !!val, { message: "カテゴリーを選択してください" }),

  todo: z.string().min(1, "todoを入力してください"),

  limit1: z
    .array(z.number().int("整数を入力してください").min(1, "1以上の数を入力してください"))
    .optional()
    .or(z.literal(undefined)),

  limit2: z
    .array(z.number().int("整数を入力してください").min(1, "1以上の数を入力してください"))
    .optional()
    .or(z.literal(undefined)),

  detail: z.string().optional().or(z.literal("")),

  description: z.string().optional().or(z.literal("")),

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

  starNum: z
    .number()
    .int("整数を入力してください")
    .min(0, "0以上を入力してください")
    .max(7, "最大7までです")
    .optional(),
})

export type TodoInput = z.infer<typeof todoSchema>