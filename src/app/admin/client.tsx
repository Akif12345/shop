"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import type { ServiceRequestRecord } from "@/app/actions";
import { fetchServiceRequests, updateRequestStatus, signOut } from "@/app/actions";

type Language = "en" | "ar";

const copy = {
  en: {
    title: "Admin Dashboard",
    subtitle: "View and manage all service requests.",
    userEmail: "Logged in as",
    signOut: "Sign Out",
    all: "All",
    new: "New",
    contacted: "Contacted",
    scheduled: "Scheduled",
    completed: "Completed",
    cancelled: "Cancelled",
    allTypes: "All Types",
    pickup: "Pickup",
    repair: "Repair",
    beltOrder: "Belt Order",
    setup: "Setup",
    noRequests: "No requests found.",
    columns: {
      date: "Date",
      type: "Type",
      customer: "Customer",
      phone: "Phone",
      machine: "Machine",
      details: "Details",
      status: "Status",
    },
    viewDetails: "View",
    close: "Close",
    updateStatus: "Update Status",
  },
  ar: {
    title: "لوحة التحكم",
    subtitle: "عرض وإدارة جميع الطلبات.",
    userEmail: "مسجل الدخول",
    signOut: "تسجيل الخروج",
    all: "الكل",
    new: "جديد",
    contacted: "تم التواصل",
    scheduled: "مجدول",
    completed: "مكتمل",
    cancelled: "ملغي",
    allTypes: "جميع الأنواع",
    pickup: "استلام",
    repair: "صيانة",
    beltOrder: "طلب حزام",
    setup: "تركيب",
    noRequests: "لا توجد طلبات.",
    columns: {
      date: "التاريخ",
      type: "النوع",
      customer: "العميل",
      phone: "الجوال",
      machine: "الجهاز",
      details: "التفاصيل",
      status: "الحالة",
    },
    viewDetails: "عرض",
    close: "إغلاق",
    updateStatus: "تحديث الحالة",
  },
} as const;

const STATUS_OPTIONS = ["new", "contacted", "scheduled", "completed", "cancelled"] as const;

const typeLabels: Record<string, { en: string; ar: string }> = {
  pickup: { en: "Pickup", ar: "استلام" },
  repair: { en: "Repair", ar: "صيانة" },
  belt_order: { en: "Belt Order", ar: "طلب حزام" },
  setup: { en: "Setup", ar: "تركيب" },
};

