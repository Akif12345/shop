"use client";

import { useEffect, useRef, useState } from "react";
import { reviews } from "@/lib/reviews";

function ReviewCard({ review }: { review: typeof reviews[number] }) {
  const [showTranslation, setShowTranslation] = useState(false);
  const showTranslateBtn = review.lang === "ar" && review.translation;
  const displayText =
    showTranslation ? review.translation! : review.text;

  return (
    <div className="flex min-w-full snap-center px-4 sm:px-6">
      <div className="w-full rounded-2xl border border-black/10 bg-[#faf9f7] p-5 shadow-sm">
        {/* Header */}
        <div className="flex items-center gap-3">
          {/* Google G icon */}
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white border border-black/10">
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
          </div>

          <div className="min-w-0">
            <p className="text-sm font-semibold truncate">{review.name}</p>
            <p className="text-xs text-black/40">{review.date}</p>
          </div>
        </div>

        {/* Stars */}
        <div className="mt-3 flex gap-0.5">
          {Array.from({ length: review.rating }).map((_, s) => (
            <svg
              key={s}
              className="h-4 w-4 text-[#f59e0b]"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>

        {/* Review text */}
        <p
          className={`mt-3 text-sm leading-7 text-black/70 ${
            review.lang === "ar" && !showTranslation ? "text-right" : "text-left"
          }`}
          dir={review.lang === "ar" && !showTranslation ? "rtl" : "ltr"}
        >
          {displayText}
        </p>

        {/* Translate toggle */}
        {showTranslateBtn && (
          <button
            onClick={() => setShowTranslation(!showTranslation)}
            className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-[#d44a1a] transition hover:underline"
          >
            {showTranslation ? "Show Arabic" : "Show English translation"}
            <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

export function ReviewsCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      const idx = Math.round(el.scrollLeft / el.clientWidth);
      setActive(idx);
    };

    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(() => {
      const el = scrollRef.current;
      if (!el) return;
      const next = (active + 1) % reviews.length;
      el.scrollTo({ left: next * el.clientWidth, behavior: "smooth" });
      setActive(next);
    }, 5000);
    return () => clearInterval(timer);
  }, [active]);

  return (
    <div className="w-full">
      {/* Cards */}
      <div
        ref={scrollRef}
        className="flex snap-x snap-mandatory overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {reviews.map((r, i) => (
          <ReviewCard key={i} review={r} />
        ))}
      </div>

      {/* Dots */}
      <div className="mt-4 flex justify-center gap-1.5">
        {reviews.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              scrollRef.current?.scrollTo({
                left: i * (scrollRef.current?.clientWidth ?? 0),
                behavior: "smooth",
              });
              setActive(i);
            }}
            className={`h-2 rounded-full transition-all ${
              i === active
                ? "w-6 bg-[#d44a1a]"
                : "w-2 bg-black/15 hover:bg-black/30"
            }`}
            aria-label={`Go to review ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
