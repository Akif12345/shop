"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import type { SubmitResult } from "@/app/actions";
import { submitServiceRequest } from "@/app/actions";

type Language = "en" | "ar";

const copy = {
  en: {
    back: "Back to booking hub",
    title: "Repair Request",
    subtitle: "Submit fault details and request technician support.",
    submit: "Submit Repair Request",
    submitting: "Submitting...",
    success: "Request submitted! We will contact you soon.",
    fields: {
      name: "Full Name",
      phone: "Phone Number",
      email: "Email (optional)",
      brand: "Machine Brand",
      model: "Machine Model (optional)",
      issue: "Describe the Issue",
      location: "Machine Location (optional)",
      date: "Preferred Date (optional)",
      time: "Preferred Time (optional)",
      notes: "Additional Notes (optional)",
    },
    placeholders: {
      name: "Enter your full name",
      phone: "+966 5X XXX XXXX",
      email: "you@example.com",
      brand: "e.g., Life Fitness, Precor, True",
      model: "e.g., T5, TFX 5.5",
      issue: "Describe what's wrong with the machine...",
      location: "Where is the machine located?",
      notes: "Any extra details for the technician",
    },
  },
  ar: {
    back: "العودة لبوابة الحجز",
    title: "طلب صيانة",
    subtitle: "أرسل تفاصيل العطل واطلب دعم الفني.",
    submit: "إرسال طلب الصيانة",
    submitting: "جاري الإرسال...",
    success: "تم إرسال الطلب! سنتواصل معك قريباً.",
    fields: {
      name: "الاسم الكامل",
      phone: "رقم الجوال",
      email: "البريد الإلكتروني (اختياري)",
      brand: "ماركة الجهاز",
      model: "موديل الجهاز (اختياري)",
      issue: "وصف المشكلة",
      location: "موقع الجهاز (اختياري)",
      date: "التاريخ المفضل (اختياري)",
      time: "الوقت المفضل (اختياري)",
      notes: "ملاحظات إضافية (اختياري)",
    },
    placeholders: {
      name: "أدخل اسمك الكامل",
      phone: "+966 5X XXX XXXX",
      email: "you@example.com",
      brand: "مثال: Life Fitness, Precor, True",
      model: "مثال: T5, TFX 5.5",
      issue: "اشرح ما المشكلة في الجهاز...",
      location: "أين يوجد الجهاز؟",
      notes: "أي تفاصيل إضافية للفني",
    },
  },
} as const;

