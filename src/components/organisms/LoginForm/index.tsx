
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginSchema } from "src/libs/validations/loginSchema";
import Link from "next/link";
//import { useEffect } from "react";
import { useForm } from "react-hook-form";
import ButtonGrad from "src/components/atoms/ButtonGrad";
import Input from "src/components/atoms/Input";
import clsx from "clsx"
import Image from "next/image";
import Separator from "src/components/atoms/Separator";

/*zod の loginSchema から型をインポートしているため不要
export type LoginFormData = {
  name: string
  password: string
}
*/

interface LoginFormProps {
  onLogin?: (name: string, password: string) => void
  onGuestLogin?: () => void; // ゲスト用専用ハンドラ
  onGoogleLogin?: () => void
  isLoading?: boolean;
  submitError?: string
}

const LoginForm = ({ onLogin, onGuestLogin, onGoogleLogin, isLoading, submitError }: LoginFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  })

  const handleGoogleLogin = async () => {
    onGoogleLogin?.();
  }

  const handleGuestLogin = () => {
    onGuestLogin?.();
  }
  
  const onSubmit = (data: LoginSchema) => {
    const { name, password } = data
    onLogin?.(name,password);
  }

  const isDisabled = isLoading || isSubmitting;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <div>
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
                <p className="text-[#b00000] text-[13px] pl-1 text-center mt-1">
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
                <p className="text-[#b00000] text-[13px] pl-1 text-center mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>
          {/* --- Error Message --- */}
            {submitError && (
              <p className="text-(--danger) text-center text-[14px] my-4">
                {submitError}
              </p>
            )}

           {/* --- Main Login Button --- */}
            <div className="mx-auto">
              <ButtonGrad 
                selectcolor="Pink"
                hasError={!!errors.name || !!errors.password || !!submitError}
                loading={isLoading}
                loadingMessage="送信中..."
                disabled={!isValid || isDisabled}
              >
                ログイン
              </ButtonGrad>
            </div>
            
          {/* --- Signin Link --- */}
          <div className="text-center">
            <Link href={`/signup`}>
              <p className="hover:underline hover:cursor-pointer text-(--text) text-[16px]">
                新規登録はこちらへ
              </p>
            </Link>
          </div>
          </div>

       {/* 区切り線 */}
      <Separator>or</Separator>
      <div className="flex flex-col gap-4">
      {/* Google ログイン */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          aria-label="グーグルでログイン"
          className="mx-auto flex justify-center items-center w-auto gap-2 px-4 py-2 rounded-full bg-[rgba(255,255,255,0.3)] border border-transparent transition-all duration-200 enabled:hover:border-(--text) enabled:hover:cursor-pointer enabled:hover:transition-all enabled:hover:duration-500"
        >
          <Image
            src="https://www.svgrepo.com/show/355037/google.svg"
            alt="Google"
            width={20}
            height={20}
          />
          <span>Googleでログイン</span>
        </button>

      {/* --- ゲストユーザー　ログイン --- */}
        <button 
          type="button"
          onClick={handleGuestLogin}
          disabled={isDisabled}
          aria-label="ゲストユーザーでログイン"
          className={clsx("mx-auto inline-block bg-[rgba(255,255,255,0.3)] border border-transparent rounded-full px-4 py-2 text-[14px] transition-all duration-200 enabled:hover:border-(--text) enabled:hover:cursor-pointer enabled:hover:transition-all enabled:hover:duration-500",
            !isDisabled &&
              "enabled:hover:border-(--text) enabled:hover:cursor-pointer enabled:hover:transition-all enabled:hover:duration-500",
            isDisabled && "opacity-60 cursor-not-allowed"
          )}
        >
          ゲストユーザーでログイン
        </button>
        </div>
      </div>
    </form>
  )
}

export default LoginForm