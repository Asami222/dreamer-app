import { z } from "zod"

//reward
export const rewardSchema = z.object({
  title: z
    .string()
    .min(1, "ご褒美を入力してください"),
  star: z.preprocess(
      (val) => (val === '' || val === null || val === undefined ? undefined : Number(val)),
      z.number().int("整数を入力してください").min(1, "1以上の数を入力してください")
    ),
    image: z
    .array(
      z.object({
        id: z.string().optional(),
        src: z.string(), // blob: も http も両方OK
        file: z.instanceof(File).optional(),
      })
    )
    .optional(),
})

export type RewardInput = z.infer<typeof rewardSchema>