const statusColors: Record<string, string> = {
  new: "bg-blue-100 text-blue-800",
  contacted: "bg-yellow-100 text-yellow-800",
  scheduled: "bg-purple-100 text-purple-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

export function AdminDashboardClient({ userEmail }: { userEmail: string }) {
  const [language, setLanguage] = useState<Language>("en");
  const isArabic = language === "ar";
  const [requests, setRequests] = useState<ServiceRequestRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [selectedRequest, setSelectedRequest] = useState<ServiceRequestRecord | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = isArabic ? "rtl" : "ltr";
  }, [isArabic, language]);

  const t = useMemo(() => copy[language], [language]);

  const loadRequests = () => {
    setLoading(true);
    const opts: { statusFilter?: string; typeFilter?: string } = {};
    if (statusFilter !== "all") opts.statusFilter = statusFilter;
    if (typeFilter !== "all") opts.typeFilter = typeFilter;
    fetchServiceRequests(opts).then((data) => {
      setRequests(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    loadRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter, typeFilter]);

  const handleStatusChange = (id: string, newStatus: string) => {
    startTransition(async () => {
      await updateRequestStatus(id, newStatus);
      loadRequests();
      if (selectedRequest?.id === id) {
        setSelectedRequest((prev) => (prev ? { ...prev, status: newStatus } : null));
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#f5f3ef] px-4 py-8 text-[#111] sm:px-6 sm:py-10">
      <div className="mx-auto w-full max-w-7xl">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-black tracking-tight sm:text-3xl">{t.title}</h1>
            <p className="mt-1 text-xs text-black/50">
              {t.userEmail}: {userEmail}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <form action={signOut}>
              <button
                type="submit"
                className="rounded-full border border-black/20 px-3 py-1.5 text-xs font-semibold transition hover:border-red-500 hover:text-red-500"
              >
                {t.signOut}
              </button>
            </form>
            <button
              onClick={() => setLanguage(isArabic ? "en" : "ar")}
              className="rounded-full border border-black/20 px-3 py-1.5 text-xs font-semibold tracking-wide transition hover:border-black"
            >
              {isArabic ? "EN" : "AR"}
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="mt-6 flex flex-wrap gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl border border-black/15 bg-white px-3 py-2 text-sm"
          >
            <option value="all">{t.all}</option>
            <option value="new">{t.new}</option>
            <option value="contacted">{t.contacted}</option>
            <option value="scheduled">{t.scheduled}</option>
            <option value="completed">{t.completed}</option>
            <option value="cancelled">{t.cancelled}</option>
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="rounded-xl border border-black/15 bg-white px-3 py-2 text-sm"
          >
            <option value="all">{t.allTypes}</option>
            <option value="pickup">{t.pickup}</option>
            <option value="repair">{t.repair}</option>
            <option value="belt_order">{t.beltOrder}</option>
            <option value="setup">{t.setup}</option>
          </select>
        </div>

        {/* Table */}
        <div className="mt-6 overflow-x-auto rounded-2xl border border-black/10 bg-white shadow-sm">
          {loading ? (
            <div className="p-12 text-center text-sm text-black/50">Loading...</div>
          ) : requests.length === 0 ? (
            <div className="p-12 text-center text-sm text-black/50">{t.noRequests}</div>
          ) : (
            <table className="w-full min-w-[800px] text-sm">
              <thead className="border-b border-black/10 bg-[#faf9f7]">
                <tr>
                  {[
                    t.columns.date,
                    t.columns.type,
                    t.columns.customer,
                    t.columns.phone,
                    t.columns.machine,
                    t.columns.status,
                  ].map((h) => (
                    <th key={h} className="px-4 py-3 text-start font-semibold text-black/70">
                      {h}
                    </th>
                  ))}
                  <th className="px-4 py-3 text-start font-semibold text-black/70">{t.columns.details}</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((req) => (
                  <tr key={req.id} className="border-b border-black/5 transition hover:bg-[#fdfcfa]">
                    <td className="px-4 py-3 whitespace-nowrap">
                      {new Date(req.created_at).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs font-medium">{typeLabels[req.request_type]?.[isArabic ? "ar" : "en"] ?? req.request_type}</span>
                    </td>
                    <td className="px-4 py-3 font-medium">{req.customer_name}</td>
                    <td className="px-4 py-3">{req.phone}</td>
                    <td className="px-4 py-3">
                      {req.machine_brand}
                      {req.machine_model ? ` ${req.machine_model}` : ""}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[req.status] ?? "bg-gray-100 text-gray-800"}`}>
                        {req.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => setSelectedRequest(req)}
                        className="rounded-full border border-black/20 px-3 py-1 text-xs font-medium transition hover:bg-black hover:text-white"
                      >
                        {t.viewDetails}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Detail Modal */}
        {selectedRequest && (
          <DetailModal
            req={selectedRequest}
            isArabic={isArabic}
            t={t}
            onClose={() => setSelectedRequest(null)}
            onStatusChange={handleStatusChange}
            isPending={isPending}
          />
        )}
      </div>
    </div>
  );
}

function DetailModal({
  req,
  isArabic,
  t,
  onClose,
  onStatusChange,
  isPending,
}: {
  req: ServiceRequestRecord;
  isArabic: boolean;
  t: (typeof copy)["en"] | (typeof copy)["ar"];
  onClose: () => void;
  onStatusChange: (id: string, status: string) => void;
  isPending: boolean;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">{req.customer_name}</h2>
          <button
            onClick={onClose}
            className="rounded-full p-1 text-black/50 transition hover:bg-black/5 hover:text-black"
          >
            ✕
          </button>
        </div>

        <div className="mt-4 space-y-3 text-sm">
          <DetailRow label="Type" value={typeLabels[req.request_type]?.[isArabic ? "ar" : "en"] ?? req.request_type} />
          <DetailRow label="Phone" value={req.phone} />
          <DetailRow label="Email" value={req.email || "—"} />
          <DetailRow label="Machine" value={`${req.machine_brand || ""} ${req.machine_model || ""}`.trim() || "—"} />
          {req.belt_size && <DetailRow label="Belt Size" value={req.belt_size} />}
          {req.quantity && <DetailRow label="Quantity" value={String(req.quantity)} />}
          {req.issue_description && <DetailRow label="Issue / Details" value={req.issue_description} />}
          {req.location_details && <DetailRow label="Location" value={req.location_details} />}
          {req.preferred_date && <DetailRow label="Preferred Date" value={req.preferred_date} />}
          {req.preferred_time && <DetailRow label="Preferred Time" value={req.preferred_time} />}
          {req.notes && <DetailRow label="Notes" value={req.notes} />}
          <DetailRow label="Submitted" value={new Date(req.created_at).toLocaleString()} />
        </div>

        {/* Status Update */}
        <div className="mt-5 border-t border-black/10 pt-4">
          <label className="mb-2 block text-xs font-semibold text-black/70">{t.updateStatus}</label>
          <div className="flex flex-wrap gap-2">
            {STATUS_OPTIONS.map((s) => (
              <button
                key={s}
                disabled={isPending || req.status === s}
                onClick={() => onStatusChange(req.id, s)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                  req.status === s
                    ? `${statusColors[s]} ring-2 ring-offset-1 ring-black/20`
                    : "border border-black/15 bg-white hover:bg-black/5"
                } disabled:opacity-50`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="text-xs font-medium text-black/50">{label}:</span>{" "}
      <span className="text-black/90">{value}</span>
    </div>
  );
}
