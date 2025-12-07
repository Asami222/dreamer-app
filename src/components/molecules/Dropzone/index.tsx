import React, { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import { FileUploadIcon } from "src/components/atoms/IconButton";
import type { UseFormRegister, FieldValues, Path } from "react-hook-form";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isDragEvt = (value: any): value is React.DragEvent => {
  return !!value.dataTransfer;
};

const isInput = (value: EventTarget | null): value is HTMLInputElement => {
  return value !== null;
};

const getFilesFromEvent = (e: React.DragEvent | React.ChangeEvent): File[] => {
  if (isDragEvt(e)) {
    return Array.from(e.dataTransfer.files);
  } else if (isInput(e.target) && e.target.files) {
    return Array.from(e.target.files);
  }
  return [];
};

type FileType =
  | "image/png"
  | "image/jpeg"
  | "image/jpg"
  | "image/gif"
  | "video/mp4"
  | "video/quicktime"
  | "application/pdf";

interface DropzoneProps<T extends FieldValues> {
  value?: File[];
  name: Path<T>;                              // ⬅ フォームに依存した安全な name
  acceptedFileTypes?: FileType[];
  width?: number | string;
  height?: number | string;
  hasError?: boolean;
  radius?: boolean;
  onDrop?: (files: File[]) => void;
  onChange?: (files: File[]) => void;
  register: UseFormRegister<T>;               // ⬅ ジェネリック register
  multiple: boolean;
}

export default function Dropzone<T extends FieldValues>({
  value = [],
  name,
  acceptedFileTypes = ["image/png", "image/jpeg", "image/jpg", "image/gif"],
  width = "100px",
  height = "100px",
  hasError,
  radius,
  onDrop,
  onChange,
  register,
  multiple,
}: DropzoneProps<T>) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsFocused(false);
    const dropped = getFilesFromEvent(e).filter((f) =>
      acceptedFileTypes.includes(f.type as FileType)
    );
    if (dropped.length === 0) return;

    const newFiles = multiple
      ? [...value, ...dropped]
      : [dropped[dropped.length - 1]];

    onDrop?.(newFiles);
    onChange?.(newFiles);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFocused(false);

    const dropped = getFilesFromEvent(e).filter((f) =>
      acceptedFileTypes.includes(f.type as FileType)
    );

    if (dropped.length === 0) {
      return window.alert(
        `次のファイルフォーマットは指定できません: ${acceptedFileTypes.join(", ")}`
      );
    }

    const newFiles = multiple
      ? [...value, ...dropped]
      : [dropped[dropped.length - 1]];

    onDrop?.(newFiles);
    onChange?.(newFiles);
  };

  useEffect(() => {
    if (inputRef.current && value.length === 0) {
      inputRef.current.value = "";
    }
  }, [value]);

  const borderColor = hasError
    ? "border-[#ed1c24]"
    : isFocused
    ? "border-[#E18883]"
    : "border-transparent";

  const radiusClass = radius ? "rounded-full" : "rounded-[5px]";

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      onDragLeave={() => setIsFocused(false)}
      onDragEnter={() => setIsFocused(true)}
      onClick={() => inputRef.current?.click()}
      data-testid="dropzone"
      className={clsx(
        "relative cursor-pointer border border-dashed transition-all duration-150",
        borderColor,
        radiusClass,
        "flex items-center justify-center bg-[url('/sample2.png')] bg-[rgba(246,238,237,0.65)] bg-no-repeat bg-center bg-contain bg-blend-lighten"
      )}
      style={{ width, height }}
    >
      <input
        {...register(name)}                   // 🟩 ジェネリック化で安全
        ref={inputRef}
        type="file"
        accept={acceptedFileTypes.join(",")}
        multiple={multiple}
        onChange={handleChange}
        className="hidden"
      />

      <div
        className="flex flex-col items-center justify-center"
        style={{ width, height }}
      >
        <FileUploadIcon
          size={32}
          color="var(--borderDash)"
          ariaLabel="ファイルアップロードボタン"
        />
      </div>
    </div>
  );
}