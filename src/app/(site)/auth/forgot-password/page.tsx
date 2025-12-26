
import ForgotPasswordContainer from "src/containers/ForgotPasswordContainer";
import type { ResolvingMetadata } from "next";
import { buildPageMetadata } from "@/libs/metadata";

export async function generateMetadata(
  _: unknown,
  parent: ResolvingMetadata
) {
  return buildPageMetadata("パスワードリセット", "入力メールアドレスに再設定メールを送信します", parent);
}

const ForgotPassword = () => {

  return (
        <div className="flex flex-col gap-6 mt-[120px]">
          <div className="w-full">
            <ForgotPasswordContainer />
          </div>
        </div>
  )
}

export default ForgotPassword
