import { z } from "zod";

const normalizeNumber = (v: unknown) => {
  if (v === "" || v === undefined || v === null) return undefined;

  if (typeof v === "string") {
    const normalized = v.replace(/[０-９]/g, (s) =>
      String.fromCharCode(s.charCodeAt(0) - 0xFEE0)
    );
    return normalized;
  }

  return v;
};

const numberField = z.preprocess((v) => {
  const normalized = normalizeNumber(v);

  if (normalized === undefined) return undefined;

  if (!/^\d+$/.test(String(normalized))) {
    return NaN; // number schema にエラーさせる
  }

  return Number(normalized);
},
z.number()
  .int("整数を入力してください")
  .min(1, "1以上の整数を入力してください")
  .optional()
);

export const todoSchema = z.object({
  category: z
    .enum(["year", "month", "week", "day", "time"])
    .refine((val) => !!val, { message: "カテゴリーを選択してください" }),

  title: z.preprocess(
    (v) => (v === undefined || v === null ? "" : v),
    z.string().min(1, "todoを入力してください")
  ),

  limit1: numberField,
  
  limit2: numberField,

  detail: z.string().optional().or(z.literal("")),
  description: z.string().optional().or(z.literal("")),

  image: z
  .object({
    id: z.string().optional(),
    src: z.string().optional(),
    file: z.instanceof(File).optional(),
  })
  .optional(),

  star: z.coerce
    .number()
    .int("整数を入力してください")
    .min(0, "0以上を入力してください")
    .max(7, "最大7までです")
    .optional(),
});

export type TodoInput = z.infer<typeof todoSchema>;