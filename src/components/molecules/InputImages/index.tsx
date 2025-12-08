// InputImages.tsx
import Dropzone from "src/components/molecules/Dropzone";
import ImagePreview from "src/components/molecules/ImagePreview";
import type { UseFormRegister, FieldValues, Path } from "react-hook-form";
import { useState } from "react";

export type FileData = {
  id?: string;
  src: string;
  file?: File;
};

interface InputImagesProps<T extends FieldValues> {
  name: Path<T>;                        // ← フォームごとの name を安全に扱える
  images: FileData[];
  maximumNumber?: number;
  hasError?: boolean;
  width?: string;
  height?: string;
  radius?: boolean;
  register: UseFormRegister<T>;         // ← フォームごとの register
}

export default function InputImages<T extends FieldValues>({
  name,
  hasError,
  width = "100px",
  height = "100px",
  radius = false,
  register,
}: InputImagesProps<T>) {
  //const files = images.filter((img) => img.file).map((img) => img.file!);

  const [image, setImage] = useState<File | null>(null);

  // Dropzone から受け取る
  const handleDrop = (files: File[]) => {
    if (files.length > 0) {
      // 一枚だけ許可
      setImage(files[0]);
    }
  }

  const handleRemove = () => {
    setImage(null);
  }

  const previewUrl = image ? URL.createObjectURL(image) : null;


  return (
    <div className="relative" style={{ width, height }}>
      {/* Dropzone（背景） */}
        <Dropzone
          name={name}
          value={image ? [image] : []}
          onDrop={handleDrop}
          hasError={hasError}
          width={width}
          height={height}
          radius={radius}
          register={register}
          multiple={false}
        />
        {/* 画像を Dropzone の背景として薄く表示（置き換え UI） */}
        {previewUrl && (
          <div
            className="absolute inset-0 bg-center bg-no-repeat bg-contain opacity-80 pointer-events-none"
            style={{ backgroundImage: `url(${previewUrl})` }}
          />
        )}
        {/* メインの ImagePreview（中央） */}
        {previewUrl && (
          <div className="absolute inset-0 flex items-center justify-center">
            <ImagePreview
              src={previewUrl}
              width={`${width}px`}
              height={`${height}px`}
              onRemove={handleRemove}
            />
        </div>
      )}
    </div>
  );
}