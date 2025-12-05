# Form Infrastructure Design

**Date:** 2025-12-05
**Status:** Approved
**Goal:** Replace Tally.so embedded forms with a custom solution providing full control over styling, data handling, and submission workflow.

---

## Overview

Build a reusable form infrastructure for Mockingbird Arts using:
- **Frontend:** React Hook Form for validation and submission
- **Backend:** Cloudflare Worker (separate repository)
- **Email:** Resend for transactional emails
- **Storage:** Google Sheets via REST API
- **Newsletter:** Resend Audiences for subscriber management
- **Spam protection:** Honeypot fields + Cloudflare Turnstile (invisible mode)

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│  FRONTEND (React + React Hook Form)                         │
│  - Form components with validation                          │
│  - Honeypot field (hidden)                                  │
│  - Turnstile widget (invisible mode)                        │
└─────────────────────┬───────────────────────────────────────┘
                      │ POST /api/submit
                      ▼
┌─────────────────────────────────────────────────────────────┐
│  CLOUDFLARE WORKER                                          │
│  - Validate Turnstile token                                 │
│  - Check honeypot                                           │
│  - Route by form type (contact vs newsletter)               │
│  - Send emails via Resend                                   │
│  - Log to Google Sheets                                     │
│  - Manage newsletter confirmations                          │
└─────────────────────────────────────────────────────────────┘
                      │
       ┌──────────────┼──────────────┐
       ▼              ▼              ▼
   [Resend]    [Google Sheets]  [Resend Audiences]
```

---

## Forms

### Contact Form
**Fields:** name, email, message

**Submission flow:**
1. User submits form
2. Worker validates (Turnstile + honeypot)
3. Send notification email to Mockingbird team
4. Send confirmation email to submitter
5. Log submission to Google Sheets
6. Return success response

### Newsletter Signup
**Fields:** email

**Submission flow (double opt-in):**
1. User submits email
2. Worker validates (Turnstile + honeypot)
3. Generate unique confirmation token
4. Store pending subscription in Google Sheets (status: pending)
5. Send confirmation email with link
6. Return success: "Check your email to confirm"

**Confirmation flow:**
1. User clicks confirmation link
2. Worker looks up token, verifies not expired (48h limit)
3. Update status to "confirmed" in Sheets
4. Add contact to Resend Audience
5. Redirect to thank-you page

---

## Worker Project Structure

Separate repository: `mockingbird-worker/`

```
mockingbird-worker/
├── src/
│   ├── index.ts              # Router, entry point
│   ├── handlers/
│   │   ├── contact.ts        # Contact form handler
│   │   └── newsletter.ts     # Subscribe + confirm handlers
│   ├── services/
│   │   ├── resend.ts         # Email sending
│   │   ├── sheets.ts         # Google Sheets REST API
│   │   └── turnstile.ts      # Token verification
│   ├── emails/
│   │   ├── contact-notification.tsx
│   │   ├── contact-confirmation.tsx
│   │   └── newsletter-confirm.tsx
│   └── utils/
│       └── spam.ts           # Honeypot check
├── wrangler.toml
└── package.json
```

**Endpoints:**
- `POST /contact` - Contact form submissions
- `POST /newsletter/subscribe` - Newsletter signup
- `GET /newsletter/confirm/:token` - Confirmation link handler

---

## Google Sheets Structure

**Spreadsheet:** Mockingbird Forms

| Sheet | Columns |
|-------|---------|
| Contact Submissions | timestamp, name, email, message, status |
| Newsletter Subscribers | timestamp, email, token, status, confirmed_at |

**Status values:**
- Contact: `new`, `responded`, `archived`
- Newsletter: `pending`, `confirmed`, `unsubscribed`

---

## Spam Protection

**Layer 1: Honeypot**
- Hidden field via CSS (not `type="hidden"`)
- Bots fill it, humans don't
- If filled, return 200 OK silently (don't tip off bots)

**Layer 2: Cloudflare Turnstile**
- Invisible mode (only challenges suspicious requests)
- Worker verifies token with Cloudflare API
- If invalid, return 403

**Layer 3: Rate limiting (optional)**
- Configure in Cloudflare dashboard
- Example: max 5 submissions per IP per minute

---

## Email Templates

**Contact notification (to team):**
- Subject: "New contact from {name}"
- Body: name, email, message, link to Google Sheets

**Contact confirmation (to sender):**
- Subject: "We got your message"
- Body: Thanks, we'll get back to you soon

**Newsletter confirmation:**
- Subject: "Confirm your subscription"
- Body: Confirmation link, 48h expiry notice

---

## Environment Secrets

Configured in Cloudflare dashboard / wrangler.toml:
- `RESEND_API_KEY`
- `TURNSTILE_SECRET_KEY`
- `GOOGLE_SERVICE_ACCOUNT_JSON`
- `SPREADSHEET_ID`
- `RESEND_AUDIENCE_ID`

---

## Error Handling

| Scenario | Response |
|----------|----------|
| Missing required fields | 400 with field-specific errors |
| Invalid email format | 400 "Invalid email address" |
| Turnstile fails | 403 "Verification failed" |
| Honeypot filled | 200 OK (silent rejection) |
| Already subscribed | 200 "You're already subscribed" |
| Expired token | 410, redirect to "link expired" page |
| Resend API fails | 500, but still log to Sheets if possible |
| Sheets API fails | 500, but still send emails if possible |

---

## Frontend Implementation

React Hook Form with Panda CSS styling via @okshaun/components:

```tsx
import { useForm } from 'react-hook-form';

type ContactFormData = {
  name: string;
  email: string;
  message: string;
  honeypot: string;
  turnstileToken: string;
};

export function ContactForm() {
  const { register, handleSubmit, setValue, formState } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    await fetch('https://worker-url.workers.dev/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name', { required: true })} />
      <input {...register('email', { required: true })} type="email" />
      <textarea {...register('message', { required: true })} />

      {/* Honeypot - hidden from real users */}
      <input {...register('honeypot')} style={{ display: 'none' }} tabIndex={-1} />

      {/* Turnstile widget */}
      <Turnstile onSuccess={(token) => setValue('turnstileToken', token)} />

      <button type="submit">Send</button>
    </form>
  );
}
```

---

## Next Steps

1. Set up Worker project with Wrangler
2. Configure Google Cloud service account for Sheets API
3. Set up Resend account and verify domain
4. Configure Cloudflare Turnstile
5. Implement Worker endpoints
6. Build frontend form components
7. Replace Tally.so embed with custom ContactForm
8. Add newsletter signup form
