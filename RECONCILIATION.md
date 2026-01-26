# Stripe ↔ eSimGo Reconciliation

Use this guide to match Stripe payments with eSimGo "Bundle Applied" spend and spot mismatches (blocked, refunded, incomplete).

## 1. AUDIT logs (Vercel)

On each **successful** eSimGo provision, the webhook logs a line:

```
AUDIT_PROVISION session_id=cs_xxx payment_intent=pi_xxx amount=1234 email=... esimgo_order=... ts=...
```

- **session_id**: Stripe Checkout Session ID
- **payment_intent**: Stripe PaymentIntent ID
- **amount**: Session `amount_total` (cents)
- **email**: Customer email
- **esimgo_order**: eSimGo order reference (used in "View eSIMs" / assignments)
- **ts**: ISO timestamp

**How to use:** In Vercel → Project → Logs, search for `AUDIT_PROVISION`. Export or filter by date. Use `session_id` / `payment_intent` to match Stripe Dashboard, and `esimgo_order` to match eSimGo "View eSIMs" or "Bundle Applied" export.

## 2. Idempotency / skip logs

- `AUDIT_PROVISION skip=idempotent ...` – Webhook retry; we already processed this session. No double eSimGo spend.
- `skipped: "payment_not_paid"` – Session completed but payment not `paid`; we do **not** provision eSimGo.
- `skipped: "min_amount"` – Amount &lt; $3 (300 cents); we refund and do **not** provision (low-amount fraud).
- `skipped: "disposable_email"` – Blocked disposable email; we refund and do **not** provision.

## 3. Matching Stripe ↔ eSimGo

1. **Stripe** → Payments → Filter "Succeeded". Note `pi_xxx` and `cs_xxx` (from payment details).
2. **eSimGo** → View eSIMs / Top-ups & Billing → Export or list "Bundle Applied" by date.
3. **Vercel logs** → Search `AUDIT_PROVISION` for the same date range.
4. Match:
   - Each `AUDIT_PROVISION` line ↔ one Stripe "succeeded" payment (same `payment_intent` / `session_id`).
   - Same `AUDIT_PROVISION` ↔ one eSimGo "Bundle Applied" (same `esimgo_order` / reference).

## 4. Mismatches to investigate

- **Stripe "blocked" / "refunded" / "incomplete"** but **eSimGo "Bundle Applied"** for same order → We provisioned before the payment was blocked/refunded. Fix: we now only provision when `payment_status === 'paid'` and use idempotency to avoid double provision.
- **eSimGo spend** with **no Stripe payment** → Possible causes: (1) POST /api/test-qrcode in production (now disabled), (2) old webhook behavior, (3) manual eSimGo use.

## 5. Fraud-related behaviour

- **3DS**: Checkout requests `request_three_d_secure: "automatic"` for cards.
- **Min amount $3**: Blocked at checkout and in webhook (refund + skip) to stop low-amount test fraud.
- **Disposable emails**: Blocked at checkout and in webhook; we refund and never provision.
- **Idempotency**: PaymentIntent `metadata.primesim_esimgo_order` ensures we don’t provision twice on webhook retries.
- **Stripe Radar**: Add rules for velocity, risk score &gt; 65, IP ≠ card country. See **STRIPE_RADAR_RULES.md**.
