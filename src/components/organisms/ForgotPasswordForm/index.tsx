import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordRequestSchema, ResetPasswordRequestSchema } from "src/libs/validations/loginSchema";
import  ButtonGrad from "src/components/atoms/ButtonGrad";
import Input from "src/components/atoms/Input";

interface ForgotPasswordFormProps {
  onClick?: (email: string) => void
  sent: boolean
  isLoading?: boolean;
  submitError?: string
}

const ForgotPasswordForm = ({ onClick, isLoading, submitError, sent }: ForgotPasswordFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<ResetPasswordRequestSchema>({
    mode: "onChange", //入力時にバリデーションを更新
    resolver: zodResolver(resetPasswordRequestSchema),
  })

  const onSubmit = (data: ResetPasswordRequestSchema) => {
    const { email } = data
 
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    onClick && onClick(email) //または、onSign?.(username, passward);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <div>
            <h1 className="text-center mb-3"><p className="text-(--text) text-[16px]">パスワードリセット</p></h1>
          <div className="mb-3">
            <Input
            {...register('email', { required: true})}
            name="email"
            type="email"
            height="72px"
            placeholder="ユーザー名"
            hasError={!!errors.email}
            hasBorder
            />
            {errors.email && (
              <p className="text-(--danger) text-[13px] pl-1 text-center">
              {errors.email.message}
              </p>
            )}
          </div>
      </div>
      <div className="mx-auto text-center">
        <ButtonGrad 
          hasError={!!errors.email || !!submitError}
          selectcolor='Pink' 
          loading={isLoading}
          loadingMessage="送信中..."
          disabled={!isValid || isLoading || isSubmitting || sent}
        >
         {sent ? "メール送信済み" : "再設定メールを送信"}
        </ButtonGrad>
        {submitError && (
            <div className="mt-4 text-center text-(--danger) text-[13px]">
              {submitError}
            </div>
        )}
        {sent && 
        <div className="mt-4 text-center text-[13px]">
          <p className="mb-1">パスワード再作成ページは別タブで開きます。</p>
          <p>受信まで多少お時間がかかる場合があります。</p>
        </div>
        }
      </div>
      </div>
      </div>
    </form>
  )
}

export default ForgotPasswordForm