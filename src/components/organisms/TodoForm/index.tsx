"use client"

//import { useFormState } from "react-dom";
import { useActionState, useEffect } from 'react';
import { useState, type FormEvent } from "react"
import { useForm, Controller } from "react-hook-form"
import ButtonGrad from "src/components/atoms/ButtonGrad"
import Input from "src/components/atoms/Input"
import TextArea from "src/components/atoms/TextArea"
import InputImages from "src/components/molecules/InputImages"
import { StarRating1 } from "src/components/molecules/StarRating"
import { todoSchema, type TodoInput } from "./schema"
import type { FormState } from "src/utils/state";
import { createTodo } from "./action"
import type { FieldErrors } from "src/utils/state";
import { ZodError } from "zod";
import { transformFieldErrors, validateFormData } from "src/utils/validate";
import { Category2 } from "src/types/data";
import toast from 'react-hot-toast';

const initialFormState = (
  initialState?: Partial<FormState<TodoInput>>,
): FormState<TodoInput> => ({
  updatedAt: Date.now().toString(),
  image: {},
  title: "",
  limit1: 0,
  limit2: 0,
  category: "day",
  detail: "",
  description: "",
  star: 0,
  error: null,
  ...initialState,
});

const categoryNameDict: Record<Category2, string> = {
  year: '年',
  month: '月',
  week: '週',
  day: '日',
  time: '時間',
}

const placeholderNameDict: Record<string, string> = {
  年: "例）20XX年までに",
  月: "例）3月までに",
  週: "例）3月XX日までに",
  日: "例）３日に１回",
  時間: "例）毎日",
}

const periodNameDict: Record<string, string> = {
  年: "年",
  月: "ヶ月",
  週: "週間",
  日: "日",
}

const TodoForm = ({ category }: { category: Category2 }) => {
  const [state, formAction, isPending] = useActionState(createTodo, initialFormState());

  const [clientErrors, setClientErrors] = useState<FieldErrors | undefined>(
    state.error?.fieldErrors
  );

  const errors = clientErrors || state.error?.fieldErrors;

  // 送信前に Client バリデーションを実施
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    try {
      const formData = new FormData(event.currentTarget);

      console.log("DEBUG_Client image:", formData.get("image"));
      console.log("DEBUG_Client all:", formData.getAll("image"));
      console.log("DEBUG_Client title:", formData.get("title"));
      console.log("DEBUG_Client all:", formData.getAll("title"));
      // バリデーションエラーが発生した場合 catch 句へ
      validateFormData(formData, todoSchema);
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
  } = useForm<TodoInput>({
    mode: "onChange",
    defaultValues: state,
  })

  useEffect(() => {
    if (state.status === "success") {
      toast.success(`追加しました！`,{
        iconTheme: {
          primary: '#e8524a',  // アイコン自体の色
          secondary: '#F3E4E3', // アイコンの背景色
        },
      });
      reset(initialFormState());
    }
  }, [state.status, reset]);

  const [selectedStars, setSelectedStars] = useState(0)

  const title = categoryNameDict[category as Category2]

  const isDisabled = isPending;

  return (
    <form onSubmit={handleSubmit} action={formAction}>
      <input type="hidden" name="category" value={category} />
      <input type="hidden" name="star" value={selectedStars} />
      <div className="flex flex-col items-center gap-8">
        <p className="text-[16px] text-(--text) font-medium">{title}単位</p>
        <div className="flex flex-col gap-6 w-full">
          {/* --- todo入力 --- */}
          <div className="flex flex-col gap-2">
            <label className="text-[16px] text-(--text) font-normal tracking-wider">todo</label>
            <Input
              {...register("title")}
              type="text"
              height="48px"
              placeholder="todoを入力してください"
              hasError={!!errors?.todo}
            />
            {errors?.todo && (
              <p className="text-[#b00000] text-[13px] pl-1">
                {errors.todo.message}
              </p>
            )}
          </div>

          {/* --- 期限 --- */}
          <div className="flex flex-col gap-2">
            <label className="text-[16px] text-(--text) font-normal">期限</label>
            <div className="flex flex-col gap-1">
            {title !== "時間" ? (
              <div className="flex items-center gap-2">
                <Input
                  {...register("limit1", { required: false })}
                  type="number"
                  height="32px"
                  placeholder="1"
                  small
                />
                <p className="text-[16px] text-(--text) font-normal">
                  {periodNameDict[title as string]}
                </p>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Input
                  {...register("limit1", { required: false })}
                  type="number"
                  height="32px"
                  placeholder="1"
                  small
                />
                <p className="text-[16px] text-(--text) font-normal">時から</p>
                <Input
                  {...register("limit2", { required: false })}
                  type="number"
                  height="32px"
                  placeholder="12"
                  small
                />
                <p className="text-[16px] text-(--text) font-normal">時まで</p>
              </div>
            )}

              <Input
                {...register("detail")}
                type="text"
                height="48px"
                placeholder={placeholderNameDict[title as string]}
              />
            </div>
          </div>

          {/* --- 詳細 --- */}
          <div className="flex flex-col gap-2">
            <label className="text-[16px] text-(--text) font-normal">詳細</label>
            <Controller
              control={control}
              name="description"
              render={({ field }) => (
                <TextArea 
                  placeholder="詳細"
                  name={field.name}
                  value={field.value ?? ""}
                  onChange={(e) => field.onChange(e.target.value)} 
                />
              )}
            />
          </div>

          {/* --- 画像 --- */}
          <div className="flex flex-col gap-2 text-left sm:text-center mx-0 sm:mx-auto">
            <label className="text-[16px] text-(--text) font-normal">イメージ画像</label>
            <Controller
              control={control}
              name="image"
              render={({ field }) => (
                <InputImages<TodoInput>
                  image={field.value}
                  name="image"
                  register={register}
                  onChange={field.onChange}
                />
              )}
            />
          </div>

          {/* --- 星の数 --- */}
          <div className="flex flex-col gap-2 text-left sm:text-center">
            <label className="text-[16px] text-(--text) font-normal">星の数</label>
            <div className="mx-auto">
              <StarRating1 value={selectedStars} setValue={setSelectedStars} />
              <input type="hidden" name="star" value={selectedStars} />
              <p className="text-[13px] text-center font-normal text-(--text)">
                *項目ごとに星マークをつけることができます。<br />
                todoを完了すると貰えます。<br />
                星を集めて頑張った自分にご褒美を上げましょう。<br />
                星をクリックして好きな数を設定できます。<br />
                最大７つまでです。
              </p>
            </div>
          </div>
        </div>

        {/* --- 送信ボタン --- */}
        <div className="flex flex-col gap-2">
          <ButtonGrad
            selectcolor="Red"
            hasError={!!errors?.todo || !!state.error}
            loading={isPending}
            loadingMessage="作成中..."
            disabled={isDisabled}
          >
            追加する
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

export default TodoForm