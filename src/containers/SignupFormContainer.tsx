"use client";

import SignupForm from "src/components/organisms/SignupForm";
import { signupAndLogin, googleLogin } from "src/services/auth";
//import { useGlobalSpinnerActionsContext } from "src/contexts/GlobalSpinnerContext";
import { useState } from "react";
import { useRouter } from "next/navigation";
//import toast from "react-hot-toast";

const SignupFormContainer = () => {

  //const setGlobalSpinner = useGlobalSpinnerActionsContext()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [submitError, setSubmitError] = useState<string | undefined>()

  const handleSignup = async (name: string, password: string, email: string) => {
    setSubmitError(undefined)
    try {
      setIsLoading(true)
      //setGlobalSpinner(true)
      await signupAndLogin({ name, password, email });
      //toast.success(result.message);
      router.push('/dream') //成功時は err なし、result あり
    } catch(err: unknown) {
      if(err instanceof Error) {
          if (err.message.includes("security purposes")) {
            setSubmitError("少し時間をおいてから再度お試しください");
          } else {
            setSubmitError(err.message)
          }
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
      //setGlobalSpinner(true)
      await googleLogin();
      router.push('/dream')
    } catch (err) {
      if (err instanceof Error) {
        setSubmitError(err.message)
      } 
    } finally {
      setIsLoading(false)
      //setGlobalSpinner(false)
    }
  }

  return <SignupForm onSign={handleSignup} isLoading={isLoading} submitError={submitError} onGoogleLogin={handleGoogleLogin}/>
  
}

export default SignupFormContainer
