# Webhook Secret Eklendi - Test

## ✅ STRIPE_WEBHOOK_SECRET EKLENDI

**Secret:** `whsec_6rE6HldAQdYeYRwcNQSxtWAj3W1QlhMj`

Vercel'e eklendi. Şimdi redeploy yapıp test edelim.

---

## 🔧 REDEPLOY YAPMA

### Adım 1: Vercel Dashboard'dan Redeploy
1. Vercel Dashboard → Projeniz → **Deployments**
2. En son deployment → **"..."** → **"Redeploy"**
3. Redeploy tamamlanmasını bekleyin

### Adım 2: Veya Terminal'den Redeploy
```bash
vercel --prod
```

---

## 🧪 TEST ADIMLARI

### Adım 1: Test Siparişi Yapın
1. `https://getprimesim.com/esim`
2. Herhangi bir paket seçin → "Buy Now"
3. Stripe test kartı ile ödeme yapın:
   - **Kart:** `4242 4242 4242 4242`
   - **Son Kullanma:** `12/25`
   - **CVC:** `123`
   - **ZIP:** `12345`

### Adım 2: Stripe Dashboard'da Kontrol Edin
1. Stripe Dashboard → **Webhooks**
2. `https://getprimesim.com/api/webhooks/stripe` webhook'una tıklayın
3. **"Events"** sekmesine gidin
4. Son test siparişinizden sonraki event'leri kontrol edin

**Kontrol edin:**
- `checkout.session.completed` event'i var mı?
- Event başarılı mı? (yeşil ✅ veya kırmızı ❌)
- Response code nedir? (200 ✅ veya 400 ❌)
- Response body nedir?

**Başarılı olmalı:**
- Event başarılı (yeşil ✅)
- Response code: 200
- Response body: `{"received":true,"message":"Payment processed and eSim purchased"}`

### Adım 3: Vercel Loglarını Kontrol Edin
1. Vercel Dashboard → Deployments → En son deployment → **Runtime Logs**
2. Son test siparişinizden sonraki logları bulun

**Arayın:**
```
=== STRIPE WEBHOOK CALLED ===
📝 Webhook received:
  - Signature exists: true
  - Webhook secret exists: true
✅ Webhook signature verified successfully
✅ Payment successful
📦 Purchasing eSim from eSimGo...
📧 Attempting to send email to:
✅ Email sent successfully!
```

**Eğer hata görüyorsanız:**
- `❌ Webhook signature verification failed` → Secret yanlış olabilir, tekrar kontrol edin
- `❌ STRIPE_WEBHOOK_SECRET not configured` → Redeploy yapın
- `❌ eSimGo purchase failed` → eSimGo API hatası (ama email gönderilmeli)

### Adım 4: Email Kontrolü
1. Ödeme sırasında girdiğiniz email adresini kontrol edin
2. **Spam klasörüne de bakın**
3. Email geldi mi?
4. QR code var mı?

---

## ✅ BAŞARILI TEST KRİTERLERİ

- [ ] Stripe webhook event başarılı (yeşil ✅)
- [ ] Response code: 200
- [ ] Vercel loglarında "✅ Webhook signature verified successfully" görünüyor
- [ ] Vercel loglarında "✅ Payment successful" görünüyor
- [ ] Vercel loglarında "📧 Attempting to send email to:" görünüyor
- [ ] Vercel loglarında "✅ Email sent successfully!" görünüyor
- [ ] Email geldi
- [ ] QR code görünüyor (veya "QR Code is being processed" mesajı)

---

## ❌ OLASI SORUNLAR VE ÇÖZÜMLER

### Sorun 1: "Webhook signature verification failed" (400)
**Sebep:** Secret yanlış veya redeploy yapılmadı.

**Çözüm:**
1. Stripe Dashboard → Webhooks → Webhook'unuzu seçin
2. "Signing secret" → "Reveal" → Secret'ı tekrar kopyalayın
3. Vercel'de `STRIPE_WEBHOOK_SECRET` değerini kontrol edin
4. Aynı mı? → Redeploy yapın
5. Farklı mı? → Güncelleyin ve redeploy yapın

### Sorun 2: "STRIPE_WEBHOOK_SECRET not configured"
**Sebep:** Redeploy yapılmadı.

**Çözüm:**
1. Redeploy yapın
2. Environment variable'ların yüklendiğinden emin olun

### Sorun 3: Email gelmedi
**Kontrol edin:**
- Vercel loglarında "✅ Email sent successfully!" görünüyor mu?
- Resend Dashboard'da email gönderildi mi?
- Spam klasörüne baktınız mı?

---

## 🚀 SONRAKI ADIMLAR

1. ✅ **Redeploy yapın** (önemli!)
2. ✅ **Test siparişi yapın**
3. ✅ **Stripe Dashboard'da event'leri kontrol edin**
4. ✅ **Vercel loglarını kontrol edin**
5. ✅ **Email'inizi kontrol edin**

---

**Redeploy yapıp test edin! Sonuçları paylaşın. 🚀**













