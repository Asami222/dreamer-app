import { notFound } from "next/navigation";
import { createClient } from "@/libs/supabase/server";
import Image from "next/image";
import NewDreamForm from "src/components/organisms/NewDreamForm";
import type { ResolvingMetadata } from "next";
import { buildPageMetadata } from "@/libs/metadata";

export async function generateMetadata(
  _: unknown,
  parent: ResolvingMetadata
) {
  return buildPageMetadata("Dream登録", "未記入でも構いません。ユーザーページで登録できます。", parent);
}

const Dream = async() => {
  const isE2E = process.env.NEXT_PUBLIC_E2E_TEST === "true";

  if (!isE2E) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) notFound();
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