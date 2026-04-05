# Workshop web app setup (Next.js + Supabase)
This project is prepared for a Dammam workshop website with bilingual support, booking/order forms, and Supabase-backed request storage.

## Getting started
Install dependencies:
```bash
npm install
```

Create local environment file:
```bash
cp .env.example .env.local
```

Fill in:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

Run the app:
```bash
npm run dev
```

## Database setup (Supabase)
1. Create a free Supabase project.
2. Open SQL Editor.
3. Run `supabase/schema.sql`.
4. Confirm `service_requests` table exists.

## Important project paths
- `src/lib/supabase/browser.ts`: browser client.
- `src/lib/supabase/server.ts`: server client for App Router.
- `src/lib/supabase/admin.ts`: service-role admin client (server-only).
- `supabase/schema.sql`: request table schema and security baseline.

## Mobile-first requirement
- Build and test every page for small screens first (320px–430px range).
- Keep touch targets comfortably tappable.
- Prevent horizontal overflow in all sections.
- Verify forms are easy to use with on-screen keyboard.

## Next implementation step
Integrate your selected frontend UI into `src/app/page.tsx` (or split into components) and connect booking/order forms to `service_requests`.
