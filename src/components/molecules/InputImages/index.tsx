import Dropzone from 'src/components/molecules/Dropzone'
import ImagePreview from 'src/components/molecules/ImagePreview'


export type FileData = {
  id?: string
  src: string
  file?: File
  selected?: boolean
  chosen?: boolean
}

interface InputImagesProps {
  name?: string
  images: FileData[]
  maximumNumber?: number
  hasError?: boolean
  width?: string
  height?: string
  radius?: boolean
  onChange: (images: FileData[]) => void
}

/**
 * インプットイメージ
 */
const InputImages = (props: InputImagesProps) => {
  const {
    images,
    maximumNumber,
    name,
    hasError,
    width = '100px',
    height = '100px',
    onChange,
    radius
  } = props
  const files = () =>
      images
        .filter((img: FileData) => img.file)
        .map((img: FileData) => img.file as File)

  const isDropzoneDisplay =
    !maximumNumber || images.length < maximumNumber ? 'block' : 'none'

  const onRemove = (src: string) => {
      const image = images.find((img: FileData) => img.src === src)
      const newImages = images.filter((img: FileData) => img.src !== src)

      if (image) {
        if (image.file && image.src) {
          URL.revokeObjectURL(image.src)
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          delete (image as any).src
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        onChange && onChange(newImages)
      }
    }

    const onDrop = (files: File[]) => {
      const newImages: FileData[] = [];
    
      for (const file of files) {
        const exists = images.find((img: FileData) => img.file === file);
    
        if (!exists && (!maximumNumber || images.length + newImages.length < maximumNumber)) {
          newImages.push({ file, src: URL.createObjectURL(file) });
        }
      }
    
      // ⭐ ここが超重要：必ず existing + new を返す
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      onChange && onChange([...images, ...newImages]);
    };

  return (
    <div className='flex flex-col [&>*:not(:first-child)]:mt-2'>
      {images &&
        images.map((img, index) => {
          return (
            <ImagePreview
              alt="イメージ"
              key={index}
              src={img.src}
              onRemove={onRemove}
            />
          )
        })}
      <div style={{ display: isDropzoneDisplay }}>
        <Dropzone
          acceptedFileTypes={[
            'image/gif',
            'image/jpeg',
            'image/jpg',
            'image/png',
          ]}
          name={name}
          height={height}
          width={width}
          value={files()}
          hasError={hasError}
          onDrop={onDrop}
          radius={radius}
        />
      </div>
    </div>
  )
}

export default InputImages