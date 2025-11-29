"use client";

import { useEffect } from "react";
import { toast } from "react-hot-toast";
import Layout from "src/components/templates/Layout";
import Button from "src/components/atoms/Button";
import Image from "next/image";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
    toast.error("予期しないエラーが発生しました");
  }, [error]);

    return (
      <Layout>
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
          </div>
      </Layout>
  );
}