import Spinner from "@/components/atoms/Spinner";
import Image from "next/image";


export default function Loading() {
  return (
    <div className="relative flex items-center justify-center min-h-dvh overflow-hidden">
      {/* 背景 */}
      <div className="h-full mx-auto">
        <Image
          width={732}
          height={1012}
          src="/images/homeImg.webp"
          alt=""
          className="w-full h-auto object-contain max-h-[60dvh] opacity-50"
          priority
        />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-(--borderDash) border-t-(--topPrimary) rounded-full animate-spin" />
      </div>
    </div>
    /*
    
    */
  );
}