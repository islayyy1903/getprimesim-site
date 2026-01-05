# Ödeme Sonrası Kontrol

## ❌ SORUN: Email Gelmedi

Ödeme yapıldı ama email gelmedi. Şimdi logları kontrol edelim:

---

## 🔍 KONTROL EDİLMESİ GEREKENLER

### 1. Stripe Webhook Tetiklendi mi?

**Vercel Logları:**
1. Vercel Dashboard → Deployments → En son deployment → **Runtime Logs**
2. Ctrl+F ile şunları arayın:
   - `=== STRIPE WEBHOOK CALLED ===` → Webhook tetiklendi mi?
   - `✅ Payment successful` → Ödeme başarılı mı?

**Stripe Dashboard:**
1. Stripe Dashboard → **Developers** → **Webhooks**
2. Webhook endpoint'inize tıklayın
3. **"Event deliveries"** sekmesine tıklayın
4. Webhook isteği görünüyor mu?
5. Başarılı mı? (200 status)

### 2. eSimGo API'ye İstek Gitti mi?

**Vercel Logları:**
- `📦 Purchasing eSim from eSimGo...` → eSimGo API'ye istek gitti mi?
- `✅ eSim purchased successfully` → eSim satın alındı mı?
- `❌ eSimGo purchase failed` → Hata var mı?

### 3. QR Kod Geldi mi?

**Vercel Logları:**
- `=== ESIMGO V3 CALLBACK CALLED ===` → Callback geldi mi?
- `QR Code: Base64 provided` → QR kod geldi mi?

---

## ⚠️ ÖNEMLİ NOT

**Email Sistemi Henüz Kurulmamış!**

Email sistemi henüz eklenmedi, bu yüzden email gelmeyecek. QR kod şu an sadece loglarda görünecek.

**Email sistemi eklenene kadar:**
- QR kod'u manuel olarak göndermeniz gerekebilir
- Veya email sistemi kurulana kadar bekleyin

---

## 🔍 LOGLARI PAYLAŞIN

Lütfen şu logları paylaşın:

1. **Vercel Logları:**
   - `/api/webhooks/stripe` ile ilgili loglar
   - `/api/esimgo/webhook` ile ilgili loglar

2. **Stripe Dashboard:**
   - Webhook attempts'te ne görüyorsunuz?
   - Hata var mı?

---

## 🚀 SONRAKI ADIMLAR

1. ✅ **Logları kontrol edin**
2. ✅ **Stripe Dashboard'da webhook attempts kontrol edin**
3. ✅ **Sonuçları bana bildirin**

---

**Loglarda ne görüyorsunuz? Stripe webhook tetiklendi mi? eSimGo API'ye istek gitti mi? 🔍**









