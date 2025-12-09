// InputImage.tsx（1枚専用）
import Dropzone from "src/components/molecules/Dropzone";
import ImagePreview from "src/components/molecules/ImagePreview";
import type { UseFormRegister, FieldValues, Path } from "react-hook-form";
import { useState, useEffect } from "react";

export type FileData = {
  id?: string;
  src?: string;   // 既存画像のURLもOK
  file?: File;    // 新規アップロード
};

interface InputImageProps<T extends FieldValues> {
  name: Path<T>;              // "image"
  image?: FileData;           // ← 1枚専用
  hasError?: boolean;
  width?: string;
  height?: string;
  radius?: boolean;
  register: UseFormRegister<T>;
  onChange?: (img?: FileData) => void;
}

export default function InputImage<T extends FieldValues>({
  name,
  image,
  hasError,
  width = "100px",
  height = "100px",
  radius = false,
  register,
  onChange,
}: InputImageProps<T>) {

  // 内部状態（File または URL）
  const [localImage, setLocalImage] = useState<FileData | undefined>(image);

  // 外部 image が変更された時の同期
  useEffect(() => {
    setLocalImage(image);
  }, [image]);

  // Dropzone から受け取る
  const handleDrop = (files: File[]) => {
    if (files.length === 0) return;

    const file = files[0];

    const img: FileData = {
      file,
      src: URL.createObjectURL(file)
    };

    setLocalImage(img);
    onChange?.(img);
  };

  const handleRemove = () => {
    setLocalImage(undefined);
    onChange?.(undefined);
  };

  return (
    <div className="relative" style={{ width, height }}>
      {/* Dropzone */}
      <Dropzone
        name={`${name}.file`}
        value={localImage?.file ? [localImage.file] : []}
        onDrop={handleDrop}
        hasError={hasError}
        width={width}
        height={height}
        radius={radius}
        register={register}
        multiple={false}
      />

      {/* プレビュー */}
      {localImage?.src && (
        <div className="absolute inset-0 flex items-center justify-center">
          <ImagePreview
            src={localImage.src}
            width={`${width}px`}
            height={`${height}px`}
            onRemove={handleRemove}
          />
        </div>
      )}
    </div>
  );
}