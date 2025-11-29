import { z } from "zod"

//reward
export const rewardSchema = z.object({
  reward: z
    .string()
    .min(1, "ご褒美を入力してください"),
  starNum: z.preprocess(
      (val) => (val === '' || val === null || val === undefined ? undefined : Number(val)),
      z.number().int("整数を入力してください").min(1, "1以上の数を入力してください")
    ),
  image: z
    .array(z.object({
      url: z.string().url().optional(),
      name: z.string().optional(),
    }))
    .optional(),
})

export type RewardInput = z.infer<typeof rewardSchema>



