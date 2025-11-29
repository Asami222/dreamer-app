"use client";

import { useState, useRef, useEffect } from 'react'
import Image from "next/image";
import CheckBox from "src/components/molecules/CheckBox";
import Button from "src/components/atoms/Button";
import { StarRating2 } from "src/components/molecules/StarRating";
import clsx from "clsx"
import { TodoUIModel } from 'src/types/data';

type TodoCardProps = TodoUIModel & {
  className?: string
  limitPeriod?: string
  onCopyTextClick?: (id: string) => void
  onRemoveTextClick?: (id: string, isChecked?: boolean) => void
}
/*
interface TodoCardProps {
  id: string
  imageUrl?: string
  todo: string
  limit?: number[]
  limitDetail: string | null
  rate?: number
  description?: string
  className?: string
  limitPeriod?: string
  onCopyTextClick?: (id: string) => void
  onRemoveTextClick?: (id: string, isChecked?: boolean) => void
}
*/
const TodoCard = ({
  id,
  image,
  title,
  limit,
  detail,
  star,
  description,
  className,
  limitPeriod,
  onCopyTextClick,
  onRemoveTextClick,
}: TodoCardProps) => {

  const [textIsOpen, setTextIsOpen] = useState(false)
  const [isChecked, setIsChecked] = useState(false)
  const refText = useRef<HTMLParagraphElement>(null)
  const [textHeight, setTextHeight] = useState("0px")

  useEffect(() => {
    if (refText.current) {
      setTextHeight(`${refText.current.scrollHeight}px`)
    }
  }, []) //初回マウント時のみ計算

  const onDetailBtnClick = () => {
    setTextIsOpen((prev)=> !prev)
  }
  
  return (
    <div className={clsx(
      "p-4 bg-[rgba(244,240,240,0.65)] w-full rounded-[5px]",
      textIsOpen ? "open" : "close",
      className
    )}>
    <div className={clsx("flex items-center gap-2")}>
      {/* 左側操作欄 */}
      <div className='flex flex-col items-center gap-1 w-[48px] text-(--text) self-center'>
        <p 
          onClick={() => onCopyTextClick && onCopyTextClick(id)}
          className='cursor-pointer hover:underline text-(--text) text-[15px]'
        >
          コピー
        </p>
        <CheckBox setIsChecked={setIsChecked} isChecked={isChecked}/>
        <p
          onClick={() => onRemoveTextClick && onRemoveTextClick(id,isChecked)}
          className='cursor-pointer hover:underline text-(--text) text-[15px]'
        >
          完了
        </p>
      </div>

      {/* 右側内容欄 */}
      <div className='flex flex-col gap-4 grow'>
        { image &&
          <div className='relative w-full h-[98px] mx-auto'>
            <Image
              quality="85"
              src={image}
              alt="Todoイメージ"
              sizes="25.6vw"
              fill
              style={{objectFit:"contain", objectPosition: '50% 50%'}}
              priority
            />
          </div>
        }
        <div className='flex flex-col gap-2'>
          <p className='text-[16px] font-medium text-(--text)'>{title}</p>

          {/* 期限表示 */}
          
          {limit && limit.length === 2 && (
            <p className="text-[13px] font-normal text-(--text)">
              期限&emsp;
              {limit[0]}時から{limit[1]}時まで
              {detail && `（${detail}）`}
            </p>
          )}
          {limit && limit.length === 1 && (
            <p className="text-[13px] font-normal text-(--text)">
              期限&emsp;
              {limit[0]}{limitPeriod}
              {detail && `（${detail}）`}
            </p>
          )}

          {/* 星評価 + 詳細ボタン */}
          <div className='flex justify-between'>
            <StarRating2 num={star}/>
            <Button 
              selectcolor='Orange'
              onClick={onDetailBtnClick }
              disabled={!description}
              className='w-[64px] h-[28px] text-[13px] rounded-[3px] text-center px-4 py-1'
            >
              詳細
            </Button>
          </div>

          {/* 詳細テキスト（スライド開閉） */}
          {description && 
            <p 
              ref={refText}
              className="todo-text text-[13px] font-normal overflow-hidden h-0 transition-[height] duration-500"
              style={{ 
                "--text-height": textHeight,
                height: textIsOpen ? "var(--text-height)" : "0px",
                 color: "#956C69",
                } as React.CSSProperties}
            >
              {description}
            </p>
          }
        </div>
      </div>
    </div>
    </div>
  )
}

export default TodoCard