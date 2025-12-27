/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import clsx from "clsx";
import RectLoader from "../RectLoader";

type ImageShape = "circle" | "square";

type ShapeImageProps = {
  src: string;
  shape?: ImageShape;
  width: number;
  height: number;
  header?: boolean;
  aliaLabel?: string;
  alt: string;
};

function ImageWithShape({
  shape,
  width,
  height,
  children,
  aliaLabel,
}: {
  shape?: ImageShape;
  width: number;
  height: number;
  children: React.ReactNode;
  aliaLabel?: string;
}) {
  const radius = shape === "circle" ? "50%" : "5px";

  return (
    <div
      className="relative overflow-hidden"
      style={{ width, height, borderRadius: radius }}
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
  header,
  aliaLabel,
  alt = "image",
}: ShapeImageProps) {
  const [loaded, setLoaded] = useState(false);
  const loader = !loaded && !header;

  return (
    <ImageWithShape shape={shape} width={width} height={height} aliaLabel={aliaLabel}>
      {/* skeleton */}
      {loader && <RectLoader width={width} height={height} />}

      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={clsx(
          "absolute inset-0 w-full h-full object-contain transition-opacity duration-300",
          loaded ? "opacity-100" : "opacity-0"
        )}
      />
    </ImageWithShape>
  );
}