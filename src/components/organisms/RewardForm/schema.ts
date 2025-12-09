import { z } from "zod";

export const rewardSchema = z.object({
  title: z.string().min(1, "ご褒美を入力してください"),

  // ★ TodoForm と同じ書き方に統一（required_error を使わない）
  star: z.coerce
    .number()
    .int("整数を入力してください")
    .min(1, "1以上の数を入力してください"),

    image: z
    .object({
      id: z.string().optional(),
      src: z.string().optional(),
      file: z.instanceof(File).optional(),
    })
    .optional(),
});

export type RewardInput = z.infer<typeof rewardSchema>;