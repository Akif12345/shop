export default function LoadingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f3ef]">
      <div className="text-center">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-black/20 border-t-[#d44a1a]" />
        <p className="mt-4 text-sm text-black/50">Loading…</p>
      </div>
    </div>
  );
}
