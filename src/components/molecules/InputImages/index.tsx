import Dropzone from "src/components/molecules/Dropzone";
import ImagePreview from "src/components/molecules/ImagePreview";
import type { UseFormRegister } from "react-hook-form";
import type { UserFormInput } from "src/components/organisms/UserForm/schema";

export type FileData = {
  id?: string;
  src: string;
  file?: File;
};

interface InputImagesProps {
  name: keyof UserFormInput; // ★ name をスキーマと揃える
  images: FileData[];
  maximumNumber?: number;
  hasError?: boolean;
  width?: string;
  height?: string;
  radius?: boolean;
  onChange: (images: FileData[]) => void;
  register: UseFormRegister<UserFormInput>;
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
  const files = images.filter((img) => img.file).map((img) => img.file!);

  const handleDrop = (newFiles: File[]) => {
    const newImages = newFiles.map((file) => ({
      file,
      src: URL.createObjectURL(file),
    }));
    onChange([...images, ...newImages]);
  };

  const onRemove = (src: string) => {
    onChange(images.filter((img) => img.src !== src));
  };

  return (
    <div className="flex flex-col [&>*:not(:first-child)]:mt-2">
      {images.map((img) => (
        <ImagePreview key={img.src} alt="イメージ" src={img.src} onRemove={onRemove} />
      ))}

      {(!maximumNumber || images.length < maximumNumber) && (
        <Dropzone
          name={name}
          value={files}
          onDrop={handleDrop}
          hasError={hasError}
          width={width}
          height={height}
          radius={radius}
          register={register}
          multiple={maximumNumber !== 1}
        />
      )}
    </div>
  );
};

export default InputImages;