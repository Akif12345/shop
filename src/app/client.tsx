"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ReviewsCarousel } from "./reviews-carousel";

type Language = "en" | "ar";

const copy = {
  en: {
    brand: "Dammam FitFix",
    brandBadge: "by Prof. Tufail Ahmad",
    brandSkills: "Belt Setup & Board Repair Specialist",
    navServices: "Services",
    navProcess: "Process",
    navContact: "Contact",
    switchLabel: "AR",
    heroEyebrow: "Dammam treadmill repair, belt supply, and setup support",
    heroTitle1: "KEEP YOUR",
    heroTitle2: "MACHINES",
    heroTitle3: "RUNNING",
    heroSub:
      "Fast booking for repair, pickup, installation, and belt requests. Designed for mobile-first use with clear steps and quick actions.",
    primaryCta: "Book a Service",
    secondaryCta: "View Services",
    trust1Title: "Quick Response",
    trust1Desc: "Most requests are reviewed the same day.",
    trust2Title: "Dammam Coverage",
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
    footer: "Dammam FitFix Workshop",
    adminLink: "Admin",
    findUs: "Find Us",
    locationTitle: "Visit Our Workshop",
    locationLabel: "Address",
    locationAddress: "C4Q4+H3W، السوق،, Dammam 32242, Saudi Arabia",
    locationName: "Treadmill Repair Services",
    openInMaps: "Open in Google Maps",
    reviewsLabel: "What our customers say",
    reviewsTitle: "Customer Reviews",
    call: "Call",
    whatsapp: "WhatsApp",
    arrow: "→",
  },
  ar: {
    brand: "ورشة فت فكس - الدمام",
    brandBadge: "بواسطة البروفيسور طفيل أحمد",
    brandSkills: "خبير تركيب الأحزمة وإصلاح اللوحات",
    navServices: "الخدمات",
    navProcess: "الخطوات",
    navContact: "تواصل",
    switchLabel: "EN",
    heroEyebrow: "صيانة أجهزة المشي وتوفير الأحزمة وخدمات التركيب في الدمام",
    heroTitle1: "حافظ على",
    heroTitle2: "أجهزتك",
    heroTitle3: "بأفضل أداء",
    heroSub:
      "حجز سريع للصيانة والاستلام والتركيب وطلبات الأحزمة. التصميم مخصص للموبايل مع خطوات واضحة وأزرار سهلة.",
    primaryCta: "احجز خدمة",
    secondaryCta: "عرض الخدمات",
    trust1Title: "استجابة سريعة",
    trust1Desc: "معظم الطلبات تتم مراجعتها في نفس اليوم.",
    trust2Title: "تغطية الدمام",
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
    footer: "ورشة فت فكس - الدمام",
    adminLink: "لوحة التحكم",
    findUs: "موقعنا",
    locationTitle: "زر ورشتنا",
    locationLabel: "العنوان",
    locationAddress: "C4Q4+H3W، السوق،، الدمام 32242، المملكة العربية السعودية",
    locationName: "خدمات إصلاح أجهزة المشي",
    openInMaps: "فتح في خرائط جوجل",
    reviewsLabel: "آراء عملائنا",
    reviewsTitle: "آراء العملاء",
    call: "اتصال",
    whatsapp: "واتساب",
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isArabic = language === "ar";

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = isArabic ? "rtl" : "ltr";
  }, [isArabic, language]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [language]);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const t = useMemo(() => copy[language], [language]);

  const navItems = [
    { label: t.navServices, href: "#services" },
    { label: t.navProcess, href: "#process" },
    { label: t.navContact, href: "#contact" },
    { label: t.findUs, href: "#location" },
    { label: t.adminLink, href: "/admin" },
  ];

  return (
    <div className="min-h-screen bg-[#f5f3ef] text-[#111] transition-colors duration-200">
      <header className="sticky top-0 z-40 border-b border-black/10 bg-[#f5f3ef]/95 backdrop-blur">
        <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4 sm:h-16 sm:px-6">
          <div className="min-w-0">
            <Link href="/" className="text-base font-semibold tracking-wide sm:text-lg">
              {t.brand}
            </Link>
            <p className="hidden text-[10px] leading-tight text-black/50 md:block">
              {t.brandBadge} — {t.brandSkills}
            </p>
          </div>

          {/* Desktop nav */}
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

          {/* Mobile controls */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              onClick={() => setLanguage(isArabic ? "en" : "ar")}
              className="rounded-full border border-black/20 px-2.5 py-1 text-xs font-semibold tracking-wide transition hover:border-black"
            >
              {t.switchLabel}
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-lg transition hover:bg-black/5"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

          {/* Desktop language toggle */}
          <button
            type="button"
            onClick={() => setLanguage(isArabic ? "en" : "ar")}
            className="hidden rounded-full border border-black/20 px-3 py-1.5 text-xs font-semibold tracking-wide transition hover:border-black md:block"
          >
            {t.switchLabel}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="border-t border-black/10 bg-white md:hidden">
            <nav className="mx-auto max-w-6xl px-4 py-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    if (item.href.startsWith("#")) {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }
                  }}
                  className={`block rounded-xl px-4 py-3 text-sm font-medium transition ${
                    item.href === "/admin"
                      ? "text-black/40"
                      : "text-black/80 hover:bg-black/5"
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        )}
      </header>

      <main>
        {/* Hero Section with Background Video */}
        <section className="relative mx-auto w-full max-w-6xl overflow-hidden sm:px-6">
          {/* Video Background */}
          <div className="absolute inset-0 z-0">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="absolute inset-0 h-full w-full object-cover"
            >
              <source src="/videos/hero-loop.mp4" type="video/mp4" />
            </video>
            {/* Brand-colored dark overlay — lighter so video is visible */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#d44a1a]/40 via-black/35 to-[#1a0800]/50" />
          </div>

          {/* Hero Content - White text on video */}
          <div className="relative z-10 px-4 pb-10 pt-8 sm:px-0 sm:pt-10">
            <div className="mx-auto max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-white/90">
                {t.heroEyebrow}
              </p>
              <h1 className="mt-5 text-4xl font-black leading-[0.95] tracking-tight text-white sm:text-5xl lg:text-6xl">
                {t.heroTitle1}
                <br />
                <span className="text-[#ffb79d]">{t.heroTitle2}</span>
                <br />
                {t.heroTitle3}
              </h1>
              <p className="mt-5 max-w-xl text-sm leading-7 text-white/90 sm:text-base">
                {t.heroSub}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/book"
                  className="inline-flex items-center gap-2 rounded-full bg-[#d44a1a] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#bf3f15]"
                >
                  {t.primaryCta}
                  <span aria-hidden>{t.arrow}</span>
                </Link>
                <a
                  href="#services"
                  className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-5 py-3 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/20"
                >
                  {t.secondaryCta}
                  <span aria-hidden>{t.arrow}</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Mobile Badge Card */}
        <section className="mx-auto w-full max-w-6xl px-4 pb-4 pt-6 sm:hidden">
          <div className="rounded-2xl border border-[#d44a1a]/20 bg-[#fdf5f0] p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#d44a1a]/10">
                <svg className="h-6 w-6 text-[#d44a1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-bold text-[#111]">{t.brandBadge}</p>
                <p className="text-xs text-black/60">{t.brandSkills}</p>
              </div>
            </div>
            <div className="mt-3 flex gap-2">
              <a
                href="tel:+966569812106"
                className="flex-1 rounded-full bg-[#d44a1a] px-3 py-2 text-center text-xs font-semibold text-white transition hover:bg-[#bf3f15]"
              >
                📞 {t.call}
              </a>
              <a
                href="https://wa.me/966569812106"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 rounded-full bg-[#25d366] px-3 py-2 text-center text-xs font-semibold text-white transition hover:bg-[#1fb855]"
              >
                💬 {t.whatsapp}
              </a>
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

        {/* Location Section */}
        <section id="location" className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{t.locationTitle}</h2>
            <div className="mt-4 space-y-3">
              <p className="text-sm font-medium text-black/80">{t.locationName}</p>
              <p className="text-sm text-black/60">
                <span className="font-medium text-black/80">{t.locationLabel}:</span>{" "}
                {t.locationAddress}
              </p>
              <a
                href="https://www.google.com/maps/place/Treadmill+Repair+Services/@26.4389898,50.1052084,17z/data=!3m1!4b1!4m6!3m5!1s0x3e49fb8b0b13f621:0x78cfb22297f37871!8m2!3d26.4389898!4d50.1052084!16s%2Fg%2F11h07ctz67?hl=en&entry=ttu"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#d44a1a] transition hover:underline"
              >
                {t.openInMaps}
                <span aria-hidden>→</span>
              </a>
              {/* Contact Buttons */}
              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href="tel:+966569812106"
                  className="inline-flex items-center gap-2 rounded-full bg-[#d44a1a] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#bf3f15]"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {t.call}
                </a>
                <a
                  href="https://wa.me/966569812106"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#25d366] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#1fb855]"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  {t.whatsapp}
                </a>
              </div>
            </div>
            <div className="mt-6 overflow-hidden rounded-2xl border border-black/10">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3572.519147170032!2d50.10263347542327!3d26.438989776932658!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e49fb8b0b13f621%3A0x78cfb22297f37871!2sTreadmill%20Repair%20Services!5e0!3m2!1sen!2sin!4v1775450202199!5m2!1sen!2sin"
                width="100%"
                height="350"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={t.locationTitle}
                className="w-full"
              />
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-black/55">
            {t.reviewsLabel}
          </p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
            {t.reviewsTitle}
          </h2>
          <div className="mt-6">
            <ReviewsCarousel />
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
