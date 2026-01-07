# Webhook Doğru - Log Kontrolü

## ✅ WEBHOOK ENDPOINT DOĞRU

Webhook endpoint zaten doğru: `https://getprimesim.com/api/webhooks/stripe`

Sorun başka bir yerde. Logları kontrol edelim.

---

## 🔍 ADIM ADIM KONTROL

### 1. Stripe Dashboard - Webhook Event'leri

**Kontrol:**
1. Stripe Dashboard → **Webhooks**
2. `https://getprimesim.com/api/webhooks/stripe` webhook'una tıklayın
3. **"Events"** sekmesine gidin
4. Son test siparişinizden sonraki event'leri kontrol edin

**Paylaşın:**
- `checkout.session.completed` event'i var mı?
- Event başarılı mı? (yeşil işaret ✅)
- Event başarısız mı? (kırmızı işaret ❌)
- Response code nedir? (200, 500, vb.)
- Response body nedir?

---

### 2. Vercel Logları - Webhook Handler

**Kontrol:**
1. Vercel Dashboard → Projeniz → **Deployments**
2. En son deployment → **Runtime Logs** (veya **Functions** → **View Logs**)
3. Son test siparişinizden sonraki logları bulun

**Arayın:**
```
=== STRIPE WEBHOOK CALLED ===
✅ Payment successful
📦 Purchasing eSim from eSimGo...
📧 Attempting to send email to:
✅ Email sent successfully!
```

**Paylaşın:**
- `=== STRIPE WEBHOOK CALLED ===` görünüyor mu?
- `✅ Payment successful` görünüyor mu?
- `📦 Purchasing eSim from eSimGo...` görünüyor mu?
- `📧 Attempting to send email to:` görünüyor mu?
- `✅ Email sent successfully!` görünüyor mu?
- Hata mesajı var mı? (❌ ile başlayan)

---

### 3. Resend Dashboard - Email Geçmişi

**Kontrol:**
1. [Resend Dashboard](https://resend.com/dashboard) → **Emails** (veya **Logs**)
2. Son gönderilen email'leri kontrol edin

**Paylaşın:**
- Email gönderildi mi?
- Status nedir? (Delivered, Failed, Pending, vb.)
- Hata mesajı var mı?
- Email ID nedir?

---

### 4. eSimGo API Durumu

**Kontrol:**
1. eSimGo Dashboard'da sipariş durumunu kontrol edin
2. eSimGo API'ye istek gitti mi?
3. QR code geldi mi?

**Paylaşın:**
- eSimGo'da sipariş var mı?
- Sipariş durumu nedir?
- QR code var mı?

---

## 📋 KONTROL LİSTESİ

- [x] Webhook endpoint doğru ✅
- [ ] Stripe webhook event'i var mı?
- [ ] Event başarılı mı?
- [ ] Vercel loglarında webhook tetiklendi mi?
- [ ] eSimGo API'ye istek gitti mi?
- [ ] Email gönderme denemesi yapıldı mı?
- [ ] Resend Dashboard'da email var mı?

---

## 🚀 HIZLI KONTROL

**Lütfen şunları paylaşın:**

1. **Stripe Dashboard:**
   - Webhook event'leri var mı?
   - `checkout.session.completed` event'i var mı?
   - Event başarılı mı? (yeşil ✅ veya kırmızı ❌)
   - Response code nedir?

2. **Vercel Logları:**
   - Son test siparişinizden sonraki logları kopyalayın
   - Özellikle şu satırları:
     - `=== STRIPE WEBHOOK CALLED ===`
     - `✅ Payment successful`
     - `📧 Attempting to send email to:`
     - `✅ Email sent successfully!` veya `❌ Failed to send email`

3. **Resend Dashboard:**
   - Email gönderildi mi?
   - Status nedir?
   - Hata var mı?

4. **Test Siparişi Detayları:**
   - Hangi paketi satın aldınız?
   - Email adresi neydi?
   - Ödeme başarılı oldu mu?
   - Sipariş zamanı neydi?

---

**Logları paylaşın, sorunu birlikte çözelim! 🔍**














