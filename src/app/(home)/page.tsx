import Image from "next/image";
import ServerLayout from "src/components/templates/Layout/ServerLayout"
import AppLogo from "src/components/atoms/AppLogo"
import ButtonGrad from "src/components/atoms/ButtonGrad"
import Link from "next/link"
import type { ResolvingMetadata } from "next";
import { buildPageMetadata } from "@/libs/metadata";
import homeImg from 'public/images/homeImg.webp'

export async function generateMetadata(
  _: unknown,
  parent: ResolvingMetadata
) {
  return buildPageMetadata("ホーム", "ホーム画面です", parent);
}

export default async function Home() {

  return (
    <ServerLayout top>
      <div className="flex flex-col items-center justify-center min-h-dvh overflow-hidden">
        <AppLogo width="184px"/>
        <div className="w-full mx-auto">
          <Image
            width={732}
            height={1012}
            src={homeImg}
            alt="Dreamer Image"
            placeholder="blur"
            className="w-full h-auto object-contain max-h-[60dvh]"
          />
        </div>
        <div className="p-2">
        <Link href="/auth/login">
        <ButtonGrad
          type="button"
          selectcolor="Pink"
          dataTestid="start-button"
          ariaLabel="スタートボタン"
        >
          はじめる
        </ButtonGrad>
        </Link>
        </div>
      </div>
    </ServerLayout>
  )
}
