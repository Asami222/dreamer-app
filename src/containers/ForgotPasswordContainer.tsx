"use client";

import ForgotPasswordForm from "src/components/organisms/ForgotPasswordForm";
import { requestPasswordReset } from "src/services/auth";
//import { useGlobalSpinnerActionsContext } from "src/contexts/GlobalSpinnerContext";
import { useState } from "react";
import toast from "react-hot-toast";

const SignupFormContainer = () => {

  //const setGlobalSpinner = useGlobalSpinnerActionsContext()
  const [isLoading, setIsLoading] = useState(false)
  const [submitError, setSubmitError] = useState<string | undefined>()
  const [sent, setSent] = useState(false);

  const handleClick = async (email: string) => {
    if (sent) return;
    setSubmitError(undefined)
    try {
      if (email === "guest@example.com") {
        throw new Error("ゲストユーザーはパスワードを再設定できません");
      }  
      setIsLoading(true)
      //setGlobalSpinner(true)
      await requestPasswordReset(email);
      toast.success("再設定用メールを送信しました");
      setSent(true);
    } catch(err: unknown) {
      if(err instanceof Error) {
        setSubmitError(err.message)
        toast.error("メール送信に失敗しました");
      }
    } finally {
      setIsLoading(false)
      //setGlobalSpinner(false)
    }
  }

  return <ForgotPasswordForm onClick={handleClick} isLoading={isLoading} submitError={submitError} sent={sent}/>
  
}

export default SignupFormContainer
