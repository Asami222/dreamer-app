import clsx from "clsx"

export type InputProps = {
  hasError?: boolean
  hasBorder?: boolean
  small?: boolean
  height: string
} & React.InputHTMLAttributes<HTMLInputElement>

export default function Input({
  hasError,
  hasBorder,
  small,
  height,
  style,
  className,
  ...rest
}: InputProps) {
  const borderColor = hasError ? "var(--danger)" : "transparent"
  const borderRadius = hasBorder ? "20px" : "5px"

  return (
    <input
      {...rest}
      className={clsx(
        "inline-block box-border outline-none bg-[rgba(244,240,240,0.65)]",
        "placeholder-[rgba(225,136,131,0.9)]",
        small ? "w-[72px] text-center" : "w-full",
        className
      )}
      style={{
        color: "#6B3734", // 固定色
        border: `1px solid ${borderColor}`,
        borderRadius: borderRadius,
        padding: "16px 14px",
        fontSize: "var(--smallMedium)",
        lineHeight: "20px",
        height: height,
        ...style,
      }}
    />
  )
}