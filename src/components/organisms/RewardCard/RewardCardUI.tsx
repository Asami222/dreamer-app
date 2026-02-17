"use client";

import Button from "src/components/atoms/Button";
import { StarIcon, DeleteForeverIcon } from "src/components/atoms/IconButton";
import ShapeImage from "@/components/atoms/ShapeImage";

interface RewardCardUIProps {
  rewardId: string;
  rewardImageUrl?: string;
  reward: string;
  starNum: number;
  userHasStar: number
  isLoading?: boolean;
  onChangeButtonClick?: (id: string) => void;
  onRemoveButtonClick?: (id: string) => void;
  isExchanging?: boolean;
  isDeleting?: boolean;
}

const RewardCardUI =({
  rewardId,
  rewardImageUrl,
  reward,
  starNum,
  userHasStar,
  //isLoading,
  onChangeButtonClick,
  onRemoveButtonClick,
  isExchanging,
}: RewardCardUIProps) => {

  return (
      <div className='flex gap-4 items-center justify-end w-[320px]'>
      { rewardImageUrl &&
          <div className='relative w-[100px] h-[98px] mx-auto'>
            <ShapeImage 
              src={rewardImageUrl}
              width={100}
              height={98}
              shape="square"
              alt="ご褒美画像"
            />
          </div>
        }
        <div className='flex flex-col items-center gap-2'>
          <p className='text-[16px] text-(--text) font-medium'>{reward}</p>
          <div className='flex gap-2 items-center'>
            <StarIcon size={32} color="var(--starLight)" ariaLabel='星の数'/>
            <div className='w-[72px] h-[32px] rounded-[5px] bg-(--secondary) flex justify-center items-center'>
              <p className='text-[16px] text-(--placeholder)'>{starNum}</p>
            </div>
            <p className='text-[16px] text-(--text)'>個</p>
          </div>
          <Button 
            type="button"
            selectcolor="Yellow"
            onClick={() => onChangeButtonClick?.(rewardId)}
            disabled={(starNum > 0 && userHasStar < starNum) || isExchanging} //disabled={!isPossible}の書き方でも可
            loading={isExchanging}
            loadingMessage="交換中..."
            className='w-[104px] h-7 rounded-[5px] text-[14px] inline-block text-(--text) text-center'
            dataTestid="exchange-button"
            >交換する
          </Button>
        </div>
        <DeleteForeverIcon size={32} color="var(--borderDash)" onClick={() => onRemoveButtonClick?.(rewardId)} ariaLabel="ご褒美削除ボタン"/>
      </div>
  )
}

export default RewardCardUI


