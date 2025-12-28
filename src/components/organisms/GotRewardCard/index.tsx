import { StarIcon, CancelIcon } from "src/components/atoms/IconButton";
import Separator from 'src/components/atoms/Separator';
import type { GotRewardUIModel } from 'src/types/data';
import { formatDateToJapanese } from 'src/utils';

type GotRewardCardProps = GotRewardUIModel & {
  onRemoveButtonClick?: (id: string) => void;
};

const GotRewardCard =({
  id,
  title,
  star,
  createdAt,
  onRemoveButtonClick
}: GotRewardCardProps) => {
  
  //日本時間に変換
  const time = formatDateToJapanese(createdAt)

  return(
    <div className="flex flex-col gap-2">
      <div className="ml-2">
        <p className="text-(--medium) font-medium" style={{ color: "var(--text)"}}>
          {title}
        </p>
      </div>
      <div className="flex gap-4 items-center ml-2 mr-2 justify-between">
          <div className="flex gap-4 items-center">
            <div className="flex gap-1 items-center">
              <StarIcon size={20} color="var(--starLight)" ariaLabel="星の数"/>
              <p className="text-(--medium)" style={{ color: "var(--text)"}}>x{star}</p>
            </div>
            <p className="text-(--medium)" style={{ color: "var(--text)"}}>{time}</p>
          </div>
          <CancelIcon size={20} color='var(--text)' ariaLabel="削除ボタン" onClick={() => onRemoveButtonClick && onRemoveButtonClick(id)}/>
      </div>
      <Separator/>
    </div>
  )
}

export default GotRewardCard