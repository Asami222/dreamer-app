"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
//import { useGlobalSpinnerActionsContext } from "src/contexts/GlobalSpinnerContext";
import LoginForm from "src/components/organisms/LoginForm";
import { login, loginAsGuest } from "src/services/auth";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";


const LoginFormContainer = () => {
  const router = useRouter()
  //const setGlobalSpinner = useGlobalSpinnerActionsContext()
  const [isLoading, setIsLoading] = useState(false)
  const [submitError, setSubmitError] = useState<string | undefined>()

  // name と password でログイン
  const handleLogin = async (name: string, password: string) => {
    setSubmitError(undefined)
    try {
      setIsLoading(true)
      //setGlobalSpinner(true)
      const result = await login({name, password})
      toast.success(result.message);
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

   //　googleでログイン
  const handleGoogleLogin = async () => {
    setSubmitError(undefined)
    try {
      setIsLoading(true)
      //setGlobalSpinner(true)
      await signIn("google")
      router.push('/user')
    } catch (err) {
      if (err instanceof Error) {
        setSubmitError(err.message)
      } 
    } finally {
      setIsLoading(false)
      //setGlobalSpinner(false)
    }
  }

  // ゲストでログイン
  const handleGuestLogin = async () => {
    setSubmitError(undefined)
    try {
      setIsLoading(true)
      //setGlobalSpinner(true)
      const result = await loginAsGuest();
      toast.success(result.message); //成功時は err なし、result あり
      router.push('/user')
    } catch (err: unknown) {
      if(err instanceof Error) {
        setSubmitError(err.message)
        toast.error(err.message); //失敗時は err のみ渡す
      }
    } finally {
      setIsLoading(false)
      //setGlobalSpinner(false)
    }
  };

  return <LoginForm onLogin={handleLogin} onGuestLogin={handleGuestLogin} onGoogleLogin={handleGoogleLogin} isLoading={isLoading} submitError={submitError}/>
  
}

export default LoginFormContainer
