
import type { Session } from "next-auth";
import { getServerSession } from "src/libs/auth";
//import { getServerSession } from "src/libs/auth";
import Image from "next/image";
import LoginFormContainer from "src/containers/LoginFormContainer";

const LoginPage = async() => {

  const session = await getServerSession();

  return (
    <>
      { session?.user ? (
          <LoggedInView user={session.user} />
        ):(
          <LoggedOutView  />
        )
      }
    </>
  )
}

export default LoginPage

const LoggedInView = ({ user }: { user: Session["user"] }) => (
  <div className="flex gap-2 mt-6 items-center justify-center mx-auto">
        <div className="pt-6 text-center">
          <div>
            <p className="text-(--text) text-[24px]">
              Welcome!<br/>
            {user.profile?.displayName ? user.profile?.displayName : user.name}!
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
)

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



