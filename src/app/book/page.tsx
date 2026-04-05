"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type Language = "en" | "ar";

const copy = {
  en: {
    back: "Back to homepage",
    switchLabel: "AR",
    title: "Booking & Request Hub",
    subtitle:
      "Choose the service you want and continue to the dedicated request form.",
    pickupTitle: "Machine Pickup Booking",
    pickupDesc: "Book a pickup slot for equipment that needs workshop service.",
    repairTitle: "Repair Request",
    repairDesc: "Submit fault details and request technician support.",
    beltTitle: "Belt Order Request",
    beltDesc: "Request treadmill belt recommendations and ordering support.",
    setupTitle: "Setup / Installation",
    setupDesc: "Book installation support for gyms, homes, or relocations.",
    start: "Start",
    arrow: "→",
  },
  ar: {
    back: "العودة للصفحة الرئيسية",
    switchLabel: "EN",
    title: "بوابة الحجز والطلبات",
    subtitle: "اختر الخدمة المطلوبة ثم انتقل إلى نموذج الطلب الخاص بها.",
    pickupTitle: "حجز استلام الجهاز",
    pickupDesc: "احجز موعد استلام للأجهزة التي تحتاج صيانة داخل الورشة.",
    repairTitle: "طلب صيانة",
    repairDesc: "أرسل تفاصيل العطل واطلب دعم الفني.",
    beltTitle: "طلب حزام جهاز المشي",
    beltDesc: "اطلب ترشيح الحزام المناسب والمساعدة في الطلب.",
    setupTitle: "التركيب / الإعداد",
    setupDesc: "احجز خدمة تركيب للأندية أو المنازل أو بعد نقل الأجهزة.",
    start: "ابدأ",
    arrow: "←",
  },
} as const;

const requestCards = [
  { key: "pickup", href: "/book/pickup", title: "pickupTitle", desc: "pickupDesc" },
  { key: "repair", href: "/book/repair", title: "repairTitle", desc: "repairDesc" },
  { key: "belt", href: "/book/belt-order", title: "beltTitle", desc: "beltDesc" },
  { key: "setup", href: "/book/setup", title: "setupTitle", desc: "setupDesc" },
] as const;

export default function BookingHubPage() {
  const [language, setLanguage] = useState<Language>("en");
  const isArabic = language === "ar";

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = isArabic ? "rtl" : "ltr";
  }, [isArabic, language]);

  const t = useMemo(() => copy[language], [language]);

  return (
    <div className="min-h-screen bg-[#f5f3ef] px-4 py-8 text-[#111] sm:px-6 sm:py-10">
      <div className="mx-auto w-full max-w-5xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-black/75 transition hover:text-black"
          >
            <span aria-hidden>{isArabic ? "→" : "←"}</span>
            {t.back}
          </Link>
          <button
            type="button"
            onClick={() => setLanguage(isArabic ? "en" : "ar")}
            className="rounded-full border border-black/20 px-3 py-1.5 text-xs font-semibold tracking-wide transition hover:border-black"
          >
            {t.switchLabel}
          </button>
        </div>

        <section className="mt-5 rounded-3xl border border-black/10 bg-white p-6 shadow-sm sm:mt-6 sm:p-8">
          <h1 className="text-3xl font-black tracking-tight sm:text-4xl">{t.title}</h1>
          <p className="mt-3 text-sm leading-7 text-black/70 sm:text-base">{t.subtitle}</p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {requestCards.map((card) => (
              <article
                key={card.key}
                className="rounded-2xl border border-black/10 bg-[#fdfcfa] p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow"
              >
                <h2 className="text-xl font-semibold">{t[card.title]}</h2>
                <p className="mt-2 text-sm leading-7 text-black/70">{t[card.desc]}</p>
                <Link
                  href={card.href}
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-[#d44a1a]"
                >
                  {t.start}
                  <span aria-hidden>{t.arrow}</span>
                </Link>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
