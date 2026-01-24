import Image from "next/image";
import BtnLink from 'src/components/atoms/BtnLink';
import type { ResolvingMetadata } from "next";
import { buildPageMetadata } from "@/libs/metadata";

export async function generateMetadata(
  _: unknown,
  parent: ResolvingMetadata
) {
  return buildPageMetadata("Todoカテゴリー", "Todoを年、月、週、日、時間単位で作成できます。", parent);
}

const NewTodo= () => {
  return (
      <div className='flex flex-col gap-[32px] items-center justify-center mt-6 mb-16'>
          <div className='w-[132px] h-[81px] mt-[40px] mx-auto'>
            <Image
              src="/images/rainbow1.webp"
              alt=""
              width={264}
              height={162}
              priority
              className="max-w-[132px] w-full h-auto"
            />
          </div>
        <div>
          <h2 className='text-(--text) text-[15px] sm:text-[16px] text-justify font-medium sm:text-center tracking-tight sm:tracking-normal'>
          夢や目標を叶えるためには小さな事を継続していくことが大切です。<br/>
          やるべきことを小さな単位にしていきましょう。
          </h2>
        </div>
        <div className='flex flex-col gap-[16px] w-[90%] mx-auto'>
          <BtnLink href="/newTodo/year" className="bg-[linear-gradient(90deg,rgba(246,200,188,100%)_0%,rgba(244,134,175,100%)_44%,rgba(246,200,188,100%)_100%)]">
            年単位
          </BtnLink>
          <BtnLink href="/newTodo/month" className="bg-[linear-gradient(90deg,rgba(246,217,188,100%)_0%,rgba(240,158,107,100%)_44%,rgba(246,220,188,100%)_100%)] text-(--text)">
            月単位
          </BtnLink>
          <BtnLink href="/newTodo/week" className="bg-[linear-gradient(90deg,rgba(246,200,188,100%)_0%,rgba(244,135,174,100%)_44%,rgba(219,102,157,100%)_100%)]">
            週単位
          </BtnLink>
          <BtnLink href="/newTodo/day" className="bg-[linear-gradient(90deg,rgba(246,200,188,50%)_0%,rgba(244,134,175,50%)_44%,rgba(219,102,157,50%)_100%)] text-(--text)">
            日単位
          </BtnLink>
          <BtnLink href="/newTodo/time" className="bg-[linear-gradient(90deg,rgba(246,234,197,100%)_0%,rgba(234,175,116,100%)_44%,rgba(243,226,148,100%)_100%)]">
            時間単位
          </BtnLink>
        </div>
      </div>
  )
}

export default NewTodo