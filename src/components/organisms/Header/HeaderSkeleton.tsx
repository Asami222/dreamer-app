// Header/HeaderSkeleton.tsx
"use client";

import RectLoader from "@/components/atoms/RectLoader";

const HeaderSkeleton = () => {
  return (
    <header className="w-[92%] mx-auto pt-4 h-12">
      <div className="flex justify-between items-center">
        <RectLoader width={80} height={24} />
        <nav>
          <ul className="flex gap-6 items-center">
            <RectLoader width={6} height={6} />
            <RectLoader width={6} height={6} />
            <RectLoader width={6} height={6} />
            <RectLoader width={6} height={6} />
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default HeaderSkeleton;