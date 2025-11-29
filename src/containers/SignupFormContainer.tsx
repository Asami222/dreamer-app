"use client";

import SignupForm from "src/components/organisms/SignupForm";
import { signupAndLogin } from "src/services/auth";
//import { useGlobalSpinnerActionsContext } from "src/contexts/GlobalSpinnerContext";
import { useState } from "react";

type SignupResult = { message: string };

interface SignupFormContainerProps {
  onSignup: (err?: Error, result?: SignupResult) => void
}

const SignupFormContainer = ({
  onSignup,
}: SignupFormContainerProps) => {

  //const setGlobalSpinner = useGlobalSpinnerActionsContext()
  const [isLoading, setIsLoading] = useState(false)
  const [submitError, setSubmitError] = useState<string | undefined>()

  const handleSignup = async (name: string, password: string) => {
    setSubmitError(undefined)
    try {
      setIsLoading(true)
      //setGlobalSpinner(true)
      const result = await signupAndLogin({ name, password });
      onSignup?.(undefined, result) //成功時は err なし、result あり
    } catch(err: unknown) {
      if(err instanceof Error) {
        setSubmitError(err.message)
        onSignup?.(err) //失敗時は err のみ渡す
      }
    } finally {
      setIsLoading(false)
      //setGlobalSpinner(false)
    }
  }

  return <SignupForm onSign={handleSignup} isLoading={isLoading} submitError={submitError}/>
  
}

export default SignupFormContainer
