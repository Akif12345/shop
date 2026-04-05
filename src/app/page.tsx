import { createSupabaseServerClient } from "@/lib/supabase/server";
import { HomePageClient } from "./client";

export default async function Home() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <HomePageClient isAdmin={!!user} />;
}
