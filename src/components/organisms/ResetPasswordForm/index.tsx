import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema, ResetPasswordSchema } from "src/libs/validations/loginSchema";
import  ButtonGrad from "src/components/atoms/ButtonGrad";
import Input from "src/components/atoms/Input";

interface ResetPasswordFormProps {
  onClick?: (password: string, confirmPassword: string) => void
  isLoading?: boolean;
  submitError?: string
}

const ResetPasswordForm = ({ onClick, isLoading, submitError }: ResetPasswordFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<ResetPasswordSchema>({
    mode: "onChange", //入力時にバリデーションを更新
    resolver: zodResolver(resetPasswordSchema),
  })

  const onSubmit = (data: ResetPasswordSchema) => {
    const { password, confirmPassword } = data
 
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    onClick && onClick(password, confirmPassword) //または、onSign?.(username, passward);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <div>
            <h1 className="text-center mb-3"><p className="text-(--text) text-[16px] hover:underline cursor-pointer">パスワード再作成</p></h1>
          <div className="mb-3">
            <Input
            {...register('password', { required: true})}
            name="password"
            type="password"
            height="72px"
            placeholder="新パスワード(8文字以上)"
            hasError={!!errors.password}
            hasBorder
            />
            {errors.password && (
              <p className="text-(--danger) text-[13px] pl-1 text-center">
              {errors.password.message}
              </p>
            )}
          </div>
          <div className="mb-3">
            <Input
            {...register('confirmPassword', { required: true})}
            name="confirmPassword"
            type="password"
            height="72px"
            placeholder="確認用パスワード"
            hasError={!!errors.confirmPassword}
            hasBorder
            />
            {errors.confirmPassword && (
              <p className="text-(--danger) text-[13px] pl-1 text-center">
              {errors.confirmPassword.message}
              </p>
            )}
          </div>
      </div>
      <div className="mx-auto text-center">
        <ButtonGrad 
          hasError={!!errors.password || !!errors.confirmPassword || !!submitError}
          selectcolor='Pink' 
          loading={isLoading}
          loadingMessage="送信中..."
          disabled={!isValid || isLoading || isSubmitting}
        >
          パスワードリセット
        </ButtonGrad>
        {submitError && (
            <div className="mt-4 text-center text-(--danger) text-[13px]">
              {submitError}
            </div>
        )}
      </div>
      </div>
      </div>
    </form>
  )
}

export default ResetPasswordForm