# Stripe Webhook Endpoint Düzeltme

## ❌ SORUN: Yanlış Webhook Endpoint

Stripe Dashboard'da webhook endpoint'i yanlış görünüyor:
- ❌ **Yanlış:** `https://api.stripe.com/webhooks/v3/stripe`
- ✅ **Doğru:** `https://getprimesim.com/api/webhooks/stripe`

Bu yüzden webhook tetiklenmiyor ve email gönderilmiyor!

---

## 🔧 WEBHOOK ENDPOINT DÜZELTME

### Adım 1: Stripe Dashboard'a Giriş
1. [Stripe Dashboard](https://dashboard.stripe.com) → Giriş yapın
2. Sol menüden **"Webhooks"** seçin

### Adım 2: Mevcut Webhook'u Silin veya Düzenleyin
**Seçenek A: Mevcut Webhook'u Düzenleyin**
1. "energetic-excellence" webhook'una tıklayın
2. **"Edit"** veya **"Settings"** butonuna tıklayın
3. **Endpoint URL** alanını bulun
4. Değeri şununla değiştirin: `https://getprimesim.com/api/webhooks/stripe`
5. **"Save"** butonuna tıklayın

**Seçenek B: Yeni Webhook Oluşturun (Önerilir)**
1. **"Add endpoint"** veya **"Create webhook"** butonuna tıklayın
2. **Endpoint URL:** `https://getprimesim.com/api/webhooks/stripe`
3. **Description:** "PrimeSim eSim Webhook" (opsiyonel)
4. **Events to send:** `checkout.session.completed` seçin
5. **"Add endpoint"** veya **"Create"** butonuna tıklayın

### Adım 3: Signing Secret'ı Kopyalayın
1. Webhook oluşturulduktan sonra **"Signing secret"** bölümüne gidin
2. **"Reveal"** veya **"Copy"** butonuna tıklayın
3. Secret'ı kopyalayın (örn: `whsec_xxxxxxxxxxxxx`)

### Adım 4: Vercel'e Signing Secret Ekleyin
1. Vercel Dashboard → Settings → **Environment Variables**
2. `STRIPE_WEBHOOK_SECRET` değişkenini bulun veya ekleyin
3. Value: Kopyaladığınız signing secret'ı yapıştırın
4. Environment: Production, Preview, Development (hepsini seçin)
5. **Save**

### Adım 5: Redeploy
1. Vercel Dashboard → Deployments
2. En son deployment → **"..."** → **"Redeploy"**

---

## ✅ DOĞRU WEBHOOK AYARLARI

### Endpoint URL:
```
https://getprimesim.com/api/webhooks/stripe
```

### Events:
- ✅ `checkout.session.completed`

### API Version:
- `2025-12-15.clover` (veya en son versiyon)

---

## 🔍 KONTROL LİSTESİ

- [ ] Stripe Dashboard'da webhook endpoint doğru mu?
- [ ] Endpoint URL: `https://getprimesim.com/api/webhooks/stripe`
- [ ] Event: `checkout.session.completed` seçili mi?
- [ ] Signing secret kopyalandı mı?
- [ ] Vercel'de `STRIPE_WEBHOOK_SECRET` var mı?
- [ ] Redeploy yapıldı mı?

---

## 🧪 TEST ETME

### Adım 1: Test Siparişi Yapın
1. `https://getprimesim.com/esim`
2. Paket seçin → "Buy Now"
3. Test kartı ile ödeme yapın

### Adım 2: Stripe Dashboard'da Kontrol Edin
1. Stripe Dashboard → **Webhooks**
2. Webhook'unuzu seçin
3. **"Events"** sekmesine gidin
4. `checkout.session.completed` event'i var mı?
5. Event başarılı mı? (yeşil işaret)

### Adım 3: Vercel Loglarını Kontrol Edin
1. Vercel Dashboard → Deployments → Runtime Logs
2. Şu logları arayın:
   ```
   === STRIPE WEBHOOK CALLED ===
   ✅ Payment successful
   ```

---

## ⚠️ ÖNEMLİ NOTLAR

1. **Endpoint URL:**
   - Mutlaka `https://getprimesim.com/api/webhooks/stripe` olmalı
   - `http://` değil, `https://` olmalı
   - Sonunda `/` olmamalı

2. **Signing Secret:**
   - Her webhook'un kendine özel signing secret'ı vardır
   - Webhook oluşturulduktan sonra değişirse, Vercel'de de güncellemeniz gerekir

3. **Events:**
   - Sadece `checkout.session.completed` event'ini seçin
   - Diğer event'ler gerekli değil

---

**Webhook endpoint'ini düzeltin ve test edin! 🔧**















