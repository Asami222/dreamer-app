
import { notFound } from "next/navigation";
import { getServerSession } from "src/libs/auth";
import Image from "next/image";
import NewDreamForm from "src/components/organisms/NewDreamForm";

const Dream = async() => {
  
  const session = await getServerSession();

  if ( !session || !session.user) {
    notFound();
  }

  return (
        <div className="flex flex-col gap-6 mt-3 mb-6">
          <div className="w-[120px] h-[67px] mx-auto mt-[40px]">
            <Image
              src="/images/shootingstar1.webp"
              alt=""
              width={241}
              height={133}
              priority
              className="max-w-[120px] w-full h-auto"
            />
          </div>
          <div className="w-full">
            <NewDreamForm  />
          </div>
        </div>
  )
}

export default Dream