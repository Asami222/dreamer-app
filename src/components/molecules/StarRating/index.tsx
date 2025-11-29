import { Star2 } from "./Star2"
import { StarIcon } from "src/components/atoms/IconButton";

interface StarProps {
  selected?: boolean
  onSelect?: () => void
}

interface StarRating1Props {
  value: number
  setValue: React.Dispatch<React.SetStateAction<number>>
}

interface StarRating2Props {
  num?: number
}

export const Star1 =({
  selected = false,
  onSelect
}: StarProps) => {
  return (
    <StarIcon size={38} color={selected ? "var(--starLight)" : "var(--secondary)"} onClick={onSelect} hover={false} ariaLabel='星をつける'/>
  );
}

export const StarRating1 =({
  value,
  setValue
}: StarRating1Props) => {
  
  return (
    <div className='flex gap-1'>
    {[...Array(7)].map((n,i) => (
      <Star1
        key={i}
        selected={value > i}
        onSelect={() => setValue(i + 1)}
      />
    ))}
    </div>
  )
}


export const StarRating2 =(props: StarRating2Props) => {
  const {num = 0 } = props
  const defaultStar = 7 - num
  
  return (
    <div className='flex gap-1'>
    {[...Array(num)].map((n,i) => (
      <Star2
        key={i}
        selected={true}
      />
    ))}
    {[...Array(defaultStar)].map((n,i) => (
      <Star2
        key={i}
        selected={false}
      />
    ))}
    </div>
  )
}

