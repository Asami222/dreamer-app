"use client";

import { resizeImage } from "@/libs/image/resizeImage";
import { useActionState, useEffect } from "react";
import { updateUser } from "./action";
import { useForm, Controller } from "react-hook-form";
import type { UserFormInput } from "./schema";
import Input from "src/components/atoms/Input";
import TextArea from "src/components/atoms/TextArea";
import ButtonGrad from "src/components/atoms/ButtonGrad";
import InputImages from "src/components/molecules/InputImages";
import type { FieldErrors, FormState } from "src/utils/state";
import { userFormSchema } from "./schema";
import {
  transformFieldErrors,
  validateFormData,
} from "src/utils/validate";
import { ZodError } from "zod";
import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import clsx from "clsx"

const initialFormState = (
  initial?: Partial<FormState<UserFormInput>>,
): FormState<UserFormInput> => ({
  updatedAt: Date.now().toString(),
  image: {},
  displayName: "",
  dream: "",
  limit: "",
  error: null,
  ...initial,
});

export default function UserForm({ isGuest }: { isGuest?: boolean }) {
  const [state, formAction, isPending] = useActionState(
    updateUser,
    initialFormState()
  );

  const [clientErrors, setClientErrors] = useState<FieldErrors | undefined>(
    state.error?.fieldErrors
  );

  const errors = clientErrors || state.error?.fieldErrors;

  /** ←★★重要★★
   * useActionState の formAction を自分で呼ばない！
   * submit はブラウザが `<form action>` で実行する。
   */
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);

      // クライアント側 Zod バリデーション
      validateFormData(formData, userFormSchema);
      setClientErrors(undefined);

      const file = formData.get("image.file") as File | null;

      if (file && file.size > 0) {
        const resized = await resizeImage(file);
        formData.set("image.file", resized);   // ★ 差し替え
      }
      await formAction(formData);
    } catch (err) {
      if (!(err instanceof ZodError)) throw err;
      setClientErrors(transformFieldErrors(err));
    }
  }

  const { register, control, reset } = useForm<UserFormInput>({
    defaultValues: state,
    mode: "onBlur",
  });

  // 成功したときの toast + reset
  useEffect(() => {
    if (state.status === "success") {
      toast.success("変更しました！", {
        iconTheme: {
          primary: "#e8524a",
          secondary: "#F3E4E3",
        },
      });
      reset(initialFormState());
    }
  }, [state.status, reset]);

  const isDisabled = isPending;

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
      {/* 既存フォーム */}
      <div className="flex flex-col gap-6">
        {/* プロフィール画像 */}
        <div className="text-center flex flex-col gap-2">
          <label className="text-[16px] text-(--text)">プロフィールイメージ画像</label>
          <div className="mx-auto">
            <Controller
              control={control}
              name="image"
              render={({ field }) => (
                <InputImages
                  image={field.value}
                  name="image"
                  register={register}
                  onChange={field.onChange}
                />
              )}
            />
          </div>
        </div>

        {/* 表示名 */}
        <div className="text-center flex flex-col gap-2">
          <label className="text-[16px] text-(--text)">表示名</label>
          <Input
            {...register("displayName")}
            placeholder="表示名"
            height="48px"
            disabled={isGuest} 
            className={clsx(isGuest && "opacity-50 cursor-not-allowed" )}
          />
            {isGuest && (
              <p className="text-(--text-sub) text-[12px]">
                ゲストユーザーの表示名は固定です
              </p>
            )}
          {errors?.displayName?.message && (
            <p className="text-(--danger) text-[13px]">{errors.displayName.message}</p>
          )}
        </div>

        {/* 夢 */}
        <div className="text-center flex flex-col gap-2">
          <label className="text-[16px] text-(--text)">夢または目標</label>
          <Controller
            control={control}
            name="dream"
            render={({ field }) => (
              <TextArea
                name="dream"
                placeholder="夢や目標を記入してください"
                value={field.value ?? ""}
                onChange={(e) => field.onChange(e.target.value)}
              />
            )}
          />
          {errors?.dream && (
            <p className="text-(--danger) text-[13px]">{errors.dream.message}</p>
          )}
        </div>

        {/* 叶える時期 */}
        <div className="text-center flex flex-col gap-2">
          <label className="text-[16px] text-(--text)">叶える時期</label>
          <Input
            {...register("limit")}
            placeholder="いつまでに叶えたいですか"
            height="48px"
          />
          {errors?.limit && (
            <p className="text-(--danger) text-[13px]">{errors.limit.message}</p>
          )}
        </div>

        {errors?._form && (
          <p className="text-(--danger) text-center text-[14px]">{errors._form.message}</p>
        )}

        <div className="mt-10 mb-8 self-center">
          <ButtonGrad
            selectcolor="Red"
            loading={isPending}
            loadingMessage="保存中..."
            disabled={isDisabled}
          >
            変更する
          </ButtonGrad>

          {state.error?.message && (
            <p className="text-(--danger) text-center text-[14px]">
              {state.error.message}
            </p>
          )}
        </div>
      </div>
      </fieldset>
    </form>
  );
}