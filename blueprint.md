# Workshop Website Blueprint
This document is the base reference for product scope, features, and development decisions for the Riyadh-based workshop website.

## 1) Business Overview
The business is a workshop in Riyadh, Saudi Arabia focused on gym equipment support, mainly treadmill repair.
The workshop also sells treadmill belts for different machine models and provides machine setup/installation services for gyms and other locations.
The website should clearly present services and allow users to request and book these services online.

## 2) Core Services to Offer on Website
### 2.1 Repair Services
- Treadmill diagnostics and repair.
- General gym machine servicing (as supported by workshop).
- Pickup request for machines that need workshop repair.

### 2.2 Treadmill Belt Sales
- Sell belts for different treadmill brands/models.
- Let customer submit machine details to find compatible belt.
- Order placement with contact and delivery details.

### 2.3 Machine Setup / Installation
- On-site setup for new or relocated machines.
- Suitable for gyms, homes, and other required locations.
- Booking request with date/time preference and location details.

## 3) Product Vision
Build a trustworthy, conversion-focused service website that helps users in Riyadh quickly:
1. understand available workshop services,
2. book pickup/repair/setup slots,
3. order treadmill belts with confidence.

## 4) Target Users
- Gym owners/managers in Riyadh.
- Home users with treadmills.
- Fitness facilities needing installation/setup support.

## 5) Main User Actions (Must Support)
### 5.1 Book a Slot for Machine Pickup
- User provides machine type, issue summary, preferred slot, pickup address, and contact details.

### 5.2 Request Repair Service
- User describes fault and submits service request.
- Can be linked to pickup booking or on-site visit (depending on workflow).

### 5.3 Order Treadmill Belt
- User selects/requests belt by machine model.
- User submits quantity, delivery location, and phone/email.

### 5.4 Book Manual Setup / Installation
- User provides machine details, location type (gym/home/other), and preferred schedule.

## 6) Website Structure (Initial)
- Home
- Services
  - Repair Services
  - Belt Sales
  - Setup & Installation
- Book Service (single booking/request hub)
- Belt Order Page
- About Workshop
- Contact

## 7) MVP Functional Requirements
### 7.1 Informational Requirements
- Clearly explain each service and service area (Riyadh).
- Show workshop credibility points (experience, response time, support type).

### 7.2 Booking & Ordering Requirements
- Form for pickup slot booking.
- Form for repair request.
- Form for belt order request.
- Form for setup/installation booking.
- Basic validation (required fields, contact format, preferred date/time).

### 7.3 Admin/Operations Requirements (Basic MCP)
- Receive all requests in one manageable backend inbox (email/dashboard/table).
- Track request type: pickup, repair, belt order, setup.
- Mark request status (new, contacted, scheduled, completed, cancelled).

## 8) Key Data to Capture per Request
- Customer full name.
- Phone number (mandatory).
- Optional email.
- Service type.
- Machine brand/model.
- Problem or requirement description.
- Address/location details (when needed).
- Preferred date/time slot.
- Notes for technician/sales team.

## 9) Content & Messaging Priorities
- Fast and clear booking flow.
- Trust-oriented messaging (professional service, genuine fitting support for belts).
- Riyadh-focused service clarity.
- Clear call-to-action buttons on each page.

## 10) Non-Functional Essentials for MVP
- Mobile-first responsive layout.
- Bilingual support at launch (Arabic and English) with language switch option.
- Arabic-first UX quality: correct RTL layout, readable typography, and localized service text.
- Fast-loading pages.
- Secure handling of customer contact/request data.

## 10.1) Non-Negotiable Product Rules
- The website experience must prioritize mobile usage first, since most customers will book/order from mobile.
- Every page and form must remain clearly readable and easy to use on small screens (no cramped layouts, no hard-to-tap controls).
- Arabic users are a primary audience, so language switching (Arabic/English) must be available across the site.
- Language switching must feel smooth and visually consistent, without breaking layout, spacing, typography, or component alignment.
- Arabic mode must be fully RTL-correct and polished on mobile and desktop.

## 11) Out of Scope for Initial MVP
- Full e-commerce checkout/payment gateway.
- Live technician tracking.
- Complex inventory automation.
- Multi-city operations outside Riyadh.

## 12) Milestones (Draft)
### Milestone 1: Foundation
- Finalize scope, pages, and forms.
- Confirm brand/content direction.

### Milestone 2: Build MVP
- Develop website pages.
- Implement booking/order request forms.
- Connect request capture to admin workflow.

### Milestone 3: Validate & Launch
- Test forms and mobile usability.
- Soft launch with real requests.
- Improve flow based on first user feedback.

