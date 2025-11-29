"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import SignupFormContainer from "src/containers/SignupFormContainer";
//import toast from "react-hot-toast";


const SignupPage = () => {
  const router = useRouter()

  const handleSignup = async (err?: Error, result?: { message: string }) => {

    if (err) {
      return;
    }

    if(result) {
      router.push('/dream')
    }
  }

  return (
        <div className="flex flex-col gap-6 mt-8">
          <div className="w-[123px] h-[175px] mt-0 mr-[10%] mb-0 ml-auto">
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
            <SignupFormContainer onSignup={handleSignup}/>
          </div>
        </div>
  )
}

export default SignupPage
