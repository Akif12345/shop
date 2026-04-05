"use client";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f3ef] px-4 text-[#111]">
      <div className="text-center">
        <h1 className="text-2xl font-bold tracking-tight">Something went wrong</h1>
        <p className="mt-2 text-sm text-black/60">Please try again.</p>
        <button
          onClick={reset}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-[#d44a1a]"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
