import React, { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import { FileUploadIcon } from "src/components/atoms/IconButton";

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

interface DropzoneProps {
  value?: File[];
  name?: string;
  acceptedFileTypes?: FileType[];
  width?: number | string;
  height?: number | string;
  hasError?: boolean;
  radius?: boolean;
  onDrop?: (files: File[]) => void;
  onChange?: (files: File[]) => void;
}

const Dropzone = ({
  onDrop,
  onChange,
  value = [],
  name,
  acceptedFileTypes = ["image/png", "image/jpeg", "image/jpg", "image/gif"],
  hasError,
  width = "100px",
  height = "100px",
  radius,
}: DropzoneProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsFocused(false);
    const files = value.concat(
      getFilesFromEvent(e).filter((f) =>
        acceptedFileTypes.includes(f.type as FileType)
      )
    );
    onDrop?.(files);
    onChange?.(files);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFocused(false);

    const files = value.concat(
      getFilesFromEvent(e).filter((f) =>
        acceptedFileTypes.includes(f.type as FileType)
      )
    );

    if (files.length === 0) {
      return window.alert(
        `次のファイルフォーマットは指定できません: ${acceptedFileTypes.join(
          ", "
        )}`
      );
    }

    onDrop?.(files);
    onChange?.(files);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFocused(false);
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFocused(true);
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  useEffect(() => {
    if (inputRef.current && value && value.length === 0) {
      inputRef.current.value = "";
    }
  }, [value]);

  // 動的なクラス生成
  const borderColor = hasError
    ? "border-[#ed1c24]"
    : isFocused
    ? "border-[#E18883]"
    : "border-transparent";

  const radiusClass = radius ? "rounded-full" : "rounded-[5px]";

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDragEnter={handleDragEnter}
      onClick={handleClick}
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
        ref={inputRef}
        type="file"
        name={name}
        accept={acceptedFileTypes.join(",")}
        onChange={handleChange}
        multiple
        className="hidden"
      />
      <div
        className="flex flex-col items-center justify-center"
        style={{ width, height }}
      >
        <FileUploadIcon size={32} color="var(--borderDash)" ariaLabel="ファイルアップロードボタン"/>
      </div>
    </div>
  );
};

Dropzone.defaultProps = {
  acceptedFileTypes: ["image/png", "image/jpeg", "image/jpg", "image/gif"],
  hasError: false,
};

export default Dropzone;