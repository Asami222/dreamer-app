
import Image from "next/image";
import Button from "src/components/atoms/Button";
import { StarIcon, DeleteForeverIcon } from "src/components/atoms/IconButton";

interface RewardCardUIProps {
  rewardId: string;
  rewardImageUrl?: string;
  reward: string;
  starNum: number;
  userHasStar: number
  isLoading?: boolean;
  onChangeButtonClick?: (id: string) => void;
  onRemoveButtonClick?: (id: string) => void;
}

const RewardCardUI =({
  rewardId,
  rewardImageUrl,
  reward,
  starNum,
  userHasStar,
  isLoading,
  onChangeButtonClick,
  onRemoveButtonClick,
}: RewardCardUIProps) => {

  return (
      <div className='flex gap-4 items-center w-[320px]'>
      { rewardImageUrl &&
          <div className='relative w-[100px] h-[98px] mx-auto'>
            <Image
              quality="85"
              src={rewardImageUrl}
              alt="ご褒美イメージ"
              sizes="25.6vw"
              fill
              style={{objectFit:"contain", objectPosition: '50% 50%'}}
              priority
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
            disabled={(starNum > 0 && userHasStar <= starNum) || isLoading} //disabled={!isPossible}の書き方でも可
            loading={isLoading}
            loadingMessage="交換中..."
            className='w-[104px] h-[28px] rounded-[5px] text-[14px] inline-block text-(--text) text-center'
            >交換する
          </Button>
        </div>
        <DeleteForeverIcon size={32} color="var(--borderDash)" onClick={() => onRemoveButtonClick?.(rewardId)} ariaLabel="ご褒美削除ボタン"/>
      </div>
  )
}

export default RewardCardUI


