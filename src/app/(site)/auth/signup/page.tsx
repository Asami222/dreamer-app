import Image from "next/image";
import SignupFormContainer from "src/containers/SignupFormContainer";
import type { ResolvingMetadata } from "next";
import { buildPageMetadata } from "@/libs/metadata";

export async function generateMetadata(
  _: unknown,
  parent: ResolvingMetadata
) {
  return buildPageMetadata("ユーザー登録", "新規ユーザー登録ページです。emailとpassword、googleから選べます。ユーザー名は、お好きなお名前で入力してください。", parent);
}

const SignupPage = () => {

  return (
        <div className="flex flex-col gap-6 mt-8 mb-10">
          <div className="w-[112px] sm:w-[123px] h-[159px] sm:h-[175px] mt-0 mr-[10%] mb-0 ml-auto">
            <Image
              src="/images/signinImg2.webp"
              alt=""
              width={247}
              height={351}
              priority
              className="max-w-[128px] w-full h-auto"
            />
          </div>
          <div className="w-full">
            <SignupFormContainer />
          </div>
        </div>
  )
}

export default SignupPage
