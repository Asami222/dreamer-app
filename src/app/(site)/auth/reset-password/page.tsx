"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/libs/supabase/client";
import ResetPasswordContainer from "src/containers/ResetPasswordContainer";
import toast from "react-hot-toast";
import ExpiredResetUI from "@/components/organisms/ResetPasswordForm/ExpiredResetUI";


const ResetPassword = () => {

  const router = useRouter();
  const [checking, setChecking] = useState(true); // 今、Supabaseにセッション確認中か？
  const [expired, setExpired] = useState(false); // リセット用セッションが切れているか？

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();

      if (!data.session) {
        await supabase.auth.signOut();
        setExpired(true);
      }
      setChecking(false);
    };

    checkSession();
  }, []);

  if (checking) {
    return null; // or loading spinner
  }

  if (expired) {
   return <ExpiredResetUI />;
  }

  const handleReset = async (err?: Error) => {
    if (err) {
      return;
    }
      toast.success("パスワードを変更しました。新しいパスワードでログインしてください");
      await supabase.auth.signOut(); // 重要
      router.push('/auth/login')
    }

  return (
        <div className="flex flex-col gap-6 mt-[120px]">
          <div className="w-full">
            <ResetPasswordContainer onReset={handleReset}/>
          </div>
        </div>
  )
}

export default ResetPassword
