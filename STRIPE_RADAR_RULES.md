# Stripe Radar Rules (Fraud Prevention)

We block low amounts, disposable emails, and double provision in **our app**.  
Stripe **Radar** can add extra rules (risk score, velocity, IP ≠ card). Configure these in **Stripe Dashboard → Radar → Rules**.

---

## Rule 1 – Low amount fraud *(we enforce in app)*

- **Radar (optional):** `Block if :amount < 300` (cents)
- **We already:** Block checkout if price < $3; webhook refunds and skips provision if `amount_total` < 300.

---

## Rule 2 – Email domain *(we enforce in app)*

- **Radar (optional):** `Block if :email_domain IN [vwh.sh, temp-mail.org, mailinator.com, ...]`
- **We already:** Block disposable emails at checkout and in webhook (refund + skip provision).  
  `vwh.sh` and others are in `app/lib/disposableEmail.ts`.

---

## Rule 3 – payment_intent.succeeded *(we use checkout.session.completed + paid)*

- **Idea:** Only provision when `payment_intent.succeeded`, not `requires_capture` or before charge.
- **We already:** Use `checkout.session.completed` and provision only when `payment_status === 'paid'`.  
  Checkout uses `mode: 'payment'` (auto capture), so we’re after a successful charge.

---

## Rule 4 – Velocity

- **Radar:** `Block if >2 attempts from same IP in 10 minutes`
- **How:** Radar → Rules → Create rule → Condition: “Number of payment attempts from this IP in the last 10 minutes” > 2 → Action: Block.
- **We do not** enforce velocity in our app (would need Redis/KV). Use Radar.

---

## Rule 5 – Risk score

- **Radar:** `Block if :risk_score > 65`
- **How:** Radar → Rules → Create rule → Condition: “Risk score” > 65 → Action: Block.  
  Risk score is 0–99; blocking > 65 reduces high‑risk approvals.
- **We do not** read `risk_score` in our app; Radar blocks before the charge.

---

## Rule 6 – IP country ≠ card country

- **Radar:** `Block if :ip_country != :card_country`
- **Idea:** IP başka, kart başka → often fraud. Radar has `ip_country` and `card_country`.
- **How:** Radar → Rules → Create rule → “Block when IP country ≠ card country” (or equivalent condition).

---

## Summary

| Rule | We enforce in app? | Stripe Radar? |
|------|--------------------|---------------|
| Min amount $3 | ✅ Checkout + webhook | Optional |
| Disposable email | ✅ Checkout + webhook | Optional |
| payment_status paid | ✅ Webhook only | N/A |
| Velocity (>2 / 10 min / IP) | ❌ | ✅ Add in Radar |
| Risk score > 65 | ❌ | ✅ Add in Radar |
| IP ≠ card country | ❌ | ✅ Add in Radar |

**Next step:** Stripe Dashboard → **Radar** → **Rules** → add Velocity, Risk score, and IP ≠ card rules as above.
