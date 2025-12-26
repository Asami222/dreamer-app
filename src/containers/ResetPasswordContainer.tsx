"use client";

import ResetPasswordForm from "src/components/organisms/ResetPasswordForm";
import { updatePassword } from "src/services/auth";
//import { useGlobalSpinnerActionsContext } from "src/contexts/GlobalSpinnerContext";
import { useState } from "react";

type ResetResult = { message: string };

interface ResetPasswordContainerProps {
  onReset: (err?: Error, result?: ResetResult) => void
}

const ResetPasswordContainer = ({
  onReset,
}: ResetPasswordContainerProps) => {

  //const setGlobalSpinner = useGlobalSpinnerActionsContext()
  const [isLoading, setIsLoading] = useState(false)
  const [submitError, setSubmitError] = useState<string | undefined>()

  const handleClick = async (password: string) => {
    setSubmitError(undefined)
    try {
      setIsLoading(true)
      //setGlobalSpinner(true)
      const result = await updatePassword(password);
      onReset?.(undefined, result) //成功時は err なし、result あり
    } catch(err: unknown) {
      if(err instanceof Error) {
        setSubmitError(err.message)
        onReset?.(err) //失敗時は err のみ渡す
      }
    } finally {
      setIsLoading(false)
      //setGlobalSpinner(false)
    }
  }

  return <ResetPasswordForm onClick={handleClick} isLoading={isLoading} submitError={submitError}/>
  
}

export default ResetPasswordContainer
