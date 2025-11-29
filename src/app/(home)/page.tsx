import Image from "next/image";
import Layout from "src/components/templates/Layout"
import AppLogo from "src/components/atoms/AppLogo"
import ButtonGrad from "src/components/atoms/ButtonGrad"
import Link from "next/link"

export default function Home() {
  return (
    <Layout top>
      <div className="flex flex-col items-center justify-center min-h-dvh overflow-hidden">
        <AppLogo width="184px"/>
        <div className="w-full mx-auto xs:hidden">
          <Image
            width={732}
            height={1012}
            src='/images/homeImg.webp'
            alt="Dreamer Image"
            placeholder="blur"
            blurDataURL={'/images/homeImg.webp'}
            className="w-full h-auto object-contain max-h-[60dvh]"
          />
        </div>
        <div className="p-2">
        <Link href="/login">
        <ButtonGrad
          type="button"
          selectcolor="Pink"
        >
          はじめる
        </ButtonGrad>
        </Link>
        </div>
      </div>
    </Layout>
  )
}
