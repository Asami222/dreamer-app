"use client";

import { useState } from "react";
import clsx from "clsx";
import Image from "next/image";
import RectLoader from "../RectLoader";

type ImageShape = "circle" | "square";

type ShapeImageProps = {
  src: string;
  shape?: ImageShape;
  width: number;
  height: number;
  unoptimized?: boolean;
  header?: boolean
  aliaLabel?: string
  alt: string
};

function ImageWithShape({
  shape,
  width,
  height,
  children,
  aliaLabel
}: {
  shape?: ImageShape;
  width: number;
  height: number;
  children: React.ReactNode;
  aliaLabel?: string
}) {
  const radius = shape === "circle" ? "50%" : "5px";

  return (
    <div
      className="relative overflow-hidden"
      style={{
        width,
        height,
        borderRadius: radius,
      }}
      aria-label={aliaLabel}
    >
      {children}
    </div>
  );
}

export default function ShapeImage({
  src,
  shape,
  width,
  height,
  unoptimized,
  header,
  aliaLabel,
  alt = 'image'
}: ShapeImageProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const loader = !imageLoaded && !header

  return (
    <ImageWithShape shape={shape} width={width} height={height} aliaLabel={aliaLabel}>
      {/* スケルトン */}
      {loader && <RectLoader width={width} height={height} />}

      <Image
        src={src}
        alt={alt}
        fill
        sizes="25.6vw"
        quality={75}
        unoptimized={unoptimized}
        style={{ objectFit: "contain", objectPosition: "50% 50%" }}
        onLoadingComplete={() => setImageLoaded(true)}
        className={clsx(
          "transition-opacity duration-300",
          !loader ? "opacity-100" : "opacity-0"
        )}
      />
    </ImageWithShape>
  );
}