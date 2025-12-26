import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, SignupSchema } from "src/libs/validations/loginSchema";
import  ButtonGrad from "src/components/atoms/ButtonGrad";
import Input from "src/components/atoms/Input";
import Separator from "src/components/atoms/Separator";
import Link from "next/link";
import Image from "next/image";

/*zod の signinSchema から型をインポートしているため不要
export type SigninFormData = {
  name: string
  password: string
}
*/
interface SignupFormProps {
  onSign?: (username: string, password: string, email: string) => void
  onGoogleLogin?: () => void
  isLoading?: boolean;
  submitError?: string
}

const SignupForm = ({ onSign, onGoogleLogin, isLoading, submitError }: SignupFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<SignupSchema>({
    mode: "onChange", //入力時にバリデーションを更新
    resolver: zodResolver(signupSchema),
  })

  const handleGoogleLogin = async () => {
    onGoogleLogin?.();
  }

  const onSubmit = (data: SignupSchema) => {
    const { name, password, email } = data
 
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    onSign && onSign(name,password,email) //または、onSign?.(username, passward);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <div>
            <h1 className="text-center mb-3"><p className="text-(--text) text-[16px] hover:underline cursor-pointer">ユーザー名・パスワード・メールアドレス作成</p></h1>
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
          <div className="mb-3">
            <Input
            {...register('email', { required: true})}
            name="email"
            type="email"
            height="72px"
            placeholder="メールアドレス"
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
          hasError={!!errors.name || !!errors.password || !!errors.email || !!submitError}
          selectcolor='Pink' 
          loading={isLoading}
          loadingMessage="送信中..."
          disabled={!isValid || isLoading || isSubmitting}
          dataTestid="signup"
          ariaLabel="サインアップ"
        >
          サインアップ
        </ButtonGrad>
        {submitError && (
            <div role="alert" data-testid="signup-error" className="mt-4 text-center text-(--danger) text-[13px]">
              {submitError}
            </div>
        )}
      </div>
      {/* Googleで新規ログイン */}
      <p className="text-[15px] text-center">または</p>
      <div>
        {/* Google ログイン */}
        <button
        type="button"
        onClick={handleGoogleLogin}
        aria-label="グーグルで新規ログイン"
        className="mx-auto flex justify-center items-center w-auto gap-2 px-4 py-2 rounded-full bg-[rgba(255,255,255,0.3)] border border-transparent transition-all duration-200 enabled:hover:border-(--text) enabled:hover:cursor-pointer enabled:hover:transition-all enabled:hover:duration-500"
        >
        <Image
          src="https://www.svgrepo.com/show/355037/google.svg"
          alt="Google"
          width={20}
          height={20}
        />
        <span>Googleで新規ログイン</span>
      </button>
      </div>
      </div>
       {/* 区切り線 */}
       <Separator/>
       {/* --- Signin Link --- */}
        <div className="text-center">
          <Link href={`/auth/login`}>
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