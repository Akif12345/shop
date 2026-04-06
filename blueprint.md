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

### 15.1 Completed — All MVP Items ✅
- **Homepage (`/`)**: Full landing page with hero section, trust badges, services cards, process steps, CTA block, footer. Bilingual (EN/AR) with manual language toggle. Admin link in header nav. Mobile hamburger menu.
- **Booking Hub (`/book`)**: Card grid with links to all 4 booking types. Bilingual (EN/AR).
- **Pickup form** (`/book/pickup`): Full form — name, phone, email, machine brand/model, issue description, pickup address, preferred date/time, notes. Zod validation. Supabase submission.
- **Repair form** (`/book/repair`): Full form — name, phone, email, machine brand/model (model optional), issue description, optional location/date/time, notes.
- **Belt order form** (`/book/belt-order`): Full form — name, phone, email, machine brand/model, belt size (optional), quantity, delivery address, notes.
- **Setup form** (`/book/setup`): Full form — name, phone, email, location type selector (gym/home/other), installation address, machine brand/model (optional), machine details, preferred date/time, notes.
- **All forms**: Bilingual (EN/AR), Zod validation with inline error display, loading state during submission, success/error feedback, auto-reset on success.
- **Supabase DB**: `service_requests` table with enums (`request_type`, `request_status`), indexes, RLS, auto `updated_at` trigger. Schema applied to live project.
- **Admin dashboard** (`/admin`): Filterable table of all requests by status and type. Detail modal with full request info. One-click status updates. Bilingual (EN/AR). Protected by Supabase Auth.
- **Admin login** (`/admin/login`): Email/password login with Supabase Auth. Middleware-based route protection.
- **Email notifications**: Resend integration — every form submission sends a formatted HTML email to `shadowviners@gmail.com` with request details and dashboard link.
- **Arabic font**: Noto Sans Arabic loaded via `next/font` for proper RTL rendering.
- **Error/loading/not-found pages**: Branded 404 page, error boundary with reset, animated loading spinner.
- **Mobile menu**: Hamburger menu with Services, Process, Contact, Admin links on mobile.
- **Deployed**: Live on Vercel at `https://shop-indol-five-88.vercel.app/`. All 5 environment variables configured.
- **City**: Changed from Riyadh to Dammam across all text (EN + AR).

### 15.2 Remaining — Nice-to-Have
- **Shared components**: Header, footer, language toggle, cards could be extracted into reusable components.
- **Dark mode**: CSS variables defined but not wired to components.
- **Cloudflare Turnstile**: Form spam protection (only matters if spam actually comes in).
- **Image upload**: For customers to attach photos of their machine issues.

### 15.3 Branch Info
- Active working branch: `working` (merged to `master` for deployment)
- All development should happen on `working` branch.

## 16) Next Step
MVP is complete and deployed. Next steps could include: analytics setup, domain configuration, image uploads, or iterating based on real user feedback.
