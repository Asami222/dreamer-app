import Dropzone from "src/components/molecules/Dropzone";
import ImagePreview from "src/components/molecules/ImagePreview";
import type { UseFormRegister } from "react-hook-form";

export type FileData = {
  id?: string;
  src: string;
  file?: File;
};

interface InputImagesProps {
  name: string;
  images: FileData[];
  maximumNumber?: number;
  hasError?: boolean;
  width?: string;
  height?: string;
  radius?: boolean;
  onChange: (images: FileData[]) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>; // ★追加（RHF register）
}

const InputImages = ({
  name,
  images,
  maximumNumber,
  hasError,
  width = "100px",
  height = "100px",
  radius = false,
  onChange,
  register,
}: InputImagesProps) => {
  const files = images
    .filter((img) => img.file)
    .map((img) => img.file as File);

  const isDropzoneDisplay =
    !maximumNumber || images.length < maximumNumber ? "block" : "none";

  const onRemove = (src: string) => {
    const newImages = images.filter((img) => img.src !== src);
    onChange(newImages);
  };

  const handleDrop = (newFiles: File[]) => {
    const newImages: FileData[] = newFiles.map((file) => ({
      file,
      src: URL.createObjectURL(file),
    }));

    onChange([...images, ...newImages]);
  };

  return (
    <div className="flex flex-col [&>*:not(:first-child)]:mt-2">
      {images.map((img) => (
        <ImagePreview
          key={img.src}
          alt="イメージ"
          src={img.src}
          onRemove={onRemove}
        />
      ))}

      <div style={{ display: isDropzoneDisplay }}>
        <Dropzone
          name={name}
          value={files}
          onDrop={handleDrop}
          hasError={hasError}
          width={width}
          height={height}
          radius={radius}
          acceptedFileTypes={["image/png", "image/jpeg", "image/jpg", "image/gif"]}
          /** ★register をそのまま渡す（Dropzone内部で hidden input に適用） */
          register={register}
          multiple={maximumNumber !== 1}
        />
      </div>
    </div>
  );
};

export default InputImages;