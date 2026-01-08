export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-dvh bg-(--topPrimary)">
      <div className="flex flex-col items-center gap-4 animate-pulse">
        <div className="w-20 h-20 rounded-full bg-(--borderDash)" />
        <div className="w-40 h-4 rounded bg-(--borderDash)" />
      </div>
    </div>
  );
}