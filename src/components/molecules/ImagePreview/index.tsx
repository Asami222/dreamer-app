import Image from 'next/image'
import { CloseIcon } from 'src/components/atoms/IconButton'
import { MouseEventHandler, ReactNode } from 'react'


interface CloseBoxProps {
  onClick?: MouseEventHandler<HTMLDivElement>
  children: ReactNode
}

function CloseBox({children, ...rest}: CloseBoxProps) {
  return (
    <div {...rest} className='flex items-center justify-center absolute top-0 right-[-20px] w-[30px] h-[30px] rounded-full bg-[rgba(243, 228, 227, 0.66)] cursor-pointer'>
      {children}
    </div>
  )
}

interface ImagePreviewProps {
  src: string
  alt?: string
  height?: string
  width?: string
  onRemove?: (src: string) => void
}

/**
 * イメージプレビュー
 */
const ImagePreview = ({
  src,
  height = '100px',
  width = '100px',
  onRemove,
}: ImagePreviewProps) => {
  // 閉じるボタンを押したらonRemoveを呼ぶ
  const handleCloseClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    onRemove && src && onRemove(src)

    return false
  }

  return (
    <>
      <div className='relative' style={{height, width}}>
        <Image
          quality="85"
          src={src}
          alt="イメージ"
          sizes="25.6vw"
          fill
          style={{objectFit: "contain", objectPosition: '50% 50%'}}
        />
      </div>
      <CloseBox
        onClick={handleCloseClick}
      >
        <CloseIcon size={24} color="var(--white)" ariaLabel='閉じる'/>
      </CloseBox>
    </>
  )
}

export default ImagePreview