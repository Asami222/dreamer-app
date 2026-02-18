"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGlobalSpinnerActionsContext } from "src/contexts/GlobalSpinnerContext";
import LoginForm from "src/components/organisms/LoginForm";
//import { signIn } from "next-auth/react";
import { login, loginAsGuest, googleLogin } from "src/services/auth";
//import toast from "react-hot-toast";


const LoginFormContainer = () => {
  const router = useRouter()
  const searchParams = useSearchParams();
  const oauthError = searchParams.get("error");
  const setGlobalSpinner = useGlobalSpinnerActionsContext()
  const [isLoading, setIsLoading] = useState(false)
  const [submitError, setSubmitError] = useState<string | undefined>()

  useEffect(() => {
    if (oauthError === "oauth_error") {
      setSubmitError("Googleログインに失敗しました。再度お試しください");
    }
  }, [oauthError]);


  // name と password でログイン
  const handleLogin = async (email: string, password: string) => {
    setSubmitError(undefined)
    try {
      setIsLoading(true)
      //setGlobalSpinner(true)
      await login({email, password})
      //toast.success(result.message);
      router.push('/user')
    } catch(err: unknown) {
      if(err instanceof Error) {
        setSubmitError(err.message)
        //toast.error(err.message);
      }
    } finally {
      setIsLoading(false)
      //setGlobalSpinner(false)
    }
  }

   //googleでログイン
  const handleGoogleLogin = async () => {
    setSubmitError(undefined)
    try {
      setIsLoading(true)
      setGlobalSpinner(true)
      await googleLogin();
      
    } catch (err) {
      if (err instanceof Error) {
        setSubmitError(err.message)
      } 
    } finally {
      setIsLoading(false)
      setGlobalSpinner(false)
    }
  }

  // ゲストでログイン
  const handleGuestLogin = async () => {
    setSubmitError(undefined)
    try {
      setIsLoading(true)
      //setGlobalSpinner(true)
      await loginAsGuest();
      //toast.success(result.message); //成功時は err なし、result あり
      router.push('/user')
    } catch (err: unknown) {
      if(err instanceof Error) {
        setSubmitError(err.message)
        //toast.error(err.message); //失敗時は err のみ渡す
      }
    } finally {
      setIsLoading(false)
      //setGlobalSpinner(false)
    }
  };

  return <LoginForm onLogin={handleLogin} onGuestLogin={handleGuestLogin} isLoading={isLoading} submitError={submitError} onGoogleLogin={handleGoogleLogin}/>
  
}

export default LoginFormContainer
