# Webhook URL Hatası Düzeltme

## ❌ SORUN TESPİT EDİLDİ!

Stripe Dashboard'da webhook endpoint URL'i **YANLIŞ**!

---

## 🔍 SORUN

**Mevcut URL (YANLIŞ):**
```
https://gpfprimexm.com/api/webhooks/stripe
```

**Doğru URL:**
```
https://getprimesim.com/api/webhooks/stripe
```

**Sorun:** `gpfprimexm.com` yerine `getprimesim.com` olmalı!

---

## 🚀 ÇÖZÜM

### Adım 1: Webhook Endpoint'i Düzenle
1. Stripe Dashboard → **Developers** → **Webhooks**
2. "energetic-excellence" webhook endpoint'inize tıklayın
3. **"Edit destination"** butonuna tıklayın (sağ üstte)
4. Endpoint URL'i düzenleyin

### Adım 2: Endpoint URL'i Düzelt
1. **Endpoint URL** alanını bulun
2. Mevcut URL: `https://gpfprimexm.com/api/webhooks/stripe`
3. **Doğru URL'i girin:**
   ```
   https://getprimesim.com/api/webhooks/stripe
   ```
4. **"Save"** veya **"Update"** butonuna tıklayın

### Adım 3: Signing Secret'ı Kopyalayın
1. Webhook detay sayfasında **"Signing secret"** bölümünü bulun
2. **Göz ikonu** (eye icon) veya **"Reveal"** butonuna tıklayın
3. Secret değerini kopyalayın (`whsec_xxxxxxxxxxxxx`)
4. Vercel'e ekleyeceğiz

---

## 🔧 VERCEL'E SECRET EKLEME

### Adım 1: Vercel Dashboard
1. [Vercel Dashboard](https://vercel.com/dashboard) → Projeniz
2. **Settings** → **Environment Variables**

### Adım 2: Environment Variable Ekleme
1. **"Add New"** butonuna tıklayın
2. Formu doldurun:
   - **Name:** `STRIPE_WEBHOOK_SECRET`
   - **Value:** `whsec_xxxxxxxxxxxxx` (Stripe'dan kopyaladığınız)
   - **Environment:** Production, Preview, Development (hepsini seçin)
3. **Save**

### Adım 3: Redeploy
1. Environment variable eklendikten sonra **redeploy** yapın
2. Vercel Dashboard → **Deployments** → En son deployment → **"..."** → **Redeploy**

---

## ✅ KONTROL LİSTESİ

- [ ] Webhook endpoint URL düzeltildi: `https://getprimesim.com/api/webhooks/stripe`
- [ ] Signing secret kopyalandı
- [ ] Vercel'e `STRIPE_WEBHOOK_SECRET` eklendi
- [ ] Redeploy yapıldı
- [ ] Test siparişi yapıldı
- [ ] Loglar kontrol edildi

---

## 🧪 TEST ETME

### 1. Test Siparişi Yapın
1. `https://getprimesim.com/esim`
2. Paket seçin → "Buy Now"
3. Test kartı ile ödeme yapın

### 2. Stripe Dashboard Kontrolü
1. Stripe Dashboard → Webhooks → "energetic-excellence"
2. **"Event deliveries"** sekmesine tıklayın
3. Webhook isteği görünüyor mu?
4. Başarılı mı? (200 status)

### 3. Vercel Logları Kontrolü
1. Vercel Dashboard → Deployments → En son deployment → **Runtime Logs**
2. Şu logları arayın:
   ```
   === STRIPE WEBHOOK CALLED ===
   ✅ Payment successful: cs_test_xxxxx
   📦 Purchasing eSim from eSimGo...
   ```

---

## ⚠️ ÖNEMLİ NOTLAR

1. **URL Düzeltmesi:**
   - `gpfprimexm.com` → `getprimesim.com`
   - HTTPS kullanın
   - Sonunda `/` olmamalı

2. **Signing Secret:**
   - Secret'ı kopyaladıktan sonra kaydedin
   - Vercel'e ekleyin
   - Redeploy yapın

3. **Test:**
   - URL düzeltildikten sonra test siparişi yapın
   - Webhook attempts kontrol edin

---

## 🚀 SONRAKI ADIMLAR

1. ✅ **Webhook endpoint URL'i düzeltin:** `https://getprimesim.com/api/webhooks/stripe`
2. ✅ **Signing secret'ı kopyalayın**
3. ✅ **Vercel'e `STRIPE_WEBHOOK_SECRET` ekleyin**
4. ✅ **Redeploy yapın**
5. ✅ **Test siparişi yapın**
6. ✅ **Logları kontrol edin**

---

**Webhook endpoint URL'i düzelttiniz mi? Signing secret'ı kopyaladınız mı? 🔍**











