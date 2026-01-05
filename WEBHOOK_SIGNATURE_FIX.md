# Webhook Signature Verification Fix

## ❌ SORUN: Webhook Signature Verification Failed

**Hata:** "No signatures found matching the expected signature for payload"

**Sebep:** Next.js App Router'da webhook için raw body almak için özel config gerekiyor.

---

## ✅ YAPILAN DÜZELTMELER

### 1. Route Segment Config Eklendi
```typescript
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
```

### 2. Detaylı Loglama Eklendi
- Signature kontrolü
- Body length kontrolü
- Body preview

---

## 🔧 KONTROL

### 1. Vercel'de STRIPE_WEBHOOK_SECRET Var mı?

**Kontrol:**
1. Vercel Dashboard → Settings → **Environment Variables**
2. `STRIPE_WEBHOOK_SECRET` var mı?
3. Değer doğru mu? (Stripe Dashboard'dan kopyalanan secret)

**Eğer yoksa:**
1. Stripe Dashboard → Webhooks → Webhook'unuzu seçin
2. **"Signing secret"** → **"Reveal"** → Kopyalayın
3. Vercel'e ekleyin:
   - Name: `STRIPE_WEBHOOK_SECRET`
   - Value: `whsec_xxxxxxxxxxxxx`
   - Environment: Production, Preview, Development

### 2. Redeploy Yapıldı mı?

**Kontrol:**
- Deployment tamamlandı mı?
- Yeni kod deploy edildi mi?

---

## 🧪 TEST ETME

### Adım 1: Test Siparişi Yapın
1. `https://getprimesim.com/esim`
2. Paket seçin → "Buy Now"
3. Test kartı ile ödeme yapın

### Adım 2: Stripe Dashboard'da Kontrol Edin
1. Stripe Dashboard → **Webhooks**
2. Webhook'unuzu seçin → **"Events"**
3. `checkout.session.completed` event'i var mı?
4. Event başarılı mı? (yeşil ✅ veya kırmızı ❌)
5. Response code nedir? (200 ✅ veya 400 ❌)

### Adım 3: Vercel Loglarını Kontrol Edin
1. Vercel Dashboard → Deployments → Runtime Logs
2. Şu logları arayın:
   ```
   === STRIPE WEBHOOK CALLED ===
   📝 Webhook received:
     - Signature exists: true
     - Body length: XXXX
   ✅ Payment successful
   ```

---

## ✅ BAŞARILI TEST KRİTERLERİ

- [ ] Stripe webhook event başarılı (yeşil ✅)
- [ ] Response code: 200
- [ ] Vercel loglarında "✅ Payment successful" görünüyor
- [ ] Email gönderildi
- [ ] Email geldi

---

## ❌ OLASI SORUNLAR

### Sorun 1: "Webhook signature verification failed"
**Çözüm:**
- `STRIPE_WEBHOOK_SECRET` Vercel'de var mı kontrol edin
- Secret doğru mu kontrol edin
- Redeploy yapın

### Sorun 2: "No signature found"
**Çözüm:**
- Stripe Dashboard'da webhook endpoint doğru mu kontrol edin
- Webhook aktif mi kontrol edin

### Sorun 3: "Body parsing error"
**Çözüm:**
- Route config doğru mu kontrol edin
- Redeploy yapın

---

**Deployment tamamlandıktan sonra test edin! 🚀**