export default function RepairBookingPage() {
  const [language, setLanguage] = useState<Language>("en");
  const isArabic = language === "ar";
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<SubmitResult | null>(null);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = isArabic ? "rtl" : "ltr";
  }, [isArabic, language]);

  const t = useMemo(() => copy[language], [language]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      customerName: "",
      phone: "",
      email: "",
      machineBrand: "",
      machineModel: "",
      issueDescription: "",
      locationDetails: "",
      preferredDate: "",
      preferredTime: "",
      notes: "",
    },
  });

  const fieldError = (name: string) => {
    if (result?.success === false && result.fieldErrors?.[name]) {
      return result.fieldErrors[name];
    }
    return (errors as Record<string, { message?: string }>)?.[name]?.message;
  };

  const onSubmit = handleSubmit((data) => {
    setResult(null);
    startTransition(async () => {
      const res = await submitServiceRequest("repair", {
        requestType: "repair",
        customerName: data.customerName,
        phone: data.phone,
        email: data.email,
        machineBrand: data.machineBrand,
        machineModel: data.machineModel,
        issueDescription: data.issueDescription,
        locationDetails: data.locationDetails,
        preferredDate: data.preferredDate,
        preferredTime: data.preferredTime,
        notes: data.notes,
      });
      setResult(res);
      if (res.success) reset();
    });
  });

  return (
    <div className="min-h-screen bg-[#f5f3ef] px-4 py-8 text-[#111] sm:px-6 sm:py-10">
      <div className="mx-auto w-full max-w-2xl">
        <Link
          href="/book"
          className="inline-flex items-center gap-2 text-sm font-medium text-black/75 transition hover:text-black"
        >
          <span aria-hidden>{isArabic ? "→" : "←"}</span>
          {t.back}
        </Link>

        <section className="mt-6 rounded-3xl border border-black/10 bg-white p-6 shadow-sm sm:p-8">
          <h1 className="text-2xl font-black tracking-tight sm:text-3xl">{t.title}</h1>
          <p className="mt-3 text-sm leading-7 text-black/70 sm:text-base">{t.subtitle}</p>

          {result?.success && (
            <div className="mt-6 rounded-2xl border border-green-200 bg-green-50 p-4 text-sm text-green-800">
              {result.message}
            </div>
          )}
          {result?.success === false && (
            <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
              {result.error}
            </div>
          )}

          <form onSubmit={onSubmit} className="mt-6 space-y-5" noValidate>
            <Field label={t.fields.name} error={fieldError("customerName")}>
              <input
                {...register("customerName", { required: true })}
                type="text"
                placeholder={t.placeholders.name}
                className="w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-sm focus:border-[#d44a1a] focus:outline-none focus:ring-2 focus:ring-[#d44a1a]/20"
              />
            </Field>

            <Field label={t.fields.phone} error={fieldError("phone")}>
              <input
                {...register("phone", { required: true })}
                type="tel"
                placeholder={t.placeholders.phone}
                className="w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-sm focus:border-[#d44a1a] focus:outline-none focus:ring-2 focus:ring-[#d44a1a]/20"
              />
            </Field>

            <Field label={t.fields.email} error={fieldError("email")}>
              <input
                {...register("email")}
                type="email"
                placeholder={t.placeholders.email}
                className="w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-sm focus:border-[#d44a1a] focus:outline-none focus:ring-2 focus:ring-[#d44a1a]/20"
              />
            </Field>

            <Field label={t.fields.brand} error={fieldError("machineBrand")}>
              <input
                {...register("machineBrand", { required: true })}
                type="text"
                placeholder={t.placeholders.brand}
                className="w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-sm focus:border-[#d44a1a] focus:outline-none focus:ring-2 focus:ring-[#d44a1a]/20"
              />
            </Field>

            <Field label={t.fields.model} error={fieldError("machineModel")}>
              <input
                {...register("machineModel")}
                type="text"
                placeholder={t.placeholders.model}
                className="w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-sm focus:border-[#d44a1a] focus:outline-none focus:ring-2 focus:ring-[#d44a1a]/20"
              />
            </Field>

            <Field label={t.fields.issue} error={fieldError("issueDescription")}>
              <textarea
                {...register("issueDescription", { required: true })}
                rows={4}
                placeholder={t.placeholders.issue}
                className="w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-sm focus:border-[#d44a1a] focus:outline-none focus:ring-2 focus:ring-[#d44a1a]/20"
              />
            </Field>

            <Field label={t.fields.location} error={fieldError("locationDetails")}>
              <input
                {...register("locationDetails")}
                type="text"
                placeholder={t.placeholders.location}
                className="w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-sm focus:border-[#d44a1a] focus:outline-none focus:ring-2 focus:ring-[#d44a1a]/20"
              />
            </Field>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label={t.fields.date} error={fieldError("preferredDate")}>
                <input
                  {...register("preferredDate")}
                  type="date"
                  className="w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-sm focus:border-[#d44a1a] focus:outline-none focus:ring-2 focus:ring-[#d44a1a]/20"
                />
              </Field>
              <Field label={t.fields.time} error={fieldError("preferredTime")}>
                <input
                  {...register("preferredTime")}
                  type="time"
                  className="w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-sm focus:border-[#d44a1a] focus:outline-none focus:ring-2 focus:ring-[#d44a1a]/20"
                />
              </Field>
            </div>

            <Field label={t.fields.notes} error={fieldError("notes")}>
              <textarea
                {...register("notes")}
                rows={2}
                placeholder={t.placeholders.notes}
                className="w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-sm focus:border-[#d44a1a] focus:outline-none focus:ring-2 focus:ring-[#d44a1a]/20"
              />
            </Field>

            <button
              type="submit"
              disabled={isPending}
              className="w-full rounded-full bg-black px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#d44a1a] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isPending ? t.submitting : t.submit}
            </button>
          </form>
        </section>

        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={() => setLanguage(isArabic ? "en" : "ar")}
            className="rounded-full border border-black/20 px-3 py-1.5 text-xs font-semibold tracking-wide transition hover:border-black"
          >
            {isArabic ? "EN" : "AR"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-black/80">{label}</label>
      {children}
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
