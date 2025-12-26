import Image from "next/image";
//import ServerLayout from "src/components/templates/Layout/ServerLayout";


export default async function NotFound() {
  return (
        <div className="flex flex-col gap-[24px] mt-12 mb-6">
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
          <div className="mx-auto text-center">
            <h1>Not Found</h1>
            <p className="font-bold text-[20px] sm:text-[24px]">お探しのページは見つかりませんでした</p>
          </div>
        </div>
  );
}