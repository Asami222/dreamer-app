"use client";

import { useEffect } from "react";
import Button from "src/components/atoms/Button";
import Image from "next/image";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

    return (
          <div className="flex flex-col items-center justify-center min-h-[50vh] px-6 text-center">
            <div className="w-[180px] h-[145px] mx-auto mt-[40px]">
              <Image
                src="/images/dreamer.webp"
                alt=""
                width={412}
                height={331}
                priority
                className="max-w-[180px] w-full h-auto"
              />
            </div>
            <h1 className="font-medium mt-2">エラーが発生しました</h1>
              <p className="text-[24px] sm:text-[28px] my-8">一時的な問題が発生しました。もう一度試しますか？</p>
              <Button
                type="button"
                selectcolor="Pink"
                onClick={() => reset()}
              >
                再読み込み
            </Button>
            <div className="text-center mt-8">
              <Link href={`/`}>
                <p className="hover:underline hover:cursor-pointer text-(--text) text-[16px]">
                  ホームへ戻る
                </p>
              </Link>
            </div>
          </div>
  );
}