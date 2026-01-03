# Webhook Secret Alma ve Vercel'e Ekleme

## ✅ WEBHOOK OLUŞTURULDU

Webhook endpoint oluşturuldu! Şimdi webhook secret'ı alıp Vercel'e eklemeliyiz.

---

## 🔍 WEBHOOK SECRET'ı BULMA

### Adım 1: Webhook Sayfasına Gidin
1. Stripe Dashboard → **Developers** → **Webhooks**
2. Yeni oluşturduğunuz webhook endpoint'ini bulun
3. Endpoint'e tıklayın (veya zaten açıksa)

### Adım 2: Signing Secret'ı Bulun
1. Webhook detay sayfasında **"Signing secret"** bölümünü bulun
2. **"Reveal"** veya **"Click to reveal"** butonuna tıklayın
3. Secret değerini kopyalayın
4. Format: `whsec_xxxxxxxxxxxxx`

**Önemli:** Secret'ı kopyaladıktan sonra kaydedin, tekrar gösterilmez!

---

## 🔧 VERCEL'E EKLEME

### Adım 1: Vercel Dashboard'a Gidin
1. [Vercel Dashboard](https://vercel.com/dashboard) → Projeniz (`getprimesim-site`)
2. **Settings** sekmesine tıklayın
3. Sol menüden **Environment Variables** seçin

### Adım 2: Environment Variable Ekleme
1. **"Add New"** butonuna tıklayın
2. Formu doldurun:
   - **Name:** `STRIPE_WEBHOOK_SECRET`
   - **Value:** `whsec_xxxxxxxxxxxxx` (Stripe'dan kopyaladığınız secret)
   - **Environment:** 
     - ✅ Production
     - ✅ Preview
     - ✅ Development
     - (Hepsini seçin)
3. **Save** butonuna tıklayın

### Adım 3: Redeploy
1. Environment variable eklendikten sonra **redeploy** yapın
2. Vercel Dashboard → **Deployments** → En son deployment → **"..."** → **Redeploy**
3. Veya terminal'de: `vercel --prod`

---

## ✅ KONTROL LİSTESİ

- [x] Webhook endpoint oluşturuldu ✅
- [ ] Stripe Dashboard → Webhooks → Endpoint'e tıklandı
- [ ] Signing secret bulundu
- [ ] Secret kopyalandı (`whsec_xxxxxxxxxxxxx`)
- [ ] Vercel Dashboard → Settings → Environment Variables
- [ ] `STRIPE_WEBHOOK_SECRET` eklendi
- [ ] Environment: Production, Preview, Development seçildi
- [ ] Save butonuna tıklandı
- [ ] Redeploy yapıldı

---

## 🧪 TEST ETME

### 1. Test Siparişi Yapın
1. `https://getprimesim.com/esim`
2. Paket seçin → "Buy Now"
3. Test kartı ile ödeme yapın:
   - Kart: `4242 4242 4242 4242`
   - Tarih: `12/25`
   - CVC: `123`
   - ZIP: `12345`

### 2. Logları Kontrol Edin
1. Vercel Dashboard → Deployments → En son deployment → **Runtime Logs**
2. Şu logları arayın:
   ```
   === STRIPE WEBHOOK CALLED ===
   ✅ Payment successful: cs_test_xxxxx
   📦 Purchasing eSim from eSimGo...
   ```

### 3. Webhook Attempts Kontrolü
1. Stripe Dashboard → Webhooks → Endpoint → **Attempts**
2. Webhook isteği görünüyor mu?
3. Başarılı mı? (200 status)

---

## ⚠️ ÖNEMLİ NOTLAR

1. **Webhook Secret Format:**
   - Format: `whsec_xxxxxxxxxxxxx`
   - Mutlaka `whsec_` ile başlamalı

2. **Environment Variables:**
   - Production, Preview, Development hepsine ekleyin
   - Aksi halde sadece production'da çalışır

3. **Redeploy:**
   - Environment variable eklendikten sonra mutlaka redeploy yapın
   - Aksi halde webhook çalışmaz

4. **Secret Güvenliği:**
   - Secret'ı kimseyle paylaşmayın
   - Sadece Vercel Environment Variables'a ekleyin

---

## 🚀 SONRAKI ADIMLAR

1. ✅ **Webhook secret'ı Stripe'dan kopyalayın**
2. ✅ **Vercel'e `STRIPE_WEBHOOK_SECRET` olarak ekleyin**
3. ✅ **Redeploy yapın**
4. ✅ **Test siparişi yapın**
5. ✅ **Logları kontrol edin**

---

**Webhook secret'ı buldunuz mu? Vercel'e eklediniz mi? Redeploy yaptınız mı? 🔍**



