'use client';

//import { zodResolver } from '@hookform/resolvers/zod';
import { rewardSchema, type RewardInput } from './schema'
//import { Transition } from '@headlessui/react'
import { FormEvent, Fragment, useState } from 'react'
//import { useTimeoutFn } from 'react-use'
import { useForm, Controller } from 'react-hook-form'
import Input from 'src/components/atoms/Input'
import InputImages from 'src/components/molecules/InputImages'
import { StarIcon } from 'src/components/atoms/IconButton'
import clsx from "clsx"
import Spinner from 'src/components/atoms/Spinner'
import type { FormState } from "src/utils/state";
import { createReward } from './action';
import { useActionState } from 'react';
import type { FieldErrors } from "src/utils/state";
import { transformFieldErrors, validateFormData } from "src/utils/validate";
import { ZodError } from "zod";
import toast from "react-hot-toast";
import { useEffect } from "react";
/*
export type RewardFormData = {
  image?: FileData[]
  reward: string
  starNum: number
}

interface RewardFormProps {
  onRewardSave?: (data: RewardInput) => void
  isLoading?: boolean;
  submitError?: string
}
*/
const initialFormState = (
  initialState?: Partial<FormState<RewardInput>>,
): FormState<RewardInput> => ({
  updatedAt: Date.now().toString(),
  title: "",
  star: 0,
  image: [],
  error: null,
  status: "idle",
  ...initialState,
});
const RewardForm = () => {

  const [state, formAction, isPending] = useActionState( createReward, initialFormState());

  /* 成功後3秒でメッセージ非表示 
  useEffect(() => {
    if (state.status === "success") {
      setShowSuccess(true);
      document.querySelector("form")?.reset();
  
      const timer = setTimeout(() => {
        setShowSuccess(false); // ← UI 上で非表示に
      }, 3000);
  
      return () => clearTimeout(timer);
    }
  }, [state.status]);
  */
  const [clientErrors, setClientErrors] = useState<FieldErrors | undefined>(
    state.error?.fieldErrors
  );

  const errors = clientErrors || state.error?.fieldErrors;

  // 送信前に Client バリデーションを実施
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    try {
      const formData = new FormData(event.currentTarget);
      // バリデーションエラーが発生した場合 catch 句へ
      validateFormData(formData, rewardSchema);
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
    } = useForm<RewardInput>({
      defaultValues: state,
      mode: 'onChange',
    })

    useEffect(() => {
      if (state.status === "success") {
        toast.success(`追加しました！`,{
          iconTheme: {
            primary: '#e8524a',  // アイコン自体の色
            secondary: '#F3E4E3', // アイコンの背景色
          },
        });
         // フォームの値を初期化
      reset(initialFormState());
      }
    }, [state.status, reset]);
/*
    const [isShowing, setIsShowing] = useState(false)
    const [, , resetIsShowing] = useTimeoutFn(() => setIsShowing(false), 2000)

    const onSubmit = (data: RewardInput) => {
      try {
        onRewardSave?.(data)
        // 成功時のみメッセージを表示
        setIsShowing(true)
        resetIsShowing()
        // フォームリセット
        reset()
      } catch (err) {
        console.error('Reward save failed:', err)
        // エラー時は何も表示しない
      }
    }
*/
    // ボタンdisabled制御
  const isDisabled = isPending;

    return (
      <>
      <form onSubmit={handleSubmit} action={formAction}>
        <div className="flex flex-col items-center gap-2">
          <div className='flex items-center gap-6'>
            <div>
            <Controller
              control={control}
              name='image'
              rules={{ required: false }}
              render={({ field }) => (
              <InputImages<RewardInput>
                images={field.value ?? []}
                maximumNumber={1}
                name="image"
                register={register}
              />
            )}
            />
            </div>
            <div className='flex flex-col gap-2'>
                <Input
                  {...register('title')}
                  name='title'
                  height='28px'
                  type='text'
                  placeholder="テディベア"
                  hasError={!!errors?.reward}
                  className='text-center'
                />
              <div className='flex items-center gap-2'>
                <StarIcon size={32} color="var(--starLight)" ariaLabel='星'/>
                <Input
                  {...register('star', { valueAsNumber: true })}
                  name='star'
                  height='32px'
                  type='number'
                  placeholder='100'
                  small
                  hasError={!!errors?.starPieces}
                />
                <p className='text-[14px] text-(--text)'>個と交換</p>
              </div>
            </div>
          </div>
          {errors?.reward && (
            <p className='text-(--danger) text-[13px]'>{errors.reward.message}</p>
          )}
          {errors?.starPieces && (
            <p className='text-(--danger) text-[13px]'>{errors.starPieces.message}</p>
          )}
          <button 
            type='submit'
            disabled={isDisabled} 
            className={clsx(
              "border-b border-(--text) text-(--text) text-[16px] enabled:cursor-pointer enabled:hover:text-(--placeholder) enabled:hover:border-(--placeholder)",
              !!errors?.reward || !!errors?.starPieces || !!state.error ? "text-[#b00000] border-b-0" : "text-(--border) border-(--border)",
              isDisabled && "opacity-50 cursor-not-allowed",
              isPending && "opacity-100 border-b-0",
            )}
          >
            {isPending ? (
              <div className="flex items-center gap-2">
                <Spinner size={16} strokeWidth={2} />
                <span>作成中...</span>
              </div>
            ) : (
              "追加する"
            )}
          </button>
          {state.error?.message && (
            <div className="mt-1 text-center text-(--danger) text-[13px]">
              {state.error.message}
            </div>
        )}
        </div>
      </form>

      {/* 成功メッセージ 
      <div className='mx-auto mt-8 w-[110px] h-[30px]'>
      <Transition
        as={Fragment}
        show={state.status === "success"}
        enter="transform transition duration-[400ms]"
        enterFrom="opacity-0 rotate-[-120deg] scale-50"
        enterTo="opacity-100 rotate-0 scale-100"
        leave="transform duration-200 transition ease-in-out"
        leaveFrom="opacity-100 rotate-0 scale-100 "
        leaveTo="opacity-0 scale-95 "
      >
        <div className="w-full h-full rounded-[5px] bg-(--checkbox) shadow-[0_2px_4px_0_rgba(177, 88, 82, 0.25)] text-center">
          <p className='text-[13px] font-medium text-(--text2) leading-[30px]'>追加しました！</p>
        </div>
      </Transition>
    </div>
    */}
    </>
  )
}

export default RewardForm