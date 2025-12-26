"use client";

import { useForm, Controller } from "react-hook-form";
import Button from "src/components/atoms/Button";
import TextArea from "src/components/atoms/TextArea";
import { useActionState } from 'react';
import { createDream } from "./action";
import { initialFormState } from "./state";

export type NewDreamFormData = {
  dream: string
  limit: string
}

const NewDreamForm = () => {

  const [formState, formDispatch, isPending] = useActionState(createDream, initialFormState);

  const {
    control,
  } = useForm<NewDreamFormData>({
    defaultValues: {
      dream: "",
      limit: "",
    },
  })

  return (
    <form action={formDispatch}>
      <div className="flex flex-col gap-2">
        <div className="mx-auto">
          <label className="text-[16px] text-(--text) font-medium">
            あなたの夢は何ですか
          </label>
        </div>
        <Controller
            control={control}
            name='dream'
            rules={{ required: false }}
            render={({ field }) => (
              <TextArea
              rows={10}
              minRows={10}
              name={field.name}
              value={field.value ?? ""}
              placeholder='夢を記入してください。未記入でも可能です。'
              onChange={field.onChange}
              hasBorder
              >
              </TextArea>
            )}
        />
        <div className="mt-6 mb-0 mx-auto">
          <label className="text-[16px] text-(--text) font-medium">
           それをいつまでに叶えたいですか？
          </label>
        </div>
        <Controller
            control={control}
            name='limit'
            rules={{ required: false }}
            render={({ field }) => (
              <TextArea
              rows={10}
              minRows={10}
              name={field.name}
              value={field.value ?? ""}
              placeholder='期限を記入してください。未記入でも可能です。'
              onChange={field.onChange}
              hasBorder
              >
              </TextArea>
            )}
        />
        <div className="flex flex-col items-center my-6 mx-0 self-center gap-2">
          <Button selectcolor='Pink' className="px-5 py-1" loading={isPending} loadingMessage="送信中..." >登録する</Button>
          {formState?.message && (
            <p className="text-(--danger) text-center text-[14px] font-medium">
              {formState.message}
            </p>
          )}
        </div>
      </div>
    </form>
  )
}

export default NewDreamForm