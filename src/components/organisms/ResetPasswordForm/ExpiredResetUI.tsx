
import Button from "@/components/atoms/Button";
import { useRouter } from "next/navigation";

export default function ExpiredResetUI() {
  const router = useRouter()
  return (
    <div className="flex flex-col items-center gap-2 mt-[120px]">
        <h2 className="text-lg font-semibold">
          再設定リンクの有効期限が切れています
        </h2>
        <p className="text-sm var(--dangerDark)">
          再度メールを送信してください。
        </p>
  
        <Button
          type="button"
          onClick={() => router.push("/auth/forgot-password")}
          selectcolor="Pink"
          className="my-7"
        >
          再設定メールを送信
        </Button>
  
        <Button
          type="button"
          onClick={() => router.push("/auth/login")}
          selectcolor="Orange"
        >
          ログインへ戻る
        </Button>
      </div>
  )
}