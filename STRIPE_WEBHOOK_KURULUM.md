# Stripe Webhook Kurulumu

## 🔧 STRIPE WEBHOOK ENDPOINT EKLEME

### Adım 1: Stripe Dashboard'a Giriş
1. [Stripe Dashboard](https://dashboard.stripe.com) → Giriş yapın
2. **Developers** sekmesine tıklayın
3. Sol menüden **Webhooks** seçin

### Adım 2: Webhook Endpoint Ekleme
1. **"Add endpoint"** veya **"Add webhook endpoint"** butonuna tıklayın
2. **Endpoint URL** girin:
   ```
   https://getprimesim.com/api/webhooks/stripe
   ```
3. **Description** (opsiyonel):
   ```
   PrimeSim eSim Purchase Webhook
   ```

### Adım 3: Event Seçme
**"Select events to listen to"** bölümünde şu event'i seçin:
- ✅ **`checkout.session.completed`** (Ödeme tamamlandığında)

**Neden bu event?**
- Müşteri ödeme yaptığında tetiklenir
- eSimGo API'ye eSim satın alma isteği gönderilir
- QR code alınır ve müşteriye gönderilir

### Adım 4: Webhook Secret Alma
1. **"Add endpoint"** butonuna tıklayın
2. Webhook oluşturulduktan sonra:
   - **"Reveal"** veya **"Click to reveal"** butonuna tıklayın
   - **Signing secret** değerini kopyalayın
   - Format: `whsec_xxxxxxxxxxxxx`

### Adım 5: Vercel'e Webhook Secret Ekleme
1. [Vercel Dashboard](https://vercel.com/dashboard) → Projeniz
2. **Settings** → **Environment Variables**
3. **"Add New"** butonuna tıklayın
4. Formu doldurun:
   - **Name:** `STRIPE_WEBHOOK_SECRET`
   - **Value:** `whsec_xxxxxxxxxxxxx` (Stripe'dan kopyaladığınız secret)
   - **Environment:** 
     - ✅ Production
     - ✅ Preview
     - ✅ Development
5. **Save** butonuna tıklayın

### Adım 6: Redeploy
1. Environment variable eklendikten sonra **redeploy** yapın
2. Vercel Dashboard → **Deployments** → En son deployment → **"..."** → **Redeploy**
3. Veya terminal'de: `vercel --prod`

---

## ✅ KONTROL LİSTESİ

- [ ] Stripe Dashboard → Developers → Webhooks
- [ ] "Add endpoint" butonuna tıklandı
- [ ] Endpoint URL eklendi: `https://getprimesim.com/api/webhooks/stripe`
- [ ] Event seçildi: `checkout.session.completed`
- [ ] Webhook oluşturuldu
- [ ] Signing secret kopyalandı
- [ ] Vercel'e `STRIPE_WEBHOOK_SECRET` eklendi
- [ ] Redeploy yapıldı

---

## 🧪 TEST ETME

### 1. Test Webhook Gönderme
1. Stripe Dashboard → Webhooks → Endpoint'iniz
2. **"Send test webhook"** butonuna tıklayın
3. Event seçin: `checkout.session.completed`
4. **"Send test webhook"** butonuna tıklayın

### 2. Log Kontrolü
1. **Vercel Dashboard** → Projeniz → **Functions**
2. `/api/webhooks/stripe` fonksiyonunu seçin
3. **Logs** sekmesine gidin
4. Şu logları arayın:
   ```
   === STRIPE WEBHOOK CALLED ===
   ✅ Payment successful: cs_test_xxxxx
   📦 Purchasing eSim from eSimGo...
   ```

### 3. Gerçek Test Siparişi
1. Website'den test siparişi: `https://getprimesim.com/esim`
2. Test kartı ile ödeme yapın
3. Stripe webhook tetiklenecek
4. Logları kontrol edin

---

## 📊 İŞ AKIŞI

```
1. Müşteri ödeme yapar (Stripe Checkout)
   ↓
2. Stripe → checkout.session.completed event gönderir
   ↓
3. /api/webhooks/stripe endpoint'i tetiklenir
   ↓
4. eSimGo API'ye eSim satın alma isteği gönderilir
   ↓
5. eSimGo callback gönderir → /api/esimgo/webhook
   ↓
6. QR code alınır ve işlenir
   ↓
7. Email gönderilir (yakında)
```

---

## ⚠️ ÖNEMLİ NOTLAR

1. **Webhook URL:**
   - Production: `https://getprimesim.com/api/webhooks/stripe`
   - HTTPS zorunlu ✅

2. **Webhook Secret:**
   - Mutlaka Vercel'e eklenmeli
   - Güvenlik için kritik
   - Format: `whsec_xxxxxxxxxxxxx`

3. **Event:**
   - `checkout.session.completed` seçili olmalı
   - Bu event ödeme tamamlandığında tetiklenir

4. **Redeploy:**
   - `STRIPE_WEBHOOK_SECRET` eklendikten sonra mutlaka redeploy yapın
   - Aksi halde webhook çalışmaz

---

## 🔍 SORUN GİDERME

### Webhook çalışmıyor:
1. **Webhook URL doğru mu?**
   - `https://getprimesim.com/api/webhooks/stripe` olmalı
   - HTTPS zorunlu

2. **Webhook Secret eklendi mi?**
   - Vercel → Environment Variables → `STRIPE_WEBHOOK_SECRET` var mı?
   - Redeploy yapıldı mı?

3. **Event seçildi mi?**
   - `checkout.session.completed` seçili olmalı

4. **Logları kontrol edin:**
   - Vercel Function Logs'da hata var mı?
   - Stripe Dashboard → Webhooks → Attempts'te hata var mı?

---

## 🚀 SONRAKI ADIMLAR

1. **Stripe Dashboard'da webhook endpoint ekleyin**
   - URL: `https://getprimesim.com/api/webhooks/stripe`
   - Event: `checkout.session.completed`

2. **Webhook Secret'ı Vercel'e ekleyin**
   - Name: `STRIPE_WEBHOOK_SECRET`
   - Value: Stripe'dan kopyaladığınız secret

3. **Redeploy yapın**
   - Vercel Dashboard → Redeploy

4. **Test edin**
   - Test webhook gönderin
   - Veya gerçek test siparişi yapın
   - Logları kontrol edin

---

**Stripe webhook endpoint'ini eklediniz mi? Webhook secret'ı Vercel'e eklediniz mi? 🚀**















