# Email Sorun Detaylı Kontrol

## ❌ SORUN: Email Hala Gelmiyor

Tüm sistemi adım adım kontrol edelim.

---

## 🔍 ADIM ADIM KONTROL

### 1. Vercel Loglarını Kontrol Edin

**Adımlar:**
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
- Loglarda ne görüyorsunuz?
- Hata mesajı var mı?
- Email gönderme denemesi yapıldı mı?

---

### 2. Stripe Webhook Kontrolü

**Kontrol:**
1. Stripe Dashboard → **Webhooks**
2. Endpoint: `https://getprimesim.com/api/webhooks/stripe`
3. Son event'leri kontrol edin
4. `checkout.session.completed` event'i var mı?

**Paylaşın:**
- Webhook tetiklendi mi?
- Event var mı?
- Hata var mı?

---

### 3. Resend Dashboard Kontrolü

**Kontrol:**
1. [Resend Dashboard](https://resend.com/dashboard) → **Emails**
2. Son gönderilen email'leri kontrol edin
3. Email gönderildi mi?
4. Hata var mı?

**Paylaşın:**
- Email gönderildi mi?
- Hata mesajı var mı?
- Status nedir?

---

### 4. Vercel Environment Variables Kontrolü

**Kontrol:**
1. Vercel Dashboard → Settings → **Environment Variables**
2. Şu değişkenler var mı:
   - `RESEND_API_KEY` = `re_VVzCiRXr_5w97w3zx1LL2Y8oAD6W8v6Hv`
   - `ESIMGO_API_KEY` = `lzN9o1KFhc9AHnA-H2OmoLsu_2XfGd54Z4SL1meT`
   - `ESIMGO_API_URL` = `https://api.esimgo.io/v3`
   - `STRIPE_WEBHOOK_SECRET` = (Stripe'dan alınan)

**Paylaşın:**
- Tüm değişkenler var mı?
- Değerler doğru mu?

---

## 📋 KONTROL LİSTESİ

- [ ] Vercel logları kontrol edildi
- [ ] Stripe webhook tetiklendi mi?
- [ ] eSimGo API'ye istek gitti mi?
- [ ] Email gönderme denemesi yapıldı mı?
- [ ] Resend Dashboard'da email var mı?
- [ ] Hata mesajı var mı?

---

## 🚀 HIZLI KONTROL

**Lütfen şunları paylaşın:**

1. **Vercel Logları:**
   - Son test siparişinizden sonraki logları kopyalayın
   - Özellikle şu satırları:
     - `=== STRIPE WEBHOOK CALLED ===`
     - `📧 Attempting to send email to:`
     - `✅ Email sent successfully!` veya `❌ Failed to send email`

2. **Stripe Dashboard:**
   - Webhook event'leri var mı?
   - `checkout.session.completed` event'i var mı?

3. **Resend Dashboard:**
   - Email gönderildi mi?
   - Hata var mı?

4. **Test Siparişi Detayları:**
   - Hangi paketi satın aldınız?
   - Email adresi neydi?
   - Ödeme başarılı oldu mu?

---

**Logları paylaşın, sorunu birlikte çözelim! 🔍**



