"use server";

import { z } from "zod";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Resend } from "resend";

// ──────────────────────────────────────────────
// Zod schemas for each request type
// ──────────────────────────────────────────────

const baseSchema = z.object({
  customerName: z.string().min(1, "Name is required."),
  phone: z.string().min(7, "Phone number must be at least 7 digits."),
  email: z.string().email().or(z.literal("")).optional(),
  notes: z.string().optional(),
});

const pickupSchema = baseSchema.extend({
  requestType: z.literal("pickup"),
  machineBrand: z.string().min(1, "Machine brand is required."),
  machineModel: z.string().min(1, "Machine model is required."),
  issueDescription: z.string().min(10, "Please describe the issue (at least 10 characters)."),
  locationDetails: z.string().min(1, "Pickup address is required."),
  preferredDate: z.string().min(1, "Preferred date is required."),
  preferredTime: z.string().min(1, "Preferred time is required."),
});

const repairSchema = baseSchema.extend({
  requestType: z.literal("repair"),
  machineBrand: z.string().min(1, "Machine brand is required."),
  machineModel: z.string().optional(),
  issueDescription: z.string().min(10, "Please describe the issue (at least 10 characters)."),
  locationDetails: z.string().optional(),
  preferredDate: z.string().optional(),
  preferredTime: z.string().optional(),
});

const beltOrderSchema = baseSchema.extend({
  requestType: z.literal("belt_order"),
  machineBrand: z.string().min(1, "Machine brand is required."),
  machineModel: z.string().min(1, "Machine model is required."),
  beltSize: z.string().optional(),
  quantity: z.coerce.number().min(1, "Quantity must be at least 1."),
  issueDescription: z.string().optional(),
  locationDetails: z.string().min(1, "Delivery address is required."),
  preferredDate: z.string().optional(),
  preferredTime: z.string().optional(),
});

const setupSchema = baseSchema.extend({
  requestType: z.literal("setup"),
  machineBrand: z.string().optional(),
  machineModel: z.string().optional(),
  issueDescription: z.string().optional(),
  locationDetails: z.string().min(1, "Installation address is required."),
  preferredDate: z.string().min(1, "Preferred date is required."),
  preferredTime: z.string().optional(),
});

export type PickupFormData = z.infer<typeof pickupSchema>;
export type RepairFormData = z.infer<typeof repairSchema>;
export type BeltOrderFormData = z.infer<typeof beltOrderSchema>;
export type SetupFormData = z.infer<typeof setupSchema>;

const schemas = {
  pickup: pickupSchema,
  repair: repairSchema,
  belt_order: beltOrderSchema,
  setup: setupSchema,
} as const;

type RequestType = keyof typeof schemas;

export type SubmitResult =
  | { success: true; message: string }
  | { success: false; error: string; fieldErrors?: Record<string, string> };

export async function submitServiceRequest(
  requestType: RequestType,
  raw: Record<string, unknown>
): Promise<SubmitResult> {
  const schema = schemas[requestType];

  const parseResult = schema.safeParse(raw);
  if (!parseResult.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parseResult.error.issues) {
      const key = issue.path[0] as string;
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { success: false, error: "Please fix the errors below.", fieldErrors };
  }

  const data = parseResult.data;

  const admin = createSupabaseAdminClient();

  const { error } = await admin.from("service_requests").insert({
    request_type: data.requestType,
    customer_name: data.customerName,
    phone: data.phone,
    email: data.email || null,
    machine_brand: data.machineBrand || null,
    machine_model: data.machineModel || null,
    belt_size: (data as any).beltSize || null,
    quantity: (data as any).quantity || null,
    issue_description: data.issueDescription || null,
    location_details: data.locationDetails || null,
    preferred_date: data.preferredDate || null,
    preferred_time: data.preferredTime || null,
    notes: data.notes || null,
  });

  if (error) {
    console.error("Supabase insert error:", error);
    return { success: false, error: "Failed to submit. Please try again later." };
  }

  // Fire-and-forget email notification (don't block response)
  sendNotificationEmail({
    requestType: data.requestType,
    customerName: data.customerName,
    phone: data.phone,
    email: data.email,
    machineBrand: (data as any).machineBrand,
    machineModel: (data as any).machineModel,
    issueDescription: (data as any).issueDescription,
    locationDetails: (data as any).locationDetails,
    preferredDate: (data as any).preferredDate,
    preferredTime: (data as any).preferredTime,
  }).catch((e) => console.error("Email notification failed:", e));

  return { success: true, message: "Request submitted successfully! We will contact you soon." };
}

