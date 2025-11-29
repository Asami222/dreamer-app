import Image from "next/image";

type ImageShape = 'circle' | 'square'
type ImageProps = { 
  src: string
  shape?: ImageShape
  width: string
  height: string
  children: React.ReactNode
}
type ImageWithShapeProps = Omit<ImageProps, "src">;
type ShapeImageProps = Omit<ImageProps, "children">;


export function ImageWithShape({shape,children,width,height}:ImageWithShapeProps) {
  const shapeimg = shape === 'circle' ? '50%' : '5px'
  return (
    <div
      className="relative"
      style={{
        borderRadius: shapeimg,
        width: width,
        height: height,
        overflow: "hidden",
      }}
    >
      {children}
    </div>
  )
}


export default function ShapeImage({
  src,
  shape,
  width,
  height,
}: ShapeImageProps) {
  return (
    <ImageWithShape shape={shape} width={width} height={height}>
      <Image
        quality="75"
        src={src}
        alt="イメージ"
        sizes="25.6vw"
        fill
        style={{objectFit:"contain", objectPosition:'50% 50%'}}
        priority
      />
    </ImageWithShape>
  )
}