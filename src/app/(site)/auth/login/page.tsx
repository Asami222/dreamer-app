
import { createClient } from "@/libs/supabase/server";
import Image from "next/image";
import LoginFormContainer from "src/containers/LoginFormContainer";
import { redirect } from "next/navigation";
import type { ResolvingMetadata } from "next";
import { buildPageMetadata } from "@/libs/metadata";

export async function generateMetadata(
  _: unknown,
  parent: ResolvingMetadata
) {
  return buildPageMetadata("ログイン", "ログインページです。emailとpassword、google、ゲストから選べます。", parent);
}

const LoginPage = async() => {

  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  
  /*
  const profile = await prisma.profile.findUnique({
    where: { userId }
  });
  */
  return (
    <>
      { user ? (
          redirect("/user")
        ):(
          <LoggedOutView  />
        )
      }
    </>
  )
}

export default LoginPage

// ---------------------------
// ログイン済みの UI
// ---------------------------

const LoggedInView = ({ name }: { name: string }) => (
  
  <div className="flex gap-2 mt-6 items-center justify-center mx-auto">
        <div className="pt-6 text-center">
          <div>
            <p className="text-(--text) text-[24px]">
              Welcome!<br/>
            {name}!
            </p>
          </div>
          <div className="mt-3">
            <p className="text-(--text) text-[20px]">Enjoy Dreamer!</p>
          </div>
        </div>
        <div className="w-[128px] h-[178px]">
          <Image
            src="/images/signinImg.webp"
            alt=""
            width={251}
            height={355}
            priority
            className="max-w-[128px] w-full h-auto"
          />
        </div>
      </div>
);

// ---------------------------
// ログアウト状態の UI
// ---------------------------

const LoggedOutView = () => (
  <div className="flex flex-col gap-6 mt-8 mx-auto">
          <div className="w-[126px] h-[178px] mt-0 mr-[10%] mb-0 ml-auto">
            <Image
              src="/images/signinImg.webp"
              alt=""
              width={251}
              height={355}
              placeholder="blur"
              blurDataURL={'/images/signinImg.webp'}
            />
          </div>
          <div className="w-full">
            <LoginFormContainer />
          </div>
        </div>

)



