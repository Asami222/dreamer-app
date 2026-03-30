export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-dvh bg-(--topPrimary)">
      <div className="w-16 h-16 border-5 border-(--borderDash) border-t-(--topPrimary) rounded-full animate-spin" />
    </div>
  );
}