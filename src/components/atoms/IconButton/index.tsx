import {
  PersonOutline,
  CheckBoxOutlineBlank,
  CheckBox,
  Cancel,
  CloudUpload,
  FileUpload,
  Close,
  Person,
  AccountCircle,
  Checklist,
  DoneOutline,
  TaskAlt,
  KeyboardDoubleArrowRight,
  KeyboardArrowDown,
  KeyboardArrowUp,
  Star,
  Done,
  DeleteForever,
  CancelPresentation,
  Create,
  NoAccounts,
  EmojiEvents,
  Logout,
  Settings,
} from '@mui/icons-material'
import SvgIcon from '@mui/material/SvgIcon'
import clsx from "clsx"
import { HTMLAttributes, MouseEventHandler, ReactNode } from 'react'

interface IconWrapperProps extends HTMLAttributes<HTMLDivElement>{
  size: number
  cursor?: string
  color?: string // Tailwindではテーマを使わないのでカラーコードなどでOK
  hover?: boolean
  backgroundColor?: string
  onClick?: MouseEventHandler<HTMLDivElement>
  children: ReactNode
}

export function IconWrapper({
  size,
  cursor,
  color,
  hover = true,
  backgroundColor,
  children,
  ...rest
}: IconWrapperProps) {
  return (
    <div
      {...rest}
      className={clsx(
        "flex items-center justify-center",
        // 子要素 svg の整形
        "[&>svg]:block",
        hover && "[&>svg]:hover:text-(--borderDash)",
        // cursor は有効時に pointer にしたい場合
        cursor ? null : "cursor-pointer"
      )}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        fontSize: `${size}px`,
        backgroundColor,
        color,
        cursor: cursor ?? "pointer",
      }}
    >
      {children}
    </div>
  )
}

export interface IconButtonProps {
  onClick?: MouseEventHandler<HTMLDivElement>
  color?: string
  className?: string
  backgroundColor?: string
  size?: number
  ariaLabel?: string
  hover?: boolean
  dataTestId?: string
}

/**
 * アイコンボタン
 */
function withIconStyle(
  Icon: typeof SvgIcon,
  defaultTestId?: string
): React.ComponentType<IconButtonProps> {
  const IconWithStyle = (props: IconButtonProps) => {
    const { onClick, className, size = 24, dataTestId: testId, ariaLabel, hover = true, ...rest } = props
    const cursor = onClick ? 'pointer' : ''

    return (
      <IconWrapper data-testid={testId || defaultTestId} cursor={cursor} size={size} role="button" aria-label={ariaLabel || defaultTestId?.replace(/-icon$/, '')} onClick={onClick} hover={hover} {...rest} >
        <Icon
          className={className}
          fontSize="inherit"
          color="inherit"
        />
      </IconWrapper>
    )
  }

  return IconWithStyle
}

export const CloseIcon = withIconStyle(Close, "close-icon")

export const CloudUploadIcon = withIconStyle(CloudUpload)

export const CancelIcon = withIconStyle(Cancel)

export const CheckBoxOutlineBlankIcon = withIconStyle(CheckBoxOutlineBlank)

export const CheckBoxIcon = withIconStyle(CheckBox)

export const PersonIcon = withIconStyle(Person)

export const PersonOutlineIcon = withIconStyle(PersonOutline)

export const FileUploadIcon = withIconStyle(FileUpload, "fileUpLoad-icon")

export const AccountCircleIcon = withIconStyle(AccountCircle)

export const DoneOutlineIcon = withIconStyle(DoneOutline)

export const DoneIcon = withIconStyle(Done, 'done-icon')

export const ChecklistIcon = withIconStyle(Checklist)

export const TaskAltIcon = withIconStyle(TaskAlt)

export const KeyboardDoubleArrowRightIcon = withIconStyle(KeyboardDoubleArrowRight)

export const KeyboardArrowDownIcon = withIconStyle(KeyboardArrowDown)

export const KeyboardArrowUpIcon = withIconStyle(KeyboardArrowUp)

export const StarIcon = withIconStyle(Star, "star-icon")

export const DeleteForeverIcon = withIconStyle(DeleteForever)

export const CancelPresentationIcon = withIconStyle(CancelPresentation)

export const CreateIcon = withIconStyle(Create)

export const NoAccountsIcon = withIconStyle(NoAccounts)

export const LogoutIcon = withIconStyle(Logout)

export const EmojiEventsIcon = withIconStyle(EmojiEvents)

export const SettingsIcon = withIconStyle(Settings)