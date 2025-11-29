//import clsx from "clsx"

interface SeparatorProps {
  children?: React.ReactNode
}
/*
export default function Separator({ children }: SeparatorProps) {
  const margin = children ? '0.5em' : '0'

  return (
    <div 
    className={clsx(
      "flex items-center text-(--text) h-px",
      // before
      "before:content-[''] before:flex-1 before:opacity-35 before:border-t before:border-(--text)",
      // after
      "after:content-[''] after:flex-1 after:opacity-35 after:border-t after:border-(--text)"
    )}
    style={{ borderColor: "var(--text)", marginInline: margin }}
    >
      //中央の文字
      {children && <span>{children}</span>}
    </div>
  )
}
*/
export default function Separator({ children }: SeparatorProps) {
  const margin = children ? '0.5em' : '0'

  return (
    <div className="flex items-center text-(--text)">
      {/* 左の線 */}
      <div
        className="flex-1 border border-(--text) opacity-35"
        style={{ marginRight: margin }}
      />
      {/* 中央の文字 */}
      {children && <span>{children}</span>}
      {/* 右の線 */}
      <div
        className="flex-1 border border-(--text) opacity-35"
        style={{ marginLeft: margin }}
      />
    </div>
  )
}