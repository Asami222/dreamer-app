// InputImage.tsx（1枚専用）
import Dropzone from "src/components/molecules/Dropzone";
import ImagePreview from "src/components/molecules/ImagePreview";
import type { UseFormRegister, FieldValues, Path } from "react-hook-form";
import { useState, useEffect } from "react";

export type FileData = {
  id?: string;
  src?: string;   // 既存画像URL
  file?: File;    // 新規アップロードファイル
};

interface InputImageProps<T extends FieldValues> {
  name: Path<T>;              // 例: "image"
  image?: FileData;           // 1枚専用
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

  const [localImage, setLocalImage] = useState<FileData | undefined>(image);

  // 外から渡される image が更新されたら反映
  useEffect(() => {
    setLocalImage(image);
  }, [image]);

  // Dropzone のファイル受取
  const handleDrop = (files: File[]) => {
    if (files.length === 0) return;

    const file = files[0];

    const img: FileData = {
      file,
      src: URL.createObjectURL(file),
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
      {/* Dropzone（画像がある時はクリック不能にしている仕様） */}
      <Dropzone
        name={`${name}.file`}                    // ← image.file として送られる
        value={localImage?.file ? [localImage.file] : []}
        onDrop={handleDrop}
        hasError={hasError}
        width={width}
        height={height}
        radius={radius}
        register={register}
      />

      {/* プレビュー */}
      {localImage?.src && (
        <div className="absolute inset-0 flex items-center justify-center">
          <ImagePreview
            src={localImage.src}
            width={width}
            height={height}
            onRemove={handleRemove}
          />
        </div>
      )}
    </div>
  );
}