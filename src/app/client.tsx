"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type Language = "en" | "ar";

const copy = {
  en: {
    brand: "Riyadh FitFix",
    navServices: "Services",
    navProcess: "Process",
    navContact: "Contact",
    switchLabel: "AR",
    heroEyebrow: "Riyadh treadmill repair, belt supply, and setup support",
    heroTitle1: "KEEP YOUR",
    heroTitle2: "MACHINES",
    heroTitle3: "RUNNING",
    heroSub:
      "Fast booking for repair, pickup, installation, and belt requests. Designed for mobile-first use with clear steps and quick actions.",
    primaryCta: "Book a Service",
    secondaryCta: "View Services",
    trust1Title: "Quick Response",
    trust1Desc: "Most requests are reviewed the same day.",
    trust2Title: "Riyadh Coverage",
    trust2Desc: "Home, gym, and commercial locations supported.",
    trust3Title: "Expert Team",
    trust3Desc: "Specialized treadmill and gym-machine handling.",
    servicesLabel: "What we offer",
    servicesTitle: "Core Services",
    service1Title: "Repair & Diagnostics",
    service1Desc:
      "Fault checks, motor issues, control board troubleshooting, and mechanical fixes.",
    service2Title: "Belt Orders",
    service2Desc:
      "Submit machine model details and get the right treadmill belt recommendation.",
    service3Title: "Setup & Installation",
    service3Desc:
      "On-site machine setup for homes, gyms, and relocated equipment.",
    processLabel: "How it works",
    processTitle: "Simple Booking Flow",
    step1Title: "Choose Service",
    step1Desc: "Select pickup, repair, belt order, or setup request.",
    step2Title: "Add Details",
    step2Desc:
      "Enter machine info, preferred schedule, and your contact details.",
    step3Title: "We Confirm",
    step3Desc: "Our team contacts you to confirm timing and requirements.",
    step4Title: "Service Delivered",
    step4Desc: "Technician visit, pickup, or order processing is completed.",
    ctaTitle: "Ready to book?",
    ctaDesc:
      "We will connect all buttons to live forms next, step by step.",
    ctaButton: "Start Booking",
    footer: "Riyadh FitFix Workshop",
    adminLink: "Admin",
    arrow: "→",
  },
  ar: {
    brand: "ورشة فت فكس - الرياض",
    navServices: "الخدمات",
    navProcess: "الخطوات",
    navContact: "تواصل",
    switchLabel: "EN",
    heroEyebrow: "صيانة أجهزة المشي وتوفير الأحزمة وخدمات التركيب في الرياض",
    heroTitle1: "حافظ على",
    heroTitle2: "أجهزتك",
    heroTitle3: "بأفضل أداء",
    heroSub:
      "حجز سريع للصيانة والاستلام والتركيب وطلبات الأحزمة. التصميم مخصص للموبايل مع خطوات واضحة وأزرار سهلة.",
    primaryCta: "احجز خدمة",
    secondaryCta: "عرض الخدمات",
    trust1Title: "استجابة سريعة",
    trust1Desc: "معظم الطلبات تتم مراجعتها في نفس اليوم.",
    trust2Title: "تغطية الرياض",
    trust2Desc: "ندعم المنازل والصالات والمواقع التجارية.",
    trust3Title: "فريق متخصص",
    trust3Desc: "خبرة عالية في أجهزة المشي ومعدات الجيم.",
    servicesLabel: "ماذا نقدم",
    servicesTitle: "الخدمات الأساسية",
    service1Title: "صيانة وفحص الأعطال",
    service1Desc:
      "فحص كامل للأعطال، مشاكل المحرك، لوحة التحكم، والإصلاحات الميكانيكية.",
    service2Title: "طلبات الأحزمة",
    service2Desc:
      "أرسل موديل الجهاز وسنرشح لك الحزام المناسب بدقة.",
    service3Title: "التركيب والإعداد",
    service3Desc:
      "تركيب وتجهيز الأجهزة في المنازل والنوادي أو بعد نقلها.",
    processLabel: "كيف يتم الحجز",
    processTitle: "خطوات حجز بسيطة",
    step1Title: "اختر الخدمة",
    step1Desc: "حدد نوع الطلب: استلام، صيانة، حزام، أو تركيب.",
    step2Title: "أضف التفاصيل",
    step2Desc: "أدخل بيانات الجهاز والوقت المناسب ووسيلة التواصل.",
    step3Title: "تأكيد الطلب",
    step3Desc: "نتواصل معك لتأكيد الموعد والمتطلبات.",
    step4Title: "تنفيذ الخدمة",
    step4Desc: "يتم تنفيذ الزيارة أو الاستلام أو تجهيز الطلب.",
    ctaTitle: "جاهز للحجز؟",
    ctaDesc: "الخطوة القادمة: ربط كل الأزرار بنماذج حجز فعلية.",
    ctaButton: "ابدأ الحجز",
    footer: "ورشة فت فكس - الرياض",
    adminLink: "لوحة التحكم",
    arrow: "←",
  },
} as const;

const serviceKeys = [
  { title: "service1Title", desc: "service1Desc" },
  { title: "service2Title", desc: "service2Desc" },
  { title: "service3Title", desc: "service3Desc" },
] as const;

const processKeys = [
  { title: "step1Title", desc: "step1Desc" },
  { title: "step2Title", desc: "step2Desc" },
  { title: "step3Title", desc: "step3Desc" },
  { title: "step4Title", desc: "step4Desc" },
] as const;

