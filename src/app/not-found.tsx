export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f3ef] px-4 text-[#111]">
      <div className="text-center">
        <p className="text-6xl font-black text-[#d44a1a]">404</p>
        <h1 className="mt-4 text-2xl font-bold tracking-tight">Page Not Found</h1>
        <p className="mt-2 text-sm text-black/60">The page you're looking for doesn't exist.</p>
        <a
          href="/"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-[#d44a1a]"
        >
          Go Home
        </a>
      </div>
    </div>
  );
}
