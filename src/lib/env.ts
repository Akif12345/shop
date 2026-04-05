import { z } from "zod";

const publicEnvSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z
    .string()
    .url("NEXT_PUBLIC_SUPABASE_URL must be a valid URL."),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z
    .string()
    .min(1, "NEXT_PUBLIC_SUPABASE_ANON_KEY is required."),
});

const serviceRoleSchema = z.object({
  SUPABASE_SERVICE_ROLE_KEY: z
    .string()
    .min(1, "SUPABASE_SERVICE_ROLE_KEY is required."),
});

export function getPublicEnv() {
  return publicEnvSchema.parse({
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  });
}

export function getServiceRoleKey() {
  return serviceRoleSchema.parse({
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
  }).SUPABASE_SERVICE_ROLE_KEY;
}

export function getResendKey() {
  const key = process.env.RESEND_API_KEY;
  if (!key || key === "placeholder") throw new Error("RESEND_API_KEY is not configured.");
  return key;
}

export function getNotifyEmail() {
  const email = process.env.NOTIFY_EMAIL;
  if (!email || email === "placeholder") throw new Error("NOTIFY_EMAIL is not configured.");
  return email;
}
