import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, SignupSchema } from "src/libs/validations/loginSchema";
import  ButtonGrad from "src/components/atoms/ButtonGrad";
import Input from "src/components/atoms/Input";
import Separator from "src/components/atoms/Separator";
import Link from "next/link";

/*zod の signinSchema から型をインポートしているため不要
export type SigninFormData = {
  name: string
  password: string
}
*/
interface SignupFormProps {
  onSign?: (username: string, password: string) => void
  isLoading?: boolean;
  submitError?: string
}

const SignupForm = ({ onSign, isLoading, submitError }: SignupFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<SignupSchema>({
    mode: "onChange", //入力時にバリデーションを更新
    resolver: zodResolver(signupSchema),
  })

  const onSubmit = (data: SignupSchema) => {
    const { name, password } = data
 
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    onSign && onSign(name,password) //または、onSign?.(username, passward);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <div>
            <h1 className="text-center mb-3"><p className="text-(--text) text-[16px] hover:underline cursor-pointer">ユーザー名・パスワード作成</p></h1>
          <div className="mb-3">
            <Input
            {...register('name', { required: true})}
            name="name"
            type="text"
            height="72px"
            placeholder="ユーザー名"
            hasError={!!errors.name}
            hasBorder
            />
            {errors.name && (
              <p className="text-(--danger) text-[13px] pl-1 text-center">
              {errors.name.message}
              </p>
            )}
          </div>
          <div className="mb-3">
            <Input
            {...register('password', { required: true})}
            name="password"
            type="password"
            height="72px"
            placeholder="パスワード"
            hasError={!!errors.password}
            hasBorder
            />
            {errors.password && (
              <p className="text-(--danger) text-[13px] pl-1 text-center">
              {errors.password.message}
              </p>
            )}
          </div>
      </div>
      <div className="mx-auto text-center">
        <ButtonGrad 
          hasError={!!errors.name || !!errors.password || !!submitError}
          selectcolor='Pink' 
          loading={isLoading}
          loadingMessage="送信中..."
          disabled={!isValid || isLoading || isSubmitting}
        >
          サインアップ
        </ButtonGrad>
        {submitError && (
            <div className="mt-4 text-center text-(--danger) text-[13px]">
              {submitError}
            </div>
        )}
      </div>
      </div>
       {/* 区切り線 */}
       <Separator/>
       {/* --- Signin Link --- */}
       <div className="text-center">
          <Link href={`/login`}>
            <p className="hover:underline hover:cursor-pointer text-(--text) text-[16px]">
              ログインページへ
            </p>
          </Link>
        </div>
        </div>
    </form>
    
  )
}

export default SignupForm