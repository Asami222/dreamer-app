import clsx from "clsx"

interface ListItemProps {
  active: boolean;
  label: string;
}

const ListItem =({
  active,
  label
}: ListItemProps) => {
  return (
    <p 
      className={clsx(
        active && "text-(--borderDash)",
      )}
      style={{
        fontSize: "var(--medium)",
        color: "var(--text)",
        textAlign: "center"
      }}
    >
      {label}
    </p>
  )
}

export default ListItem