## 13) Tech Stack & Hosting Plan (MVP - Free First)
### 13.1 Core Web Stack
- Framework: Next.js (TypeScript).
- Styling/UI: Tailwind CSS + shadcn/ui.
- Why: One codebase for website pages plus API routes for forms.

### 13.2 Hosting & Deployment
- Hosting platform: Vercel (Hobby/free tier).
- Repository integration: GitHub -> automatic deploy on push.
- Why: Fast deployment, HTTPS by default, easy rollback.

### 13.3 Data & Request Management
- Database: Supabase Postgres (free tier).
- Tables: pickup bookings, repair requests, belt orders, setup requests.
- Status tracking fields: new, contacted, scheduled, completed, cancelled.

### 13.4 Admin Access
- Auth option: Supabase Auth for workshop admin login.
- Initial admin panel scope: list/filter requests, update status, view contact details.

### 13.5 Notifications & Anti-Spam
- Email notifications: Resend or Brevo free tier (new request alerts).
- Form protection: Cloudflare Turnstile (free).

### 13.6 Analytics
- Basic traffic analytics: Cloudflare Web Analytics (free).
- KPI examples: page visits, form submissions, service-page conversion.

### 13.7 Scaling Path (Later)
- Keep architecture compatible with paid upgrades on Vercel/Supabase.
- Move to higher plans only when request volume/performance requires it.
- Avoid early lock-in to expensive infrastructure.

## 14) Open Questions for Next Refinements
- Should pickup and on-site visit be separate booking types in UI?
- How will belt compatibility be validated (manual review vs model database)?
- Which channel should receive requests first (email, WhatsApp, internal dashboard)?
- What exact service hours and slot durations will be offered?

## 15) Development Status (Updated 5 April 2026)

### 15.1 Completed
- **Homepage (`/`)**: Full landing page with hero section, trust badges, services cards, process steps, CTA block, footer. Bilingual (EN/AR) with manual language toggle.
- **Booking Hub (`/book`)**: Card grid with links to all 4 booking types. Bilingual (EN/AR).
- **Booking Sub-pages (placeholders)**: All 4 routes created as stubs — `/book/pickup`, `/book/repair`, `/book/belt-order`, `/book/setup`. Each has title, description, and "coming soon" placeholder. Ready for form implementation.
- **Supabase clients wired**: 3 clients created (`server.ts`, `browser.ts`, `admin.ts`) with Zod-validated env access.
- **Environment file**: `.env.local` created with placeholder Supabase credentials. Real values needed before DB integration.
- **Build passes**: All 7 routes compile and render as static pages. Dev server runs on `localhost:3000`.

### 15.2 Pending — Frontend
- **Shared components**: Header, footer, language toggle, cards, etc. should be extracted into reusable components.
- **Arabic font**: Currently falls back to browser default. Needs an Arabic-supporting font (e.g. Noto Sans Arabic).
- **RTL polish**: Ensure proper RTL layout, text alignment, and spacing in Arabic mode.
- **Dark mode**: CSS variables defined in `globals.css` but not wired to actual page components.
- **Error / loading / not-found pages**: None exist yet.

### 15.3 Completed (Updated 5 April 2026)
- **Server actions**: `src/app/actions.ts` handles submission, fetching, and status updates for all request types.
- **Pickup form** (`/book/pickup`): Full form — name, phone, email, machine brand/model, issue description, pickup address, preferred date/time, notes. Validates and submits to `service_requests`.
- **Repair form** (`/book/repair`): Full form — name, phone, email, machine brand/model (model optional), issue description, optional location/date/time, notes.
- **Belt order form** (`/book/belt-order`): Full form — name, phone, email, machine brand/model, belt size (optional), quantity, delivery address, notes.
- **Setup form** (`/book/setup`): Full form — name, phone, email, location type selector (gym/home/other), installation address, machine brand/model (optional), machine details, preferred date/time, notes.
- **All forms**: Bilingual (EN/AR), Zod validation with inline error display, loading state during submission, success/error feedback, auto-reset on success.
- **Admin dashboard** (`/admin`): Filterable table of all requests by status and type. Detail modal with full request info. One-click status updates (new → contacted → scheduled → completed → cancelled). Bilingual (EN/AR).

### 15.4 Remaining — Backend & Database
- **Database schema**: Applied to live Supabase project ✅ (ran successfully).
- **Auth**: Supabase Auth for admin login not yet set up.
- **Admin panel**: Not yet built. Planned scope: list/filter requests, update status, view contact details.
- **Notifications**: Email alerts (Resend/Brevo) and form spam protection (Cloudflare Turnstile) not yet integrated.

### 15.5 Branch Info
- Active working branch: `working`
- All development should happen on this branch.

## 16) Next Step
Build the admin dashboard to view/manage incoming service requests. Then add auth protection and notifications.