// ──────────────────────────────────────────────
// Email notifications
// ──────────────────────────────────────────────

function sendNotificationEmail(data: {
  requestType: string;
  customerName: string;
  phone: string;
  email: string | undefined;
  machineBrand: string | undefined;
  machineModel: string | undefined;
  issueDescription: string | undefined;
  locationDetails: string | undefined;
  preferredDate: string | undefined;
  preferredTime: string | undefined;
}) {
  const resendKey = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFY_EMAIL;

  // Skip if email is not configured
  if (!resendKey || !to || resendKey.startsWith("re_plchldgr") || to.includes("placeholder")) {
    return Promise.resolve();
  }

  const resend = new Resend(resendKey);

  const typeLabels: Record<string, string> = {
    pickup: "Machine Pickup",
    repair: "Repair",
    belt_order: "Belt Order",
    setup: "Setup / Installation",
  };

  const rows = [
    ["Customer", data.customerName],
    ["Phone", data.phone],
    ["Email", data.email || "—"],
    ["Machine", `${data.machineBrand || ""} ${data.machineModel || ""}`.trim() || "—"],
    ["Issue / Details", data.issueDescription || "—"],
    ["Location", data.locationDetails || "—"],
    ["Preferred Date", data.preferredDate || "—"],
    ["Preferred Time", data.preferredTime || "—"],
  ];

  const html = `
    <h2 style="margin:0 0 16px;font-family:sans-serif;">New ${typeLabels[data.requestType] ?? data.requestType} Request</h2>
    <table style="border-collapse:collapse;font-family:sans-serif;font-size:14px;">
      ${rows.map(([label, val]) => `
        <tr>
          <td style="padding:6px 16px 6px 0;font-weight:600;color:#555;border-bottom:1px solid #eee;">${label}</td>
          <td style="padding:6px 0;border-bottom:1px solid #eee;">${val}</td>
        </tr>
      `).join("")}
    </table>
    <p style="margin-top:24px;font-family:sans-serif;font-size:12px;color:#999;">
      View in dashboard: <a href="${process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}/admin` : "http://localhost:3000/admin"}">Admin Dashboard</a>
    </p>
  `;

  return resend.emails.send({
    from: "Dammam FitFix <onboarding@resend.dev>",
    to: [to],
    subject: `New ${typeLabels[data.requestType] ?? data.requestType} Request — ${data.customerName}`,
    html,
  });
}

// ──────────────────────────────────────────────
// Admin actions
// ──────────────────────────────────────────────

export type ServiceRequestRecord = {
  id: string;
  request_type: string;
  status: string;
  customer_name: string;
  phone: string;
  email: string | null;
  machine_brand: string | null;
  machine_model: string | null;
  belt_size: string | null;
  quantity: number | null;
  issue_description: string | null;
  location_details: string | null;
  preferred_date: string | null;
  preferred_time: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export async function fetchServiceRequests(options?: {
  statusFilter?: string;
  typeFilter?: string;
}): Promise<ServiceRequestRecord[]> {
  const admin = createSupabaseAdminClient();

  let query = admin
    .from("service_requests")
    .select("*")
    .order("created_at", { ascending: false });

  if (options?.statusFilter && options.statusFilter !== "all") {
    query = query.eq("status", options.statusFilter);
  }
  if (options?.typeFilter && options.typeFilter !== "all") {
    query = query.eq("request_type", options.typeFilter);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Failed to fetch service requests:", error);
    return [];
  }

  return (data as ServiceRequestRecord[]) || [];
}

export async function updateRequestStatus(
  requestId: string,
  newStatus: string
): Promise<{ success: boolean; error?: string }> {
  const admin = createSupabaseAdminClient();

  const { error } = await admin
    .from("service_requests")
    .update({ status: newStatus })
    .eq("id", requestId);

  if (error) {
    console.error("Failed to update status:", error);
    return { success: false, error: "Failed to update status." };
  }

  return { success: true };
}

// ──────────────────────────────────────────────
// Auth actions
// ──────────────────────────────────────────────

export async function signIn(formData: FormData): Promise<void> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return;
  }

  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return;
  }

  revalidatePath("/admin");
  redirect("/admin");
}

export async function signOut() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
