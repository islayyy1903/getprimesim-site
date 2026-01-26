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

---

## Nasıl yapılır (Step-by-step)

**Ön koşul:** Bu kurallar **Radar for Fraud Teams** (veya Radar for Platforms) gerektirir.  
Stripe Dashboard’da **Radar → Rules** görüyorsan ve “+ Add rule” ile Block/Review ekleyebiliyorsan, erişimin var.  
Sadece varsayılan kurallar varsa [Stripe’dan Radar for Fraud Teams](https://stripe.com/radar/fraud-teams) açman gerekebilir.

### 1. Radar Rules sayfasına git

- **Live (canlı):** [dashboard.stripe.com/radar/rules](https://dashboard.stripe.com/radar/rules)  
- **Test:** [dashboard.stripe.com/test/radar/rules](https://dashboard.stripe.com/test/radar/rules)  

Önce **test** modunda dene; “Test rule” ile son 6 aylık ödemelerde etkisini görürsün. Sonra aynı kuralları **live**’da ekle.

### 2. IP ≠ kart ülkesi (Rule 6)

1. **+ Add rule** → **Block** seç.
2. Condition alanı zaten `if` ile başlıyor; sadece **condition** kısmını yaz:

   ```
   :card_country: != :ip_country:
   ```

3. **Test rule** ile dene. Çok fazla “iyi” ödemeyi kesiyorsa **Review** yap; sonra gerekirse Block’a çevir.
4. **Add rule** → kaydet.

**Not:** IP ile kart ülkesi farklıysa (örn. VPN, yurtdışı gezi) bloklar. Turizm / yurtdışı satışın varsa bu kuralı **atlayabilir** veya sadece **Review** yap.

### 3. Risk score > 65 (Rule 5)

1. **+ Add rule** → **Block** seç.
2. Condition alanına (if’ten sonrası) yaz:

   ```
   :risk_score: > 65
   ```

3. **Test rule** → false positive’e bak. Çok yüksekse `> 70` veya `> 75` dene.
4. **Add rule** → kaydet.

**Not:** Risk skoru 0–100; 65+ genelde “elevated” kabul edilir.

### 4. Velocity – aynı IP’den çok deneme (Rule 4)

Stripe’da “son 10 dakikada X deneme” için hazır attribute yok; **saatlik** kullanılıyor. Aynı IP’den saatte 2’den fazla **deneme** (authorized + blocked + declined) bloklamak için:

**Seçenek A – Radar Assistant (kolay)**  
1. **+ Add rule** → **Block** seç.  
2. **Radar Assistant**’a tıkla.  
3. Şunu yaz (İngilizce):

   ```
   Block when there are more than 2 payment attempts from the same IP address in the last hour.
   ```

4. Önerilen kuralı **Test rule** ile dene, uygunsa **Add rule**.

**Seçenek B – Elle**  
Attribute adı farklı olabilir; `:` yazınca açılan listede şunlara bak:

- `total_charges_per_ip_address_hourly` (varsa)  
- `total_transactions_per_ip_address_hourly` (varsa)  

Örnek (attribute mevcutsa; Condition alanına if’ten sonrası):

```
:total_charges_per_ip_address_hourly: > 2
```

Listede yoksa **sadece Seçenek A (Radar Assistant)** kullan.

### 5. Kuralları kontrol et

- **Radar → Rules**’ta eklediğin kurallar görünür.  
- **Rule performance** grafiğinden bloklanan / etkilenen ödeme sayısını izle.  
- Gerekirse kuralı **Edit** / **Disable** ile güncelle.

### 6. Özet – eklenecek 3 kural

Block seçiliyken **Condition** alanı `if` ile başlar; sadece aşağıdaki **condition** kısmını yaz.

| Sıra | Kural | Condition’a yaz (if’ten sonrası) |
|------|-------|----------------------------------|
| 1 | IP ≠ kart ülkesi | `:card_country: != :ip_country:` |
| 2 | Risk score > 65 | `:risk_score: > 65` |
| 3 | Velocity (aynı IP, saatte >2 deneme) | Assistant ile “Block when >2 payment attempts from same IP in last hour” veya `:total_charges_per_ip_address_hourly: > 2` (attribute varsa) |

**Disposable email / min amount:** Uygulama tarafında hâlihazırda yapıyoruz; Radar’da tekrar eklemek isteğe bağlı.

---

## Ek kurallar (isteğe bağlı)

Aşağıdakileri da **+ Add rule → Block** (veya Review) ile ekleyebilirsin. Condition alanına **sadece** aşağıdaki satırı yapıştır.

| Kural | Condition (if'ten sonrası) |
|-------|----------------------------|
| Disposable email (Radar yedek) | `:is_disposable_email:` |
| Tor / proxy IP | `:is_anonymous_ip:` |
| Aynı IP, saatte 2+ farklı kart (card testing) | `:card_count_for_ip_address_hourly: > 2` |
| Aynı IP, saatte 2+ farklı email | `:email_count_for_ip_hourly: > 2` |
| Prepaid kart + yüksek risk | `:card_funding: = 'prepaid' and :risk_score: > 65` |
| CVC fail (Radar built-in varsa kullan) | *(CVC / Postal code kurallarını Enable et)* |

**Not:** `:is_disposable_email:` ve `:is_anonymous_ip:` tek başına kullanılır (operatör yok).  
Prepaid kuralı hem prepaid hem risk > 65 ise bloklar; sadece prepaid bloklamak istersen `:card_funding: = 'prepaid'` yeter.  
Önce **Test rule** ile dene, Succeeded’ı çok kesiyorsa Review’a çevir veya ekleme.
