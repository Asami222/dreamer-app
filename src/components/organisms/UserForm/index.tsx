"use client";

//import { useFormState } from "react-dom";
import { useActionState, useEffect } from 'react';
import { updateUser } from "./action";
//import { initialFormState } from "src/utils/state";
import { useForm, Controller} from 'react-hook-form'
//import { zodResolver } from '@hookform/resolvers/zod'
import type { UserFormInput } from './schema'
import Input from 'src/components/atoms/Input'
import TextArea from 'src/components/atoms/TextArea'
import ButtonGrad from 'src/components/atoms/ButtonGrad'
import InputImages from 'src/components/molecules/InputImages'
import type { FieldErrors } from "src/utils/state";
import { userFormSchema } from "./schema";
import { transformFieldErrors, validateFormData } from "src/utils/validate";
import { ZodError } from "zod";
import { useState, type FormEvent } from "react";
import type { FormState } from "src/utils/state";
import toast from 'react-hot-toast';

const initialFormState = (
  initialState?: Partial<FormState<UserFormInput>>,
): FormState<UserFormInput> => ({
  updatedAt: Date.now().toString(),
  image: [],
  displayName: "",
  dream: "",
  limit: "",
  error: null,
  ...initialState,
});

const UserForm = () => {
  const [state, formAction, isPending] = useActionState(updateUser, initialFormState());

  const [clientErrors, setClientErrors] = useState<FieldErrors | undefined>(
    state.error?.fieldErrors
  );

  const errors = clientErrors || state.error?.fieldErrors;

  // 送信前に Client バリデーションを実施
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    try {
      const formData = new FormData(event.currentTarget);

      for (const [key, value] of formData.entries()) {
        console.log("Client FD:", key, value);
      }
    
      // バリデーションエラーが発生した場合 catch 句へ
      validateFormData(formData, userFormSchema);
      // Client バリデーションエラーをクリア
      setClientErrors(undefined);
    } catch (err) {
      // ★: Form のサブミット（action 実行）を中止
      event.preventDefault();
      if (!(err instanceof ZodError)) throw err;
      // Zod のバリデーションエラーをマッピング
      setClientErrors(transformFieldErrors(err));
    }
  }

  const {
    register,
    control,
    reset
  } = useForm<UserFormInput>({
    defaultValues: state,
    mode: 'onBlur',
  })

  useEffect(() => {
    if (state.status === "success") {
      toast.success("変更しました！",{
        iconTheme: {
          primary: '#e8524a',  // アイコン自体の色
          secondary: '#F3E4E3', // アイコンの背景色
        },
      });
      // フォームの値を初期化
    reset(initialFormState());
    }
    
  }, [state.status, reset]);

  // 型拡張
  //const extendedErrors = errors as ExtendedFieldErrors<UserFormInput>
/*
  const onSubmit = (data: UserFormInput) => {
    if (onSave) onSave(data)
  }
*/
  /* 入力監視（全項目の状態）
  // eslint-disable-next-line react-hooks/incompatible-library
  const { image, displayName, dream, limit } = watch()

  // すべて未入力なら true
  const isAllEmpty =
    (!image || image.length === 0) &&
    (!displayName || displayName.trim() === '') &&
    (!dream || dream.trim() === '') &&
    (!limit || limit.trim() === '')
*/
  // ボタンdisabled制御
  const isDisabled = !!state.error || isPending

  return (
    <form onSubmit={handleSubmit} action={formAction}>
      <div className="flex flex-col gap-6">

        {/* プロフィール画像 */}
        <div className="flex flex-col gap-2 text-center">
          <label className="text-[16px] text-(--text) font-normal">プロフィールイメージ画像</label>
          <div className="mx-auto">
            <Controller
              control={control}
              name="image"
              render={({ field: { onChange, value } }) => (
                <InputImages
                  images={value ?? []}
                  onChange={onChange}
                  maximumNumber={1}
                  radius={true}
                  name="image"
                  register={register}
                />
              )}
            />
          </div>
        </div>

        {/* 表示名 */}
        <div className="flex flex-col text-center gap-2">
          <label className="text-[16px] text-(--text) font-normal">表示名</label>
          <Input
            {...register('displayName')}
            name="displayName"
            type="text"
            height="48px"
            placeholder="表示名"
          />
          {errors?.displayName?.message && (
            <p className="text-(--danger) text-[13px]">{errors.displayName.message}</p>
          )}
        </div>

        {/* 夢・目標 */}
        <div className="flex flex-col text-center gap-2">
          <label className="text-[16px] text-(--text) font-normal">夢または目標</label>
          <Controller
            control={control}
            name="dream"
            render={({ field }) => (
              <TextArea
                placeholder="夢や目標を記入してください"
                name={field.name}
                value={field.value ?? ""}
                onChange={(e) => field.onChange(e.target.value)} 
             / >
            )}
          />
          {errors?.dream && (
            <p className="text-(--danger) text-[13px]">{errors.dream.message}</p>
          )}
        </div>

        {/* 叶える時期 */}
        <div className="flex flex-col gap-2 text-center">
          <label className="text-[16px] text-(--text) font-normal">叶える時期</label>
          <Input
            {...register('limit')}
            name="limit"
            type="text"
            height="48px"
            placeholder="いつまでに叶えたいですか"
          />
          {errors?.limit && (
            <p className="text-(--danger) text-[13px]">{errors.limit.message}</p>
          )}
        </div>

        {/* フォーム全体のエラー（refineのmessage） */}
        {errors?._form && (
          <p className="text-(--danger) text-center text-[14px] mt-2">
            {errors._form.message}
          </p>
        )}

        {/* 送信ボタン */}
        <div className="flex flex-col gap-2 self-center" style={{marginTop: "40px", marginBottom: "32px"}}>
          <ButtonGrad
            selectcolor="Red"
            hasError={!!state.error}
            loading={isPending}
            loadingMessage="作成中..."
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
    </form>
  )
}

export default UserForm