export function HomePageClient() {
  const [language, setLanguage] = useState<Language>("en");
  const isArabic = language === "ar";

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = isArabic ? "rtl" : "ltr";
  }, [isArabic, language]);

  const t = useMemo(() => copy[language], [language]);

  return (
    <div className="min-h-screen bg-[#f5f3ef] text-[#111] transition-colors duration-200">
      <header className="sticky top-0 z-40 border-b border-black/10 bg-[#f5f3ef]/95 backdrop-blur">
        <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4 sm:h-16 sm:px-6">
          <Link href="/" className="text-base font-semibold tracking-wide sm:text-lg">
            {t.brand}
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            <a href="#services" className="text-sm text-black/70 transition hover:text-black">
              {t.navServices}
            </a>
            <a href="#process" className="text-sm text-black/70 transition hover:text-black">
              {t.navProcess}
            </a>
            <a href="#contact" className="text-sm text-black/70 transition hover:text-black">
              {t.navContact}
            </a>
            <Link
              href="/admin"
              className="rounded-full border border-black/20 px-3 py-1 text-xs font-medium text-black/50 transition hover:border-black hover:text-black"
            >
              {t.adminLink}
            </Link>
          </nav>
          <button
            type="button"
            onClick={() => setLanguage(isArabic ? "en" : "ar")}
            className="rounded-full border border-black/20 px-3 py-1.5 text-xs font-semibold tracking-wide transition hover:border-black"
          >
            {t.switchLabel}
          </button>
        </div>
      </header>

      <main>
        <section className="mx-auto grid w-full max-w-6xl gap-6 px-4 pb-10 pt-8 sm:px-6 sm:pt-10 md:grid-cols-2 md:gap-0">
          <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm md:rounded-r-none md:p-10">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-black/55">
              {t.heroEyebrow}
            </p>
            <h1 className="mt-5 text-4xl font-black leading-[0.95] tracking-tight sm:text-5xl lg:text-6xl">
              {t.heroTitle1}
              <br />
              <span className="text-[#d44a1a]">{t.heroTitle2}</span>
              <br />
              {t.heroTitle3}
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-7 text-black/70 sm:text-base">
              {t.heroSub}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/book"
                className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-[#d44a1a]"
              >
                {t.primaryCta}
                <span aria-hidden>{t.arrow}</span>
              </Link>
              <a
                href="#services"
                className="inline-flex items-center gap-2 rounded-full border border-black/20 px-5 py-3 text-sm font-medium transition hover:border-black"
              >
                {t.secondaryCta}
                <span aria-hidden>{t.arrow}</span>
              </a>
            </div>
          </div>
          <div className="rounded-3xl border border-black/10 bg-[#10100f] p-6 text-white shadow-sm md:rounded-l-none md:p-10">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-white/60">24h</p>
                <p className="mt-2 text-2xl font-bold">Response</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-white/60">Riyadh</p>
                <p className="mt-2 text-2xl font-bold">Coverage</p>
              </div>
              <div className="col-span-2 rounded-2xl border border-[#d44a1a]/40 bg-[#d44a1a]/10 p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-[#ffb79d]">
                  Mobile-first UX
                </p>
                <p className="mt-2 text-lg font-semibold">
                  Arabic + English with smooth direction switching.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-black/10 bg-white">
          <div className="mx-auto grid w-full max-w-6xl gap-3 px-4 py-5 sm:grid-cols-3 sm:px-6">
            <article className="rounded-2xl border border-black/10 p-4">
              <h3 className="text-sm font-semibold">{t.trust1Title}</h3>
              <p className="mt-2 text-sm text-black/65">{t.trust1Desc}</p>
            </article>
            <article className="rounded-2xl border border-black/10 p-4">
              <h3 className="text-sm font-semibold">{t.trust2Title}</h3>
              <p className="mt-2 text-sm text-black/65">{t.trust2Desc}</p>
            </article>
            <article className="rounded-2xl border border-black/10 p-4">
              <h3 className="text-sm font-semibold">{t.trust3Title}</h3>
              <p className="mt-2 text-sm text-black/65">{t.trust3Desc}</p>
            </article>
          </div>
        </section>

        <section id="services" className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-black/55">
            {t.servicesLabel}
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            {t.servicesTitle}
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {serviceKeys.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow"
              >
                <h3 className="text-lg font-semibold">
                  {t[item.title]}
                </h3>
                <p className="mt-3 text-sm leading-7 text-black/65">{t[item.desc]}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="process" className="bg-[#111] py-10 text-white sm:py-14">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#ffb79d]">
              {t.processLabel}
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              {t.processTitle}
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-4">
              {processKeys.map((item, index) => (
                <article
                  key={item.title}
                  className="rounded-2xl border border-white/15 bg-white/5 p-5"
                >
                  <p className="text-xs uppercase tracking-[0.16em] text-white/55">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 text-lg font-semibold">{t[item.title]}</h3>
                  <p className="mt-2 text-sm leading-7 text-white/70">{t[item.desc]}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          <div className="rounded-3xl bg-black p-6 text-white sm:p-10">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t.ctaTitle}</h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">
              {t.ctaDesc}
            </p>
            <Link
              href="/book"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#d44a1a] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#bf3f15]"
            >
              {t.ctaButton}
              <span aria-hidden>{t.arrow}</span>
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-black/10 bg-white py-6">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-2 px-4 text-sm text-black/65 sm:flex-row sm:px-6">
          <p>{t.footer}</p>
          <p>© 2026</p>
        </div>
      </footer>
    </div>
  );
}
