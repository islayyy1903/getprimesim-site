# Email Sorun Detaylı Analiz

## ❌ SORUN: Email Hala Gelmiyor

Email sistemi eklendi ama email gelmiyor. Tüm sistemi kontrol edelim:

---

## 🔍 KONTROL EDİLMESİ GEREKENLER

### 1. Resend API Key Vercel'de Var mı?

**Kontrol:**
1. Vercel Dashboard → Projeniz → **Settings** → **Environment Variables**
2. `RESEND_API_KEY` var mı?
3. Değer doğru mu? (`re_VVzCiRXr_5w97w3zx1LL2Y8oAD6W8v6Hv`)
4. Environment: Production, Preview, Development seçili mi?

**Eğer yoksa:**
- Email sistemi çalışmaz
- Loglarda "Email service not configured" hatası görünür

### 2. Redeploy Yapıldı mı?

**Kontrol:**
- Environment variable eklendikten sonra redeploy yapıldı mı?
- En son deployment'ı kontrol edin

**Eğer redeploy yapılmadıysa:**
- Email sistemi çalışmaz
- Eski kod çalışıyor olabilir

### 3. Stripe Webhook Tetiklendi mi?

**Vercel Logları:**
1. Vercel Dashboard → Deployments → En son deployment → **Runtime Logs**
2. Ctrl+F ile şunları arayın:
   - `=== STRIPE WEBHOOK CALLED ===` → Webhook tetiklendi mi?
   - `✅ Payment successful` → Ödeme başarılı mı?

**Eğer webhook tetiklenmediyse:**
- Email gönderilmez
- eSimGo API'ye istek gitmez

### 4. eSimGo API'ye İstek Gitti mi?

**Vercel Logları:**
- `📦 Purchasing eSim from eSimGo...` → eSimGo API'ye istek gitti mi?
- `✅ eSim purchased successfully` → eSim satın alındı mı?
- `❌ eSimGo purchase failed` → Hata var mı?

**Eğer eSimGo API hatası varsa:**
- QR kod gelmez
- Email gönderilmez

### 5. QR Kod Geldi mi?

**Vercel Logları:**
- `QR Code: Base64 provided` → QR kod geldi mi?
- `QR Code URL: https://...` → QR kod URL'i var mı?

**Eğer QR kod gelmediyse:**
- Email gönderilmez (QR kod olmadan email gönderilmiyor)

### 6. Email Gönderildi mi?

**Vercel Logları:**
- `✅ QR code email sent successfully to: customer@example.com` → Email gönderildi mi?
- `❌ Failed to send QR code email` → Email hatası var mı?
- `Email service not configured` → Resend API key eksik mi?

---

## 🚀 ADIM ADIM KONTROL

### Adım 1: Vercel Environment Variables Kontrolü

1. Vercel Dashboard → Projeniz → **Settings** → **Environment Variables**
2. Şu değişkenler var mı kontrol edin:
   - ✅ `RESEND_API_KEY` = `re_VVzCiRXr_5w97w3zx1LL2Y8oAD6W8v6Hv`
   - ✅ `ESIMGO_API_KEY` = `lzN9o1KFhc9AHnA-H2OmoLsu_2XfGd54Z4SL1meT`
   - ✅ `ESIMGO_API_URL` = `https://api.esimgo.io/v3`
   - ✅ `STRIPE_WEBHOOK_SECRET` = (Stripe'dan alınan)

### Adım 2: Logları Kontrol Edin

1. Vercel Dashboard → Deployments → En son deployment → **Runtime Logs**
2. Son test siparişinizden sonraki logları kontrol edin
3. Şu logları arayın:
   ```
   === STRIPE WEBHOOK CALLED ===
   ✅ Payment successful
   📦 Purchasing eSim from eSimGo...
   ✅ eSim purchased successfully
   ✅ QR code email sent successfully
   ```

### Adım 3: Hata Mesajlarını Kontrol Edin

Loglarda şu hatalar olabilir:
- `❌ Email service not configured` → Resend API key eksik
- `❌ eSimGo purchase failed` → eSimGo API hatası
- `❌ Failed to send QR code email` → Email gönderme hatası

---

## 🔧 OLASI SORUNLAR VE ÇÖZÜMLER

### Sorun 1: Resend API Key Eksik

**Belirtiler:**
- Loglarda "Email service not configured" hatası

**Çözüm:**
1. Vercel'e `RESEND_API_KEY` ekleyin
2. Redeploy yapın

### Sorun 2: Stripe Webhook Tetiklenmiyor

**Belirtiler:**
- Loglarda `/api/webhooks/stripe` yok

**Çözüm:**
1. Stripe Dashboard → Webhooks → Endpoint kontrol edin
2. `STRIPE_WEBHOOK_SECRET` Vercel'de var mı kontrol edin
3. Redeploy yapın

### Sorun 3: eSimGo API Hatası

**Belirtiler:**
- Loglarda "eSimGo purchase failed" hatası

**Çözüm:**
1. `ESIMGO_API_KEY` ve `ESIMGO_API_URL` kontrol edin
2. Paket ID'leri doğru mu kontrol edin
3. Hata mesajını kontrol edin

### Sorun 4: QR Kod Gelmedi

**Belirtiler:**
- eSimGo API başarılı ama QR kod yok

**Çözüm:**
1. eSimGo callback geldi mi kontrol edin
2. eSimGo'da callback URL ayarlı mı kontrol edin
3. Paket ID'leri doğru mu kontrol edin

---

## 📋 DETAYLI KONTROL LİSTESİ

- [ ] `RESEND_API_KEY` Vercel'de var mı?
- [ ] `ESIMGO_API_KEY` Vercel'de var mı?
- [ ] `ESIMGO_API_URL` Vercel'de var mı?
- [ ] `STRIPE_WEBHOOK_SECRET` Vercel'de var mı?
- [ ] Redeploy yapıldı mı?
- [ ] Stripe webhook tetiklendi mi?
- [ ] eSimGo API'ye istek gitti mi?
- [ ] QR kod geldi mi?
- [ ] Email gönderildi mi?

---

## 🚀 SONRAKI ADIMLAR

1. ✅ **Vercel Environment Variables kontrol edin**
2. ✅ **Logları detaylı kontrol edin**
3. ✅ **Hata mesajlarını not edin**
4. ✅ **Sonuçları bana bildirin**

---

**Lütfen şunları paylaşın:**
1. Vercel loglarında ne görüyorsunuz? (Son test siparişinden sonraki loglar)
2. Hata mesajı var mı? Varsa ne?
3. Stripe webhook tetiklendi mi?
4. eSimGo API'ye istek gitti mi?

**Logları paylaşabilir misiniz? 🔍**




