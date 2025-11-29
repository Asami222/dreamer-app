
//テストでモックを作成するため、Star2のみ、別ファイルにしました。同じファイル内ではモックは作成できないそうです。

import { StarIcon } from "src/components/atoms/IconButton";

interface StarProps {
  selected?: boolean
  onSelect?: () => void
}

export const Star2 = ({
  selected = false,
}: StarProps) => {
  return (
    <StarIcon size={24} color={selected ? "var(--starDark)" : "var(--starDefault)"} ariaLabel='星をつける' hover={false}/>
  )
}